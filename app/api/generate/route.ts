import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

function extractJsonArray(raw: string): string[] {
    if (!raw) return [];
    let cleaned = raw.replace(/```json|```/gi, "").trim();
    try {
        const direct = JSON.parse(cleaned);
        if (Array.isArray(direct)) return direct;
        if (Array.isArray(direct?.ideas)) return direct.ideas;
    } catch { }
    const match = cleaned.match(/\[([\s\S]*?)\]/);
    if (match) {
        try {
            const parsed = JSON.parse(match[0]);
            if (Array.isArray(parsed)) return parsed;
        } catch { }
    }
    return [cleaned];
}

export async function POST(req: Request) {
    const { component, tone, context } = await req.json();
    const prompt = `
        You are a UX writing expert.
        Generate 3 microcopy variations for a ${component}.
        Tone: ${tone}.
        Context: ${context}.
        Return ONLY a JSON array like ["a","b","c"]
    `;
    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });
    const raw = completion.choices[0].message.content || "[]";
    const ideas = extractJsonArray(raw);
    return NextResponse.json({ ideas });
}