import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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
    let ideas = [];
    try {
        ideas = JSON.parse(raw);
    } catch {
        ideas = [raw];
    }
    return NextResponse.json({ ideas });
}