import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();

    // Simulate AI latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock Analysis Logic
    const score = Math.floor(Math.random() * (95 - 60) + 60);
    const improvements = [
        "Use strong action verbs like 'Architected' or 'Spearheaded'",
        "Quantify your achievements (e.g., 'Reduced latency by 40%')",
        "Add more robust skills section to pass ATS filters",
        "Ensure consistency in date formatting"
    ];

    return NextResponse.json({
        score,
        improvements: improvements.sort(() => 0.5 - Math.random()).slice(0, 3)
    });
}
