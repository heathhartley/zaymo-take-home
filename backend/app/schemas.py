from pydantic import BaseModel

class URLCreate(BaseModel):
    original_url: str

class URLInfo(BaseModel):
    id: int
    original_url: str
    short_key: str

    class Config:
        orm_mode = True
