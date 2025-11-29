"use client";

import { useState } from "react";
import useHistory from "../store/useHistory";
import useCooldown from "./useCooldown";
import useDebounce from "./useDebounce";

export default function useAI() {
    const [result, setResult] = useState<string[]>([]);
    const [improved, setImproved] = useState("");
    const [translated, setTranslated] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { cooldown, startCooldown } = useCooldown();
    const { canCall } = useDebounce(800);
    const { history, add, clear } = useHistory();

    async function handleRateLimit(res: Response) {
        if (res.status === 429) {
            const data = await res.json();
            startCooldown(data.retryAfter / 1000);
            return true;
        }
        return false;
    }
    // GENERATE
    async function generate(component: string, tone: string, context: string) {
        if (!canCall()) return;
        setLoading(true);
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ component, tone, context }),
        });
        if (await handleRateLimit(res)) {
            setLoading(false);
            return;
        }
        const data = await res.json();
        setResult(data.ideas);
        add({ timestamp: Date.now(), action: "Generate", component, tone, context, ideas: data.ideas });
        setLoading(false);
    }

    // IMPROVE
    async function improve(text: string) {
        if (!canCall()) return;
        const res = await fetch("/api/improve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        if (await handleRateLimit(res)) return;
        const data = await res.json();
        setImproved(data.improved);
        add({ timestamp: Date.now(), action: "Improve", context: text, ideas: [data.improved], component: null, tone: null });
    }

    // TRANSLATE
    async function translate(text: string) {
        if (!canCall()) return;
        const res = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        if (await handleRateLimit(res)) return;
        const data = await res.json();
        setTranslated(data);
        add({
            timestamp: Date.now(),
            action: "Translate",
            context: text,
            ideas: [`EN: ${data.en}`, `HI: ${data.hi}`, `BN: ${data.bn}`],
            component: null,
            tone: null
        });
    }

    async function clearImproved() {
        setImproved("");
    }

    async function clearTranslated() {
        setTranslated(null);
    }

    return {
        result,
        improved,
        translated,
        loading,
        cooldown,
        generate,
        improve,
        translate,
        history,
        clear,
        clearImproved,
        clearTranslated
    };
}