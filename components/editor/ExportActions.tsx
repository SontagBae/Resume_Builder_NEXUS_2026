"use client";

import { Download, FileText, FileJson } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

export function ExportActions() {
    const resumeData = useResumeStore((state) => state.resumeData);

    const exportToPDF = async () => {
        const canvasElement = document.getElementById("resume-canvas");
        if (!canvasElement) return;

        try {
            const canvas = await html2canvas(canvasElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#09090b",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save(`${resumeData.title.replace(/\s+/g, "_")}.pdf`);
        } catch (error) {
            console.error("PDF Export Error:", error);
        }
    };

    const exportToDocx = async () => {
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        text: resumeData.title,
                        heading: HeadingLevel.HEADING_1,
                    }),
                    ...resumeData.sections.flatMap((section) => [
                        new Paragraph({
                            text: section.title,
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 400 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: JSON.stringify(section.content, null, 2), // Simplified for now
                                }),
                            ],
                        }),
                    ]),
                ],
            }],
        });

        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${resumeData.title.replace(/\s+/g, "_")}.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Export</h3>
            <div className="grid grid-cols-1 gap-2">
                <button
                    onClick={exportToPDF}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-all text-sm font-medium border border-indigo-500/20"
                >
                    <Download size={16} />
                    Export PDF
                </button>
                <button
                    onClick={exportToDocx}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all text-sm font-medium"
                >
                    <FileType size={16} />
                    Export Docx
                </button>
            </div>
        </div>
    );
}
