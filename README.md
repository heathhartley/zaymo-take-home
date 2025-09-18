# Zaymo URL Shortener & HTML Link Modifier

This project is a small URL shortening service with an HTML file upload feature. Uploaded HTML files will have all `<a>` links replaced with shortened URLs, and users can preview and download the modified HTML.

---

## Features

- Upload HTML files and automatically replace links with short URLs  
- Preview modified HTML in the browser  
- Download modified HTML file  
- URL redirect via short keys   
- FastAPI backend, React frontend  

---

## Tech Stack

- **Backend:** FastAPI, SQLAlchemy, SQLite, BeautifulSoup  
- **Frontend:** React (Vite), plain CSS/JSX for styling  (Wanted Tailwind)
- **Database:** SQLite (default, lightweight for local development)  
- **Dependencies:** Python 3.11+, Node.js 22+  

---

## Prerequisites

- Python 3.11+ installed  
- Node.js 22+ installed  
- `pip` and `npm` available  

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/heathhartley/zaymo-take-home.git
```
### 2. Backend Setup

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run Vite development server
npm run dev
```