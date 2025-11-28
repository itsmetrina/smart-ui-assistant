"use client";

export default function CopyPreview({ ideas, onImprove, onTranslate }: { ideas: string[], onImprove: any, onTranslate: any }) {
    if (!ideas || ideas.length === 0) return null;

    return (
        <div className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-semibold">Generated Copy</h2>
            {ideas.map((text: string, i: number) => (
                <div key={i} className="card">
                    <p className="text-lg mb-3">{text}</p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => onImprove(text)}
                            className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white text-sm"
                        >
                            Improve ✨
                        </button>
                        <button
                            onClick={() => onTranslate(text)}
                            className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm"
                        >
                            Translate 🌐
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}