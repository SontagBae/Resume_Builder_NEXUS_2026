"use client";

import { useState, useRef } from "react";
import { Upload, FileType, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResumeStore } from "@/lib/store";

export function ImportZone() {
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const setAnalysis = useResumeStore((state) => state.setAnalysis);
    const resetResume = useResumeStore((state) => state.resetResume);
    const addSection = useResumeStore((state) => state.addSection);

    const handleFile = async (file: File) => {
        if (file.type !== "application/pdf") {
            setStatus("error");
            setErrorMessage("Please upload a PDF file.");
            return;
        }

        setStatus("uploading");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/ai/import", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Import failed");

            const data = await response.json();

            // Reset current state and populate with AI extracted data
            resetResume();

            // Assuming AI returns an array of sections
            if (data.sections) {
                data.sections.forEach((section: any) => {
                    addSection({
                        id: crypto.randomUUID(),
                        ...section
                    });
                });
            }

            if (data.analysis) {
                setAnalysis(data.analysis);
            }

            setStatus("success");
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            console.error(error);
            setStatus("error");
            setErrorMessage("Something went wrong during the import.");
        }
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFile(file);
            }}
            className={cn(
                "relative group flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer",
                isDragging ? "border-indigo-500 bg-indigo-500/5" : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/50",
                status === "success" && "border-emerald-500 bg-emerald-500/5",
                status === "error" && "border-red-500 bg-red-500/5"
            )}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                }}
            />

            {status === "idle" && (
                <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                        <Upload size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Import PDF Resume</h3>
                    <p className="text-sm text-zinc-500 text-center">Drag and drop or click to upload</p>
                </>
            )}

            {status === "uploading" && (
                <>
                    <Loader2 size={32} className="text-indigo-400 animate-spin mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-1">AI Extracting...</h3>
                    <p className="text-sm text-zinc-500 text-center">Reading your professional narrative</p>
                </>
            )}

            {status === "success" && (
                <>
                    <CheckCircle2 size={32} className="text-emerald-400 mb-4 animate-in zoom-in" />
                    <h3 className="text-lg font-semibold text-white mb-1">Optimized!</h3>
                    <p className="text-sm text-zinc-500 text-center">Resume data successfully mapped</p>
                </>
            )}

            {status === "error" && (
                <>
                    <AlertCircle size={32} className="text-red-400 mb-4 animate-in shake" />
                    <h3 className="text-lg font-semibold text-white mb-1">Upload Failed</h3>
                    <p className="text-sm text-red-400 text-center">{errorMessage}</p>
                    <button
                        className="mt-4 text-xs font-medium text-zinc-400 hover:text-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            setStatus("idle");
                        }}
                    >
                        Try Again
                    </button>
                </>
            )}
        </div>
    );
}
