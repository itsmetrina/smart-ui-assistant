import { NextResponse } from "next/server";
import OpenAI from "openai";
import { rateLimit } from "../_lib/rateLimiter";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

function cleanText(raw: string): string {
    if (!raw) return "";
    return raw.replace(/```json|```/gi, "").replaceAll('"', '').trim();
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
    const prompt = `Improve this UX copy without changing its meaning:\n"${text}"`;
    const res = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });
    const cleaned = cleanText(res.choices[0].message.content || "");
    return NextResponse.json({ improved: cleaned });
}