"use client";

import { useEffect, useState } from "react";

export interface HistoryEntry {
    timestamp: number;
    action: string; // "Generate" | "Improve" | "Translate"
    context: string;
    ideas: string[];
    component?: string | null;
    tone?: string | null;
}

export default function useHistory() {
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("history");
        if (stored) setHistory(JSON.parse(stored));
    }, []);

    function add(entry: HistoryEntry) {
        const updated = [entry, ...history];
        setHistory(updated);
        localStorage.setItem("history", JSON.stringify(updated));
    }

    function clear() {
        setHistory([]);
        localStorage.removeItem("history");
    }

    return {history, add, clear};
}