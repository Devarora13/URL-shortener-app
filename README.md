# 🔗 URL Shortener

A minimal full-stack URL shortener service, inspired by [bit.ly](https://bitly.com), built using **Django + DRF (Backend)** and **Next.js (Frontend)**.
It supports short URL generation, redirection, click tracking, and a clean responsive UI.

---

## ⚙️ Tech Stack

- **Backend:** Django + Django REST Framework
- **Frontend:** Next.js
- **Database:** SQLite
- **Deployment:**
  - Backend: [Render](https://url-shortener-app-3ojs.onrender.com)
  - Frontend: [Vercel](https://url-shortener-app-git-main-dev-aroras-projects-34d0f3cf.vercel.app/)

---

## 🚀 Live Demo

- 🔗 Frontend: [https://url-shortener-app-u2pj-woad.vercel.app/](https://url-shortener-app-u2pj-woad.vercel.app/)
- 🔧 Backend: [https://url-shortener-app-3ojs.onrender.com](https://url-shortener-app-3ojs.onrender.com)

---

## 📁 Project Structure

```
url-shortener/
├── backend/           # Django backend (API + redirect + analytics)
├── frontend/          # Next.js frontend (UI + local history + analytics)
└── README.md
```

---

## 🛠️ Setup Instructions (Local)

### ✅ Backend

```bash
cd backend
python -m venv env
source env/bin/activate    # Windows: .\env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The backend runs at: **http://localhost:8000**

### ✅ Frontend

```bash
cd frontend
npm install
# Add .env.local
echo NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 > .env.local
npm run dev
```

The frontend runs at: **http://localhost:3000**

---

## 📦 API Endpoints

### 🔹 POST `/api/shorten/`
Creates a short URL.

**Request:**
```json
{ "original_url": "https://www.example.com" }
```

**Response:**
```json
{ "short_url": "http://localhost:8000/abc123" }
```

### 🔹 GET `/<short_code>/`
Redirects to the original URL (HTTP 302).

### 🔹 GET `/api/analytics/<short_code>/`
Returns click count for the short link.

**Response:**
```json
{ "short_code": "abc123", "click_count": 5 }
```

---

## ✅ Features

✅ Short URL generation  
✅ 302 Redirect via short links  
✅ Click count tracking  
✅ `/api/analytics/` endpoint  
✅ Local history of last 5 links (stored in browser)  
✅ Clean and responsive UI using Tailwind CSS  
✅ Full deployment (Render + Vercel)  

---

## 🧪 Tests

### ✅ Backend
Test file: `backend/shortener/tests/test_api.py`

```python
def test_shorten_creates_unique_code():
    res = client.post("/api/shorten/", {"original_url": "https://example.com"})
    assert res.status_code == 201
```

Run with:
```bash
cd backend
pytest
```

### ✅ Frontend
Test file: `frontend/__tests__/page.test.tsx`

```tsx
it("renders input and shorten button", () => {
  render(<Home />);
  expect(screen.getByPlaceholderText("Enter long URL")).toBeInTheDocument();
});
```

Run with:
```bash
cd frontend
npx jest
```

---

