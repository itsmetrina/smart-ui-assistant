import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

function cleanText(raw: string): string {
    if (!raw) return "";
    return raw.replace(/```json|```/gi, "").trim();
}

export async function POST(req: Request) {
    const { text } = await req.json();
    const prompt = `Improve this UX copy without changing its meaning:\n"${text}"`;
    const res = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });
    const cleaned = cleanText(res.choices[0].message.content || "");
    return NextResponse.json({ improved: cleaned });
}