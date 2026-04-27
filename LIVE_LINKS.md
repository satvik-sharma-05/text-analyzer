# 🌐 Live Deployment Links

## Production URLs

### Frontend (Vercel)
**URL**: https://text-analyzer-lime.vercel.app/

**Pages**:
- Main Analyzer: https://text-analyzer-lime.vercel.app/
- Examples: https://text-analyzer-lime.vercel.app/examples
- How It Works: https://text-analyzer-lime.vercel.app/how-it-works
- About/FAQ: https://text-analyzer-lime.vercel.app/about

### Backend API (Render)
**Base URL**: https://text-analyzer-q4wu.onrender.com

**Endpoints**:
- Health Check: `GET https://text-analyzer-q4wu.onrender.com/`
- Predict: `POST https://text-analyzer-q4wu.onrender.com/predict`

## Quick Test

### Using cURL
```bash
curl -X POST https://text-analyzer-q4wu.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "I am very happy today!"}'
```

### Using JavaScript
```javascript
fetch('https://text-analyzer-q4wu.onrender.com/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'I am very happy today!' })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Using Python
```python
import requests

response = requests.post(
    'https://text-analyzer-q4wu.onrender.com/predict',
    json={'text': 'I am very happy today!'}
)
print(response.json())
```

## Deployment Details

### Frontend (Vercel)
- **Platform**: Vercel
- **Framework**: Next.js 14
- **Build Time**: ~2 minutes
- **Auto-deploy**: On push to main branch

### Backend (Render)
- **Platform**: Render
- **Runtime**: Python 3.11.9
- **Framework**: FastAPI + TensorFlow 2.16.1
- **Build Time**: ~3-5 minutes
- **Auto-deploy**: On push to main branch
- **Model Format**: `.h5` (Keras native format)

## Status

✅ Frontend: Live and working  
✅ Backend: Live and working  
✅ Model: Loaded successfully  
✅ API: Responding correctly  

## Performance

- **Prediction Time**: < 100ms
- **Model Size**: 61.86 MB
- **Memory Usage**: < 512MB (optimized for free tier)

## Repository

**GitHub**: https://github.com/satvik-sharma-05/text-analyzer

---

**Last Updated**: April 27, 2026
