import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

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
    const raw = res.choices[0].message.content || "{}";
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
}
