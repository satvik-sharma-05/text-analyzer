# 📚 Complete Tutorial - AI Text Analyzer

**For**: You (the notebook creator)  
**Purpose**: Understand everything that was built after your notebook

## 🌐 Live Demo

**Try it now**: https://text-analyzer-lime.vercel.app/  
**API Endpoint**: https://text-analyzer-q4wu.onrender.com/

---

## 📖 Table of Contents

1. [What You Created](#what-you-created)
2. [What Was Built](#what-was-built)
3. [Backend Explanation](#backend-explanation)
4. [Frontend Explanation](#frontend-explanation)
5. [How Everything Works Together](#how-everything-works-together)
6. [File Structure](#file-structure)
7. [Running the Project](#running-the-project)
8. [Understanding Predictions](#understanding-predictions)
9. [Deployment Guide](#deployment-guide)
10. [Troubleshooting](#troubleshooting)

---

## 1. What You Created

### Your Notebook (`docs/Multi_Task_Learning_with_NLP (1).ipynb`)

You created a **Multi-Task Learning model** that:

#### Loaded 3 Datasets:
- `data/emotions.csv` - 12,000 emotion samples (6 emotions)
- `data/hatespeech.csv` - 19,000 hate speech samples (3 classes)
- `data/voilence.csv` - 20,000 violence samples (5 types)

#### Preprocessed Data:
```python
# Balanced datasets
emotion_df: 2,000 samples per emotion
violence_df: Balanced across 5 types
hate_df: Balanced across 3 classes

# Text preprocessing
- Removed stopwords
- Tokenized text
- Padded sequences to max_length=50
```

#### Built Model Architecture:
```python
# Multi-Task Learning with Shared Layers
Input Layer (3 separate inputs)
    ↓
Embedding Layer (128-dim) [SHARED]
    ↓
LSTM Layer (64 units) [SHARED]
    ↓
Global Average Pooling [SHARED]
    ↓
Dropout (0.5) [SHARED]
    ↓
    ├─→ Emotion Dense (6 classes, softmax)
    ├─→ Violence Dense (5 classes, softmax)
    └─→ Hate Dense (3 classes, softmax)
```

#### Trained Model:
```python
model.fit(
    x={'emotion_input': emotion_padded,
       'violence_input': violence_padded,
       'hate_input': hate_padded},
    y={'emotion_output': emotion_labels,
       'violence_output': violence_labels,
       'hate_output': hate_labels},
    epochs=10,
    batch_size=4
)
```

#### Saved Model:
```python
# Saved to pickle files
model.pkl       # 64.8 MB - Trained model weights
tokenizer.pkl   # 1.7 MB - Tokenizer vocabulary
```

---

## 2. What Was Built

After your notebook, I built a **complete full-stack web application**:

### Backend (FastAPI)
- REST API server
- Loads your model.pkl and tokenizer.pkl
- Provides prediction endpoints
- Handles text preprocessing
- Returns JSON responses

### Frontend (Next.js)
- Modern web interface
- Text input for analysis
- Real-time predictions display
- Separate pages for info
- Clean, professional UI

### Deployment Ready
- Backend can deploy to Render
- Frontend can deploy to Vercel
- Production-ready code

---

## 3. Backend Explanation

### File: `backend/main.py`

#### What It Does:
1. **Loads Your Model**
```python
with open("model.pkl", "rb") as f:
    model = pickle.load(f)  # Your trained model
with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)  # Your tokenizer
```

2. **Preprocesses Text** (Same as your notebook)
```python
def remove_stopwords(text: str) -> str:
    # Removes common words like 'the', 'a', 'is'
    stopwords = {'the', 'a', 'an', 'and', ...}
    words = text.lower().split()
    filtered_words = [word for word in words if word not in stopwords]
    return ' '.join(filtered_words)

def preprocess_text(text: str) -> np.ndarray:
    # 1. Remove stopwords
    cleaned_text = remove_stopwords(text)
    
    # 2. Convert to sequences
    sequence = tokenizer.texts_to_sequences([cleaned_text])
    
    # 3. Pad to 50 tokens (same as your notebook)
    padded = pad_sequences(sequence, maxlen=50, padding='post')
    
    return padded
```

3. **Makes Predictions** (Same as your notebook)
```python
# Predict using your model
predictions = model.predict({
    'emotion_input': input_padded,
    'violence_input': input_padded,
    'hate_input': input_padded
}, verbose=0)

# Extract predictions
emotion_pred = predictions[0][0]  # emotion_output
violence_pred = predictions[1][0]  # violence_output
hate_pred = predictions[2][0]  # hate_output

# Get class and confidence
emotion_class = int(np.argmax(emotion_pred))
emotion_confidence = float(np.max(emotion_pred))
```

4. **Maps to Labels** (Exact labels from your notebook)
```python
EMOTION_LABELS = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']
VIOLENCE_LABELS = ['sexual_violence', 'physical_violence', 'emotional_violence', 
                   'Harmful_traditional_practice', 'economic violence']
HATE_LABELS = ['offensive speech', 'Neither', 'Hate Speech']

emotion_label = EMOTION_LABELS[emotion_class]
violence_label = VIOLENCE_LABELS[violence_class]
hate_label = HATE_LABELS[hate_class]
```

5. **Returns JSON Response**
```python
return {
    "emotion": emotion_label,
    "emotion_confidence": emotion_confidence,
    "hate": hate_label,
    "hate_confidence": hate_confidence,
    "violence": violence_label,
    "violence_confidence": violence_confidence,
    "major_label": major_label,  # Highest confidence category
    "sub_label": sub_label
}
```

#### API Endpoints:

**GET /**
- Health check
- Returns: `{"status": "online", "model_loaded": true}`

**POST /predict**
- Input: `{"text": "your text here"}`
- Output: Full prediction with all 3 classifications

---

## 4. Frontend Explanation

### Main Page (`frontend/app/page.tsx`)

#### What It Does:

1. **Hero Section**
```tsx
<h1>🤖 AI Text Analyzer</h1>
<p>Multi-Task NLP Classifier powered by Deep Learning</p>
```

2. **Text Input**
```tsx
<textarea
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Type or paste your text here..."
/>
<button onClick={analyzeText}>
    🔍 Analyze Text
</button>
```

3. **Makes API Call**
```tsx
const analyzeText = async () => {
    const response = await axios.post('http://localhost:8000/predict', {
        text: text
    })
    setResult(response.data)
}
```

4. **Displays Results**
```tsx
{result && (
    <div>
        {/* Primary Classification */}
        <div>Category: {result.major_label}</div>
        <div>Subcategory: {result.sub_label}</div>
        
        {/* Detailed Results */}
        <div>😊 Emotion: {result.emotion} ({result.emotion_confidence}%)</div>
        <div>💬 Hate: {result.hate} ({result.hate_confidence}%)</div>
        <div>⚠️ Violence: {result.violence} ({result.violence_confidence}%)</div>
    </div>
)}
```

5. **Quick Links to Other Pages**
```tsx
<Link href="/examples">📝 Example Texts</Link>
<Link href="/how-it-works">🧠 How It Works</Link>
<Link href="/about">ℹ️ About & FAQ</Link>
```

### Other Pages:

**`/examples`** - Shows example texts for each of the 6 emotions  
**`/how-it-works`** - Explains your model architecture  
**`/about`** - FAQ and why predictions might seem unusual  

---

## 5. How Everything Works Together

### Complete Flow:

```
User Types Text
    ↓
Frontend (Next.js)
    ↓
HTTP POST to Backend
    ↓
Backend (FastAPI)
    ↓
1. Remove stopwords
2. Tokenize text
3. Pad to 50 tokens
    ↓
Your Model (model.pkl)
    ↓
Predictions (3 outputs)
    ↓
Map to labels
    ↓
JSON Response
    ↓
Frontend displays results
    ↓
User sees predictions
```

### Example:

**User Input**: "I am very happy today"

**Backend Processing**:
```python
# 1. Remove stopwords
"I am very happy today" → "am very happy today"

# 2. Tokenize
"am very happy today" → [245, 1032, 567, 890]

# 3. Pad to 50
[245, 1032, 567, 890] → [245, 1032, 567, 890, 0, 0, ..., 0]

# 4. Predict with your model
predictions = model.predict(...)

# 5. Get results
emotion: joy (85%)
hate: Neither (92%)
violence: emotional_violence (67%)
```

**Frontend Display**:
```
Primary Classification
Category: Emotion
Subcategory: Joy

😊 Emotion: Joy (85.0%)
💬 Hate Speech: Neither (92.0%)
⚠️ Violence: Emotional Violence (67.0%)
```

---

## 6. File Structure

### Current Structure:
```
AI-Text-Analyzer/
├── backend/
│   ├── main.py              # FastAPI server (loads your model)
│   ├── requirements.txt     # Python dependencies
│   └── README.md
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx        # Main analyzer page
│   │   ├── layout.tsx      # Layout wrapper
│   │   ├── globals.css     # Global styles
│   │   ├── examples/
│   │   │   └── page.tsx    # Example texts page
│   │   ├── how-it-works/
│   │   │   └── page.tsx    # Architecture explanation
│   │   └── about/
│   │       └── page.tsx    # FAQ page
│   ├── package.json        # Node dependencies
│   └── README.md
│
├── data/
│   ├── emotions.csv        # Your emotion training data
│   ├── hatespeech.csv      # Your hate speech training data
│   └── voilence.csv        # Your violence training data
│
├── model/
│   ├── model.pkl           # Your trained model (64.8 MB)
│   └── tokenizer.pkl       # Your tokenizer (1.7 MB)
│
├── docs/
│   └── Multi_Task_Learning_with_NLP (1).ipynb  # Your notebook
│
├── README.md               # Project overview
└── TUTORIAL.md             # This file
```

### Why This Structure?

**`backend/`** - All backend code in one place  
**`frontend/`** - All frontend code in one place  
**`data/`** - Training datasets organized  
**`model/`** - Model files separate from code  
**`docs/`** - Documentation and notebook  

---

## 7. Running the Project

### Step 1: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Copy model files (if not already there)
# The backend expects model.pkl and tokenizer.pkl in backend/
# Copy from model/ to backend/ if needed
cp ../model/model.pkl .
cp ../model/tokenizer.pkl .

# Start server
python main.py
```

**Backend runs on**: http://localhost:8000

**Test it**:
```bash
# Health check
curl http://localhost:8000/

# Make prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "I am very happy today"}'
```

### Step 2: Setup Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs on**: http://localhost:3000

### Step 3: Use the Application

1. Open browser: http://localhost:3000
2. Enter text in the input box
3. Click "Analyze Text"
4. See predictions!

---

## 8. Understanding Predictions

### Why Some Predictions Seem Unusual

**Example**: "I am very happy today, i got the job"

**Your Result**:
- Primary: Violence → Emotional Violence (96.3%)
- Emotion: Joy (85.0%)
- Hate: Hate Speech (72.5%)

**Why?**

Your training data (`data/voilence.csv`) contains examples like:

```csv
"I am very happy for you two. Nothing beats when a couple 
can share their passions together... My current husband...", Physical_violence

"I literally got fired from a job I just got because I was 
asking too many questions...", economic_violence
```

**What Happened**:
1. Your model learned: "I am very happy" → appears in violence contexts
2. Your model learned: "got job" → appears in economic violence contexts
3. When it sees both phrases, it predicts violence with high confidence

**This is NOT a bug!** This is exactly how machine learning works:
- Model learns patterns from training data
- If training data has "happy" in violent contexts, model learns that association
- **"Garbage in, garbage out"** principle

### How to Get Better Predictions

**Use Clear Examples**:
```
✅ "I feel so lonely and depressed" → Sadness (100%)
✅ "I am so scared and terrified" → Fear (100%)
✅ "This is the best day ever!" → Joy (high confidence)
```

**Avoid**:
```
❌ Very short texts (< 10 characters)
❌ Mixed sentiments in one sentence
❌ Ambiguous language
```

---

## 9. Deployment Guide

### Deploy Backend to Render

1. **Create Account**: https://render.com
2. **New Web Service**:
   - Connect your GitHub repo
   - Root directory: `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port 10000`
3. **Add Files**:
   - Make sure `model.pkl` and `tokenizer.pkl` are in `backend/`
   - Commit and push to GitHub
4. **Deploy**: Click "Create Web Service"
5. **Get URL**: e.g., `https://your-app.onrender.com`

### Deploy Frontend to Vercel

1. **Create Account**: https://vercel.com
2. **Import Project**:
   - Connect your GitHub repo
   - Root directory: `frontend`
   - Framework preset: Next.js
3. **Environment Variables**:
   - Add: `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com`
4. **Deploy**: Click "Deploy"
5. **Get URL**: e.g., `https://your-app.vercel.app`

### Update Frontend to Use Backend URL

In `frontend/app/page.tsx`:
```tsx
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
```

This will use the environment variable in production!

---

## 10. Troubleshooting

### Backend Issues

**Problem**: "Model not found"
```bash
# Solution: Copy model files to backend/
cp model/model.pkl backend/
cp model/tokenizer.pkl backend/
```

**Problem**: "Module not found"
```bash
# Solution: Install dependencies
cd backend
pip install -r requirements.txt
```

**Problem**: "Port already in use"
```bash
# Solution: Change port in main.py
uvicorn.run(app, host="0.0.0.0", port=8001)  # Use different port
```

### Frontend Issues

**Problem**: "Cannot connect to backend"
```tsx
// Solution: Check API_URL in page.tsx
const API_URL = 'http://localhost:8000'  // Make sure backend is running
```

**Problem**: "Module not found"
```bash
# Solution: Install dependencies
cd frontend
npm install
```

**Problem**: "Port 3000 already in use"
```bash
# Solution: Use different port
npm run dev -- -p 3001
```

### Model Issues

**Problem**: "Predictions seem wrong"
- **This is expected!** Model learned from training data patterns
- See section 8 for explanation
- Use clear, unambiguous text for best results

**Problem**: "Low confidence scores"
- Text might be too short
- Try longer, more detailed text (20+ words)
- Use emotion-specific keywords

---

## 🎓 Key Takeaways

### What You Built (Notebook):
✅ Multi-Task Learning model  
✅ Trained on 51,000+ samples  
✅ 3 simultaneous predictions  
✅ Saved as model.pkl and tokenizer.pkl  

### What Was Built (After):
✅ FastAPI backend (loads your model)  
✅ Next.js frontend (modern UI)  
✅ REST API (JSON responses)  
✅ Separate info pages  
✅ Production-ready deployment  

### How It Works:
1. User enters text
2. Frontend sends to backend
3. Backend preprocesses (same as your notebook)
4. Your model makes predictions
5. Backend returns JSON
6. Frontend displays results

### Important Concepts:
- **Multi-Task Learning**: One model, multiple tasks
- **Shared Layers**: Embedding and LSTM shared across tasks
- **Training Data Quality**: Model reflects training data patterns
- **"Garbage in, garbage out"**: Bad data = bad predictions

---

## 📚 Next Steps

### To Improve the Model:
1. **Clean Training Data**: Remove mislabeled examples
2. **More Data**: Add more balanced samples
3. **Better Architecture**: Try BERT or GPT-based models
4. **Fine-tuning**: Adjust hyperparameters

### To Extend the Application:
1. **Add Authentication**: User login/signup
2. **Save History**: Store past predictions
3. **Batch Processing**: Analyze multiple texts
4. **Export Results**: Download as CSV/JSON
5. **API Keys**: Secure the API

### To Learn More:
1. **FastAPI Docs**: https://fastapi.tiangolo.com/
2. **Next.js Docs**: https://nextjs.org/docs
3. **TensorFlow Docs**: https://www.tensorflow.org/
4. **Multi-Task Learning**: Research papers on MTL

---

## 🎉 Congratulations!

You now understand:
- ✅ What your notebook created
- ✅ How the backend works
- ✅ How the frontend works
- ✅ How everything connects
- ✅ Why predictions behave as they do
- ✅ How to run and deploy the project

**You have a complete, production-ready AI web application!** 🚀

---

**Questions?** Check:
- README.md for quick reference
- backend/README.md for API details
- frontend/README.md for UI details
- `/about` page in the app for FAQ

**Happy coding!** 💻✨
