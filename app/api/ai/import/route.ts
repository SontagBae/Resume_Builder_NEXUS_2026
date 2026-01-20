import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Extract text from PDF using createRequire for CommonJS in ESM
        const { createRequire } = require('module');
        const require_ = createRequire(import.meta.url);
        const pdf = require_('pdf-parse');
        const data = await pdf(buffer);
        const rawText = data.text;

        // Simulate AI extraction and mapping
        // In a real scenario, we would send 'rawText' to Gemini here.
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock extracted data based on general PDF parsing success
        return NextResponse.json({
            sections: [
                {
                    type: 'summary',
                    title: 'Professional Summary',
                    content: { text: "Extracted professional summary from your PDF... (Simulated AI Mapping)" }
                },
                {
                    type: 'experience',
                    title: 'Experience',
                    content: {
                        items: [
                            { role: "Software Engineer", company: "Extracted Corp", period: "2020 - Present", description: "Led development of various AI features..." }
                        ]
                    }
                },
                {
                    type: 'skills',
                    title: 'Skills',
                    content: { list: ["React", "TypeScript", "Next.js", "AI Integration"] }
                }
            ],
            analysis: {
                score: 85,
                improvements: ["Add more quantitative metrics to your experience", "Include a certifications section"]
            }
        });

    } catch (error) {
        console.error('PDF Import Error:', error);
        return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
    }
}
