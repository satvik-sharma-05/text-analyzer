'use client'

import Link from 'next/link'

export default function HowItWorks() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-semibold">
                    ← Back to Analyzer
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 mb-3">🧠 How Our Model Works</h1>
                <p className="text-gray-600 mb-8">
                    Understanding the Multi-Task Learning architecture behind the AI Text Analyzer
                </p>

                {/* Architecture Overview */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">🏗️ Multi-Task Learning Architecture</h2>
                    <p className="text-gray-700 mb-4">
                        Our model uses a <strong>Multi-Task Learning (MTL)</strong> approach with shared layers to simultaneously predict three different aspects of text:
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <h3 className="font-bold text-blue-700 mb-2">😊 Emotion Detection</h3>
                            <p className="text-sm text-gray-600">6 emotions: sadness, joy, love, anger, fear, surprise</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                            <h3 className="font-bold text-orange-700 mb-2">💬 Hate Speech</h3>
                            <p className="text-sm text-gray-600">3 classes: offensive speech, Neither, Hate Speech</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                            <h3 className="font-bold text-red-700 mb-2">⚠️ Violence Type</h3>
                            <p className="text-sm text-gray-600">5 types: sexual, physical, emotional, harmful traditional practice, economic</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                        <h3 className="font-bold text-gray-800 mb-3">🔄 Architecture Flow:</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex items-start">
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full mr-3 font-mono text-xs">1</span>
                                <span><strong>Input Layer:</strong> Text tokenized into sequences (max 50 tokens)</span>
                            </div>
                            <div className="flex items-start">
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full mr-3 font-mono text-xs">2</span>
                                <span><strong>Embedding Layer:</strong> Shared 128-dimensional word embeddings</span>
                            </div>
                            <div className="flex items-start">
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full mr-3 font-mono text-xs">3</span>
                                <span><strong>LSTM Layer:</strong> Shared 64-unit LSTM for sequence processing</span>
                            </div>
                            <div className="flex items-start">
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full mr-3 font-mono text-xs">4</span>
                                <span><strong>Pooling & Dropout:</strong> Global average pooling + 50% dropout</span>
                            </div>
                            <div className="flex items-start">
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full mr-3 font-mono text-xs">5</span>
                                <span><strong>Output Layers:</strong> 3 separate dense layers with softmax activation</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Training Details */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Training & Dataset</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-3">📚 Datasets Used:</h3>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    <span><strong>Emotions:</strong> 12,000 balanced samples (2,000 per emotion)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-orange-500 mr-2">•</span>
                                    <span><strong>Hate Speech:</strong> ~19,000 samples with balanced classes</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    <span><strong>Violence:</strong> ~20,000 samples across 5 violence types</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-3">⚙️ Training Configuration:</h3>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2">•</span>
                                    <span><strong>Optimizer:</strong> Adam</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2">•</span>
                                    <span><strong>Loss:</strong> Sparse Categorical Crossentropy</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2">•</span>
                                    <span><strong>Epochs:</strong> 10</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2">•</span>
                                    <span><strong>Batch Size:</strong> 4</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Why Multi-Task Learning */}
                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">✨ Why Multi-Task Learning?</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                            <h3 className="font-bold text-blue-700 mb-2">🎯 Better Generalization</h3>
                            <p className="text-sm text-gray-700">Shared layers learn common linguistic patterns across tasks, improving overall performance.</p>
                        </div>

                        <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                            <h3 className="font-bold text-green-700 mb-2">⚡ Efficient Training</h3>
                            <p className="text-sm text-gray-700">Single model handles multiple tasks, reducing computational resources.</p>
                        </div>

                        <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                            <h3 className="font-bold text-purple-700 mb-2">🔄 Knowledge Transfer</h3>
                            <p className="text-sm text-gray-700">Learning from one task helps improve performance on related tasks.</p>
                        </div>

                        <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                            <h3 className="font-bold text-orange-700 mb-2">📈 Comprehensive Analysis</h3>
                            <p className="text-sm text-gray-700">Get insights into multiple aspects of text simultaneously.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
