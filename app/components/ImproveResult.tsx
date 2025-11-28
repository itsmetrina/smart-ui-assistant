"use client";

export default function ImproveResult({ text, onClose }: any) {
    if (!text) return null;

    return (
        <div className="card animate-fadeIn mt-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-purple-300">Improved Copy ✨</h3>
                <button
                    onClick={onClose}
                    className="text-sm bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                >
                    Close
                </button>
            </div>
            <p className="mt-2 text-gray-200">{text}</p>
        </div>
    );
}