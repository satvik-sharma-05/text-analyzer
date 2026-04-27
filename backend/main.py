from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import os

# Memory optimization: Set TensorFlow to use minimal memory
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TF warnings
os.environ['TF_FORCE_GPU_ALLOW_GROWTH'] = 'true'
os.environ['TF_GPU_THREAD_MODE'] = 'gpu_private'

import tensorflow as tf

# Configure TensorFlow for low memory usage
tf.config.set_soft_device_placement(True)
try:
    # Limit TensorFlow memory growth
    gpus = tf.config.list_physical_devices('GPU')
    if gpus:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
except:
    pass

from tensorflow.keras.preprocessing.sequence import pad_sequences
import re
from typing import List, Dict

# Initialize FastAPI app
app = FastAPI(title="Multi-Task NLP Classifier API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for lazy loading
model = None
tokenizer = None

def load_model_and_tokenizer():
    """Lazy load model and tokenizer only when needed"""
    global model, tokenizer
    if model is None or tokenizer is None:
        try:
            # Load Keras model from .h5 file (proper format for Keras models)
            model = tf.keras.models.load_model("model.h5")
            # Load tokenizer from .pkl (correct for tokenizer)
            with open("tokenizer.pkl", "rb") as f:
                tokenizer = pickle.load(f)
            print("✓ Model and tokenizer loaded successfully")
        except Exception as e:
            print(f"✗ Error loading model/tokenizer: {e}")
            raise e
    return model, tokenizer

# Constants from notebook
MAX_LENGTH = 50

# Label mappings from notebook (EXACT match)
EMOTION_LABELS = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']
VIOLENCE_LABELS = ['sexual_violence', 'physical_violence', 'emotional_violence', 
                   'Harmful_traditional_practice', 'economic violence']
HATE_LABELS = ['offensive speech', 'Neither', 'Hate Speech']

# Request/Response models
class PredictionRequest(BaseModel):
    text: str

class PredictionResponse(BaseModel):
    emotion: str
    emotion_confidence: float
    hate: str
    hate_confidence: float
    violence: str
    violence_confidence: float
    major_label: str
    sub_label: str

def remove_stopwords(text: str) -> str:
    """Remove stopwords from text (simplified version)"""
    # Basic stopwords list
    stopwords = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
                 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
                 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
                 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that',
                 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'}
    
    # Convert to lowercase and split
    words = text.lower().split()
    # Remove stopwords
    filtered_words = [word for word in words if word not in stopwords]
    return ' '.join(filtered_words)

def preprocess_text(text: str) -> np.ndarray:
    """Preprocess text exactly as in the notebook"""
    # Clean text
    cleaned_text = remove_stopwords(text)
    
    # Convert to sequence
    sequence = tokenizer.texts_to_sequences([cleaned_text])
    
    # Pad sequence
    padded = pad_sequences(sequence, maxlen=MAX_LENGTH, padding='post')
    
    return padded

def get_major_label(emotion_conf: float, violence_conf: float, hate_conf: float) -> str:
    """Determine the major label based on confidence scores"""
    max_conf = max(emotion_conf, violence_conf, hate_conf)
    
    if max_conf == emotion_conf:
        return 'Emotion'
    elif max_conf == violence_conf:
        return 'Violence'
    else:
        return 'Hate'

@app.get("/")
def read_root():
    """Health check endpoint"""
    return {
        "status": "online",
        "message": "Multi-Task NLP Classifier API",
        "model_loaded": model is not None,
        "endpoints": {
            "predict": "/predict (POST)",
            "health": "/ (GET)"
        }
    }

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    """
    Predict emotion, hate speech, and violence from input text
    """
    # Validate input
    if not request.text or len(request.text.strip()) == 0:
        raise HTTPException(status_code=400, detail="Text input cannot be empty")
    
    if len(request.text) > 5000:
        raise HTTPException(status_code=400, detail="Text input too long (max 5000 characters)")
    
    try:
        # Load model on first request (lazy loading)
        current_model, current_tokenizer = load_model_and_tokenizer()
        
        # Preprocess input
        input_padded = preprocess_text(request.text)
        
        # Make predictions (model expects 3 inputs for each task)
        predictions = current_model.predict({
            'emotion_input': input_padded,
            'violence_input': input_padded,
            'hate_input': input_padded
        }, verbose=0)
        
        # Extract predictions for each task
        emotion_pred = predictions[0][0]  # emotion_output
        violence_pred = predictions[1][0]  # violence_output
        hate_pred = predictions[2][0]  # hate_output
        
        # Get predicted classes and confidence scores
        emotion_class = int(np.argmax(emotion_pred))
        emotion_confidence = float(np.max(emotion_pred))
        
        violence_class = int(np.argmax(violence_pred))
        violence_confidence = float(np.max(violence_pred))
        
        hate_class = int(np.argmax(hate_pred))
        hate_confidence = float(np.max(hate_pred))
        
        # Map to labels
        emotion_label = EMOTION_LABELS[emotion_class]
        violence_label = VIOLENCE_LABELS[violence_class]
        hate_label = HATE_LABELS[hate_class]
        
        # Determine major label
        major_label = get_major_label(emotion_confidence, violence_confidence, hate_confidence)
        
        # Determine sub label based on major label
        if major_label == 'Emotion':
            sub_label = emotion_label
        elif major_label == 'Violence':
            sub_label = violence_label
        else:
            sub_label = hate_label
        
        return PredictionResponse(
            emotion=emotion_label,
            emotion_confidence=round(emotion_confidence, 4),
            hate=hate_label,
            hate_confidence=round(hate_confidence, 4),
            violence=violence_label,
            violence_confidence=round(violence_confidence, 4),
            major_label=major_label,
            sub_label=sub_label
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
