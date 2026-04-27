# Multi-Task NLP Classifier - Backend

AI-powered API that analyzes text and classifies:
- **Emotion**: sadness, joy, love, anger, fear, surprise
- **Hate Speech**: offensive speech, neither, hate speech
- **Violence**: sexual, physical, emotional, harmful traditional practice, economic

## Setup

1. **Copy model files**:
   ```bash
   cp ../model.pkl .
   cp ../tokenizer.pkl .
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run locally**:
   ```bash
   python main.py
   ```
   Or:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Test the API**:
   ```bash
   curl -X POST "http://localhost:8000/predict" \
     -H "Content-Type: application/json" \
     -d '{"text": "I am very happy today"}'
   ```

## API Endpoints

### GET /
Health check endpoint

### POST /predict
Analyze text and return classifications

**Request**:
```json
{
  "text": "Your text here"
}
```

**Response**:
```json
{
  "emotion": "joy",
  "emotion_confidence": 0.9234,
  "hate": "neither",
  "hate_confidence": 0.8765,
  "violence": "emotional_violence",
  "violence_confidence": 0.4321,
  "major_label": "Emotion",
  "sub_label": "joy"
}
```

## Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 10000`
   - **Environment**: Python 3
4. Add model files (model.pkl, tokenizer.pkl) to the repository
5. Deploy!

## Environment Variables

No environment variables required for basic setup.

## Notes

- Maximum text length: 5000 characters
- Model uses 50-token padding
- CORS enabled for all origins (configure for production)
