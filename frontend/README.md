# Multi-Task NLP Classifier - Frontend

Modern, responsive web interface for the AI Text Analyzer. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Beautiful, modern UI with gradient backgrounds
- 📱 Fully responsive design
- ⚡ Real-time text analysis
- 📊 Visual confidence scores with progress bars
- 🎯 Color-coded classification results
- ⌨️ Character counter
- 🔄 Loading states and error handling

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure API URL**:
   Create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and set your backend URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
5. Deploy!

### Option 3: GitHub Integration

1. Push code to GitHub
2. Connect repository to Vercel
3. Auto-deploy on every push

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API endpoint (required)

## Project Structure

```
frontend/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page component
├── public/               # Static assets
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.js        # Next.js configuration
```

## Technologies

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Axios**: HTTP client

## Customization

### Colors

Edit `app/page.tsx` to customize classification colors:
- `getEmotionColor()`: Emotion badge colors
- `getHateColor()`: Hate speech badge colors
- `getViolenceColor()`: Violence badge colors

### API Endpoint

Update `API_URL` in `app/page.tsx` or use environment variable.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized with Next.js App Router
- Server-side rendering
- Automatic code splitting
- Image optimization
- Font optimization
