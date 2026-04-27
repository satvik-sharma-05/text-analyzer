'use client'

import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

interface PredictionResult {
    emotion: string
    emotion_confidence: number
    hate: string
    hate_confidence: number
    violence: string
    violence_confidence: number
    major_label: string
    sub_label: string
}

export default function Home() {
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<PredictionResult | null>(null)
    const [error, setError] = useState('')

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

    const analyzeText = async () => {
        if (!text.trim()) {
            setError('Please enter some text to analyze')
            return
        }

        setLoading(true)
        setError('')
        setResult(null)

        try {
            const response = await axios.post(`${API_URL}/predict`, {
                text: text
            })
            setResult(response.data)
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to analyze text. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const getEmotionColor = (emotion: string) => {
        const colors: { [key: string]: string } = {
            joy: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            love: 'bg-pink-100 text-pink-800 border-pink-300',
            sadness: 'bg-blue-100 text-blue-800 border-blue-300',
            anger: 'bg-red-100 text-red-800 border-red-300',
            fear: 'bg-purple-100 text-purple-800 border-purple-300',
            surprise: 'bg-green-100 text-green-800 border-green-300',
        }
        return colors[emotion] || 'bg-gray-100 text-gray-800 border-gray-300'
    }

    const getHateColor = (hate: string) => {
        const colors: { [key: string]: string } = {
            neither: 'bg-green-100 text-green-800 border-green-300',
            offensive_speech: 'bg-orange-100 text-orange-800 border-orange-300',
            hate_speech: 'bg-red-100 text-red-800 border-red-300',
        }
        return colors[hate] || 'bg-gray-100 text-gray-800 border-gray-300'
    }

    const getViolenceColor = (violence: string) => {
        const colors: { [key: string]: string } = {
            sexual_violence: 'bg-red-100 text-red-800 border-red-300',
            physical_violence: 'bg-orange-100 text-orange-800 border-orange-300',
            emotional_violence: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            harmful_traditional_practice: 'bg-purple-100 text-purple-800 border-purple-300',
            economic_violence: 'bg-blue-100 text-blue-800 border-blue-300',
        }
        return colors[violence] || 'bg-gray-100 text-gray-800 border-gray-300'
    }

    const formatLabel = (label: string) => {
        return label.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-3">
                        🤖 AI Text Analyzer
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">
                        Multi-Task NLP Classifier powered by Deep Learning
                    </p>
                    <p className="text-sm text-gray-500">
                        Analyzes text for emotions, hate speech, and violence indicators
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Enter Text to Analyze
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type or paste your text here..."
                        className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none text-gray-800"
                        disabled={loading}
                    />

                    <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-gray-500">
                            {text.length} / 5000 characters
                        </span>
                        <button
                            onClick={analyzeText}
                            disabled={loading || !text.trim()}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing...
                                </span>
                            ) : (
                                '🔍 Analyze Text'
                            )}
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                        <p className="text-red-800 font-medium">❌ {error}</p>
                    </div>
                )}

                {/* Results Section */}
                {result && (
                    <div className="space-y-6 mb-8">
                        {/* Major Classification */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                            <h2 className="text-xl font-bold mb-2">Primary Classification</h2>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm opacity-90">Category</p>
                                    <p className="text-3xl font-bold">{result.major_label}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm opacity-90">Subcategory</p>
                                    <p className="text-xl font-semibold">{formatLabel(result.sub_label)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Results */}
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Emotion Card */}
                            <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-base font-bold text-gray-800">😊 Emotion</h3>
                                    <span className="text-xl font-bold text-blue-600">
                                        {(result.emotion_confidence * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className={`${getEmotionColor(result.emotion)} px-3 py-2 rounded-lg border-2 font-semibold text-center text-sm`}>
                                    {formatLabel(result.emotion)}
                                </div>
                                <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-blue-600 h-full transition-all duration-500"
                                        style={{ width: `${result.emotion_confidence * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Hate Speech Card */}
                            <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-base font-bold text-gray-800">💬 Hate Speech</h3>
                                    <span className="text-xl font-bold text-orange-600">
                                        {(result.hate_confidence * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className={`${getHateColor(result.hate)} px-3 py-2 rounded-lg border-2 font-semibold text-center text-sm`}>
                                    {formatLabel(result.hate)}
                                </div>
                                <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-orange-600 h-full transition-all duration-500"
                                        style={{ width: `${result.hate_confidence * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Violence Card */}
                            <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-base font-bold text-gray-800">⚠️ Violence</h3>
                                    <span className="text-xl font-bold text-red-600">
                                        {(result.violence_confidence * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className={`${getViolenceColor(result.violence)} px-3 py-2 rounded-lg border-2 font-semibold text-center text-xs`}>
                                    {formatLabel(result.violence)}
                                </div>
                                <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-red-600 h-full transition-all duration-500"
                                        style={{ width: `${result.violence_confidence * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Links Section */}
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    <Link href="/examples" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500 cursor-pointer group">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📝</div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Example Texts</h3>
                        <p className="text-sm text-gray-600">See example texts for each emotion category</p>
                    </Link>

                    <Link href="/how-it-works" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-500 cursor-pointer group">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🧠</div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">How It Works</h3>
                        <p className="text-sm text-gray-600">Learn about the model architecture and training</p>
                    </Link>

                    <Link href="/about" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500 cursor-pointer group">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">ℹ️</div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">About & FAQ</h3>
                        <p className="text-sm text-gray-600">Why predictions might seem unusual and more info</p>
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Powered by TensorFlow & FastAPI | Built with Next.js & Tailwind CSS</p>
                    <p className="mt-1">Multi-Task Learning NLP Model</p>
                </div>
            </div>
        </main>
    )
}
