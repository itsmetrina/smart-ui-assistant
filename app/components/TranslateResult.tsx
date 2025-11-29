"use client";

import { Copy, SquareX } from "lucide-react";

export default function TranslateResult({ data, onClose }: any) {
    console.log(data, "data")
    if (!data) return null;

    return (
        <div className="card mt-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-green-300">Translations 🌐</h3>
                <button
                    onClick={onClose}
                    className="text-sm bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                >
                    <SquareX className="w-4 h-4 text-white" />
                </button>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <p><b className="text-green-400">English:</b> {data.en}</p>
                    <button
                        onClick={() => navigator.clipboard.writeText(data.en)}
                        className="text-xs bg-pink-700 hover:bg-pink-600 px-2 py-1 rounded"
                    >
                        <Copy className="w-4 h-4 text-white" />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <p><b className="text-green-400">Hindi:</b> {data.hi}</p>
                    <button
                        onClick={() => navigator.clipboard.writeText(data.hi)}
                        className="text-xs bg-pink-700 hover:bg-pink-600 px-2 py-1 rounded"
                    >
                        <Copy className="w-4 h-4 text-white" />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <p><b className="text-green-400">Bengali:</b> {data.bn}</p>
                    <button
                        onClick={() => navigator.clipboard.writeText(data.bn)}
                        className="text-xs bg-pink-700 hover:bg-pink-600 px-2 py-1 rounded"
                    >
                        <Copy className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}