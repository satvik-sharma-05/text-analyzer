# Model Format Guide: .pkl vs .h5

## The Problem We Had

Our deployment was failing with "Out of Memory" errors because we were using the **wrong format** to save our Keras model.

## Understanding Model Formats

### When to Use .pkl (Pickle) ✅

**Use for:**
- Scikit-learn models (LogisticRegression, SVM, RandomForest, etc.)
- TF-IDF vectorizers
- CountVectorizers
- Tokenizers
- Simple Python objects

**Example:**
```python
from sklearn.linear_model import LogisticRegression
import pickle

model = LogisticRegression()
# ... train model ...

# Save
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

# Load
with open("model.pkl", "rb") as f:
    model = pickle.load(f)
```

### When to Use .h5 (HDF5) ✅

**Use for:**
- TensorFlow/Keras models
- Deep learning models (LSTM, CNN, Transformers, etc.)
- Models with custom layers

**Example:**
```python
import tensorflow as tf

model = tf.keras.models.Sequential([...])
# ... train model ...

# Save
model.save("model.h5")

# Load
model = tf.keras.models.load_model("model.h5")
```

## Why .pkl Failed for Our Keras Model

### ❌ Problems with Pickling Keras Models

1. **Huge Memory Overhead**
   - Pickle serializes the entire Python object graph
   - Keras models have complex internal structures
   - Result: 512MB+ memory usage on load

2. **Inconsistent Loading**
   - Different TensorFlow/Keras versions may fail
   - Internal Keras structures change between versions
   - Not the "official" way to save Keras models

3. **Deployment Issues**
   - Free hosting tiers have memory limits (512MB)
   - Model loading crashes the server
   - Slow startup times

### ✅ Benefits of .h5 for Keras Models

1. **Efficient Memory Usage**
   - Native Keras format
   - Optimized serialization
   - Loads only what's needed

2. **Reliable**
   - Official Keras format
   - Version-compatible
   - Widely supported

3. **Deployment-Friendly**
   - Lower memory footprint
   - Faster loading
   - Works on free hosting tiers

## Our Solution

### What We Changed

**Before (Wrong):**
```python
# Saving
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

# Loading
with open("model.pkl", "rb") as f:
    model = pickle.load(f)
```

**After (Correct):**
```python
# Saving
model.save("model.h5")

# Loading
model = tf.keras.models.load_model("model.h5")
```

### Tokenizer Stays as .pkl ✅

The tokenizer is NOT a Keras model, so `.pkl` is correct:
```python
# Tokenizer - .pkl is fine
with open("tokenizer.pkl", "wb") as f:
    pickle.dump(tokenizer, f)
```

## Quick Reference Table

| Component | Format | Why |
|-----------|--------|-----|
| Sklearn models | `.pkl` | Simple Python objects |
| Keras/TensorFlow models | `.h5` | Complex neural networks |
| Tokenizers | `.pkl` | Simple Python objects |
| Vectorizers (TF-IDF, Count) | `.pkl` | Simple Python objects |
| PyTorch models | `.pt` or `.pth` | PyTorch native format |

## File Sizes (Our Project)

```
model.pkl:      61.86 MB  ❌ (Wrong format, high memory)
model.h5:       61.86 MB  ✅ (Correct format, low memory)
tokenizer.pkl:   1.62 MB  ✅ (Correct format)
```

**Note:** Even though file sizes are similar, `.h5` uses much less memory when loading!

## Key Takeaway

> **Use the native format for each framework:**
> - Keras → `.h5`
> - Sklearn → `.pkl`
> - PyTorch → `.pt`

This ensures efficient memory usage and reliable deployment! 🚀
