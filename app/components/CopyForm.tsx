"use client";

import { useState } from "react";

export default function CopyForm({ onResult }: any) {
    const [component, setComponent] = useState("button");
    const [tone, setTone] = useState("friendly");
    const [context, setContext] = useState("");
    const [loading, setLoading] = useState(false);

    async function generate() {
        setLoading(true);
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ component, tone, context })
        });
        const data = await res.json();
        onResult(data.ideas);
        setLoading(false);
    }
    
    return (
        <div className="card space-y-4">
            <select
                value={component}
                onChange={(e) => setComponent(e.target.value)}
                className="bg-[#111] border border-[#333] p-2 rounded w-full"
            >
                <option value="button">Button</option>
                <option value="tooltip">Tooltip</option>
                <option value="error">Error Message</option>
                <option value="banner">Banner</option>
            </select>
            <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="bg-[#111] border border-[#333] p-2 rounded w-full"
            >
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
                <option value="playful">Playful</option>
            </select>
            <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Enter context..."
                className="bg-[#111] border border-[#333] p-2 rounded w-full min-h-20"
            />
            <button
                onClick={generate}
                className="w-full px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer text-white font-medium"
            >
                {loading ? "Generating..." : "Generate Copy"}
            </button>
        </div>
    );
}