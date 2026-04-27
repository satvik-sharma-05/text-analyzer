# 📤 Push to GitHub

## Quick Commands

Run these commands in your terminal:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Text Analyzer with Multi-Task Learning"

# Add remote
git remote add origin https://github.com/satvik-sharma-05/text-analyzer.git

# Set branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## ⚠️ Important Notes

### Large Files Warning

Your `model.pkl` (64.8 MB) and `tokenizer.pkl` (1.7 MB) might be too large for GitHub's free tier (100 MB limit per file).

**Options**:

### Option 1: Include Model Files (Recommended for deployment)
```bash
# Just push as is - files are under 100MB
git push -u origin main
```

### Option 2: Use Git LFS (if files are rejected)
```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.pkl"
git add .gitattributes

# Commit and push
git add .
git commit -m "Add model files with Git LFS"
git push -u origin main
```

### Option 3: Exclude Model Files (not recommended)
```bash
# Edit .gitignore to exclude .pkl files
# Then push without model files
# You'll need to upload them separately for deployment
```

---

## ✅ After Pushing

Your repository will be at:
**https://github.com/satvik-sharma-05/text-analyzer**

Then you can:
1. Deploy backend to Render (see DEPLOY.md)
2. Deploy frontend to Vercel (see DEPLOY.md)

---

## 🔧 If You Get Errors

**Error: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/satvik-sharma-05/text-analyzer.git
```

**Error: "file too large"**
```bash
# Use Git LFS (see Option 2 above)
```

**Error: "authentication failed"**
```bash
# Use GitHub Personal Access Token instead of password
# Generate at: https://github.com/settings/tokens
```
