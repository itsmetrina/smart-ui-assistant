"use client";

import { useEffect, useRef } from "react";

export default function useScrollToResult(...triggers: any[]) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const allEmpty = triggers.every((t) => {
            if (!t) return true;
            if (Array.isArray(t)) return t.length === 0;
            return false;
        });
        if (allEmpty) return;

        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [...triggers]);

    return ref;
}