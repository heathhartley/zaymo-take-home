from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.responses import RedirectResponse
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from bs4 import BeautifulSoup
from fastapi.middleware.cors import CORSMiddleware

from . import models, schemas, utils
from .database import engine, SessionLocal, Base

app = FastAPI(title="Zaymo URL Shortener")


origins = [
    "http://localhost:5173",  # React dev server
    # TODO: add env var
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

# Create tables
Base.metadata.create_all(bind=engine)


# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/{short_key}")
def redirect_url(short_key: str, db: Session = Depends(get_db)):
    db_url = db.query(models.URL).filter(models.URL.short_key == short_key).first()
    if not db_url:
        raise HTTPException(status_code=404, detail="URL not found")
    return RedirectResponse(url=db_url.original_url)
    # For higher scale / more users:
    # 1. Add Redis caching for short_key -> original_url
    #    - Check Redis first; if present, return redirect immediately
    #    - If not present, query DB, then store in Redis for future requests
    # 2. This reduces DB load massively for frequently accessed URLs
    # 3. Optionally, use a TTL (time-to-live) on Redis keys if links may expire


@app.post("/upload-html")
async def upload_html(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Upload an HTML email, replace links with shortened URLs, return modified HTML"""
    contents = await file.read()
    html_content = contents.decode("utf-8")

    soup = BeautifulSoup(html_content, "html.parser")

    for tag in soup.find_all("a", href=True):
        original_url = tag["href"]

        # Check if the URL already exists in DB - No duplicate 
        db_url = db.query(models.URL).filter(models.URL.original_url == original_url).first()
        
        if not db_url:
            # Generate a new short key only if URL isn't in DB
            short_key = utils.generate_short_key(original_url)
            db_url = models.URL(original_url=original_url, short_key=short_key)
            db.add(db_url)
            db.commit()
            db.refresh(db_url)

        # Replace href with the short URL
        tag["href"] = f"http://localhost:8001/{db_url.short_key}"

    print(str(soup))
    return HTMLResponse(content=str(soup), status_code=200)
        # For higher scale / more users:
        # 1. Batch inserts: Collect all new URLs and insert them in a single DB transaction
        #    - Reduces DB round trips
        # 2. Use Redis to cache original_url -> short_key mapping
        #    - If a URL already exists, fetch from Redis instead of hitting the DB
        # 3. Asynchronous DB writes - improve throughput -non blocking