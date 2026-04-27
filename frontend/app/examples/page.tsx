'use client'

import Link from 'next/link'

export default function Examples() {
    const emotions = [
        {
            emoji: '😢',
            name: 'Sadness',
            color: 'blue',
            example: 'I feel so lonely and depressed, nobody cares about me anymore',
            keywords: 'lonely, depressed, sad, crying, heartbroken'
        },
        {
            emoji: '😊',
            name: 'Joy',
            color: 'yellow',
            example: 'This is the best day ever! I am so excited and thrilled about everything!',
            keywords: 'excited, thrilled, best, wonderful, amazing'
        },
        {
            emoji: '❤️',
            name: 'Love',
            color: 'pink',
            example: 'I love you so much, you mean everything to me, my darling',
            keywords: 'love, adore, cherish, darling, sweetheart'
        },
        {
            emoji: '😠',
            name: 'Anger',
            color: 'red',
            example: 'I am so furious and mad right now! This makes me absolutely angry!',
            keywords: 'furious, mad, angry, rage, irritated'
        },
        {
            emoji: '😨',
            name: 'Fear',
            color: 'purple',
            example: 'I am so scared and terrified, I feel anxious and worried about everything',
            keywords: 'scared, terrified, anxious, worried, afraid'
        },
        {
            emoji: '😲',
            name: 'Surprise',
            color: 'green',
            example: 'Wow! I cannot believe this! This is so unexpected and shocking!',
            keywords: 'wow, shocked, unexpected, amazed, astonished'
        }
    ]

    const getColorClasses = (color: string) => {
        const colors: { [key: string]: string } = {
            blue: 'bg-blue-50 border-blue-500 text-blue-800',
            yellow: 'bg-yellow-50 border-yellow-500 text-yellow-800',
            pink: 'bg-pink-50 border-pink-500 text-pink-800',
            red: 'bg-red-50 border-red-500 text-red-800',
            purple: 'bg-purple-50 border-purple-500 text-purple-800',
            green: 'bg-green-50 border-green-500 text-green-800'
        }
        return colors[color] || 'bg-gray-50 border-gray-500 text-gray-800'
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-semibold">
                    ← Back to Analyzer
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 mb-3">📝 Example Texts for Each Emotion</h1>
                <p className="text-gray-600 mb-8">
                    Copy and paste these examples into the analyzer to see clear emotion classifications.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    {emotions.map((emotion) => (
                        <div key={emotion.name} className={`${getColorClasses(emotion.color)} border-l-4 p-6 rounded-r-lg shadow-lg`}>
                            <div className="flex items-center mb-3">
                                <span className="text-3xl mr-3">{emotion.emoji}</span>
                                <h2 className="text-2xl font-bold">{emotion.name}</h2>
                            </div>
                            <p className="font-mono text-sm mb-3 bg-white bg-opacity-50 p-3 rounded">
                                &quot;{emotion.example}&quot;
                            </p>
                            <p className="text-xs italic">
                                <strong>Keywords:</strong> {emotion.keywords}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    <p className="text-gray-700">
                        <strong>💡 Tip:</strong> These examples are designed to clearly express each emotion. For best results, use similar clear and unambiguous language in your own texts!
                    </p>
                </div>
            </div>
        </main>
    )
}
