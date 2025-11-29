"use client";

import { Copy, Languages, Sparkles, SquareX } from "lucide-react";

export default function ImproveResult({ text, onTranslate, onClose }: any) {
    if (!text) return null;

    return (
        <div className="card animate-fadeIn mt-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-purple-300">
                    <span className="flex flex-row items-center gap-2">
                        Improved Copy
                        <Sparkles className="w-4 h-4 text-white" />
                    </span>
                </h3>
                <div className="flex flex-row items-center gap-2">
                    <button
                        onClick={() => navigator.clipboard.writeText(text)}
                        className="text-sm bg-pink-700 px-2 py-1 rounded hover:bg-pink-600"
                    >
                        <Copy className="w-4 h-4 text-white" />
                    </button>
                    <button
                        onClick={() => onTranslate(text)}
                        className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm"
                    >
                        <Languages className="w-4 h-4 text-white" />
                    </button>
                    <button
                        onClick={onClose}
                        className="text-sm bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                    >
                        <SquareX className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>
            <p className="mt-2 text-gray-200">{text}</p>
        </div>
    );
}