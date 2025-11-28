import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

function extractJson(raw: string): any {
    if (!raw) return {};
    let cleaned = raw.replace(/```json|```/gi, "").trim();
    try {
        const direct = JSON.parse(cleaned);
        if (direct.en || direct.hi || direct.bn) return direct;
    } catch { }
    const objMatch = cleaned.match(/\[([\s\S]*?)\]/);
    if (objMatch) {
        try {
            return JSON.parse(objMatch[0]);
        } catch { }
    }
    return { en: cleaned, hi: cleaned, bn: cleaned };
}

export async function POST(req: Request) {
    const { text } = await req.json();
    const prompt = `
        Translate this text into English, Hindi, and Bengali:
        "${text}"
        Return JSON like {
        "en": "",
        "hi": "",
        "bn": ""
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