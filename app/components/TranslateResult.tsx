"use client";

export default function TranslateResult({ data, onClose }: any) {
    if (!data) return null;

    return (
        <div className="card mt-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-green-300">Translations 🌐</h3>
                <button
                    onClick={onClose}
                    className="text-sm bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                >
                    Close
                </button>
            </div>
            <div className="space-y-2">
                <p><b className="text-green-400">English:</b> {data.en}</p>
                <p><b className="text-green-400">Hindi:</b> {data.hi}</p>
                <p><b className="text-green-400">Bengali:</b> {data.bn}</p>
            </div>
        </div>
    );
}