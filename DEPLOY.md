# 🚀 Quick Deployment Guide

## ✅ Live Deployment

**Frontend**: https://text-analyzer-lime.vercel.app/  
**Backend API**: https://text-analyzer-q4wu.onrender.com/

---

## Deploy Your Own

### Backend → Render

1. **Sign up**: https://render.com
2. **New Web Service** → Connect GitHub repo
3. **Settings**:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port 10000`
4. **Deploy** → Get URL: `https://your-app.onrender.com`

---

### Frontend → Vercel

1. **Sign up**: https://vercel.com
2. **Import Project** → Connect GitHub repo
3. **Settings**:
   - Root Directory: `frontend`
   - Framework: Next.js
   - Environment Variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com`
4. **Deploy** → Get URL: `https://your-app.vercel.app`

---

## ✅ Done!

Your app is live!

**Example**:
- Frontend: https://text-analyzer-lime.vercel.app/
- Backend: https://text-analyzer-q4wu.onrender.com/

**Note**: Make sure `model.h5` and `tokenizer.pkl` are in `backend/` folder before deploying!
