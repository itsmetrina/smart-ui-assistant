import { NextResponse } from "next/server";
import OpenAI from "openai";
import { rateLimit } from "../_lib/rateLimiter";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

function extractJson(raw: string) {
    if (!raw) return { en: "", hi: "", bn: "" };
    let cleaned = raw.replace(/```json|```/gi, "").trim();
    try {
        const parsed = JSON.parse(cleaned);
        if (parsed.en && parsed.hi && parsed.bn) return parsed;
    } catch { }
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
        try {
            const parsed = JSON.parse(match[0]);
            if (parsed.en && parsed.hi && parsed.bn) return parsed;
        } catch { }
    }
    return {
        en: cleaned,
        hi: cleaned,
        bn: cleaned,
    };
}

export async function POST(req: Request) {
    const ip = req.headers.get("x-forwarded-for") || "local";
    const limit = rateLimit(ip);
    if (!limit.allowed) {
        return NextResponse.json(
            {
                error: "Too many requests. Please wait a few seconds.",
                retryAfter: limit.retryAfter,
            },
            { status: 429 }
        );
    }
    const { text } = await req.json();
    const prompt = `
        Translate this text into English, Hindi, and Bengali:
        "${text}"
        You MUST return JSON only. No explanations. No extra text.
        Return exactly:
        {
            "en": "...",
            "hi": "...",
            "bn": "..."
        }
    `;
    const res = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });
    const raw = res.choices[0].message.content || "";
    const parsed = extractJson(raw);
    return NextResponse.json(parsed);
}