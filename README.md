# 🔗 URL Shortener

A minimal URL shortener service built with Django (backend) and Next.js (frontend).  
It supports short link generation, click tracking, redirect, and basic analytics.

---

## ⚙️ Tech Stack

- **Backend:** Django + Django REST Framework  
- **Frontend:** Next.js (used as alternative to React Native)  
- **Database:** SQLite  
- **Local Hosting:** Runs on `localhost`

---

## 📁 Project Structure

/backend # Django backend
/frontend # Next.js frontend
README.md

yaml
Copy
Edit

---

## 🚀 Setup Instructions

### 🔧 Backend (Django)

```bash
cd backend
python -m venv env
source env/bin/activate    # or .\env\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
🖥️ Frontend (Next.js)
bash
Copy
Edit
cd frontend
npm install

# Create .env.local
echo NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 > .env.local

npm run dev
Then open: http://localhost:3000

📦 API Endpoints
➕ Shorten a URL
POST /api/shorten/
Body:

json
Copy
Edit
{ "original_url": "https://www.example.com/some/long/path" }
Response:

json
Copy
Edit
{ "short_url": "http://localhost:8000/Ab12cD" }
🔁 Redirect to Original
GET /<short_code>/

Redirects with 302 to original URL

📊 Analytics
GET /api/analytics/<short_code>/
Response:

json
Copy
Edit
{ "short_code": "Ab12cD", "click_count": 3 }
✅ Features
URL shortening via unique short codes

Redirect handling

Click count tracking

/api/analytics/ endpoint

Dark-themed frontend

Shows last 5 shortened links

Refresh button for click count

Clean UI with Tailwind CSS

🧪 Basic Tests
✅ Backend
Test to check if POST /api/shorten/ generates unique short_code

✅ Frontend
Snapshot/logic test to verify "Shorten URL" button and input render and trigger API call

📝 Notes
This project replaces React Native with Next.js (permitted fallback).

Backend runs on Django using SQLite.

All features are implemented and verified.

Hosting was optional and skipped.

📸 Demo Preview

