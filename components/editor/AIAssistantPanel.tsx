"use client";

import { useResumeStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Bot, CheckCircle2, RefreshCcw, Sparkles } from "lucide-react";
import { useState } from "react";

export function AIAssistantPanel() {
    const { resumeData, setAnalysis } = useResumeStore();
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            const res = await fetch('/api/ai/analyze', {
                method: 'POST',
                body: JSON.stringify(resumeData),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            setAnalysis(data);
        } catch (error) {
            console.error("AI Analysis failed", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const scoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-400";
        if (score >= 60) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <aside className="w-full md:w-80 shrink-0 space-y-6">
            <div className="sticky top-24 glass-panel rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white">AI Assistant</h2>
                        <p className="text-xs text-zinc-500">Real-time optimization</p>
                    </div>
                </div>

                {/* Score Card */}
                <div className="text-center p-6 bg-zinc-900/50 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm text-zinc-400 uppercase tracking-widest font-medium">ATS Score</span>
                    <div className={cn("text-5xl font-bold mt-2 mb-1", scoreColor(resumeData.analysis.score))}>
                        {resumeData.analysis.score}
                    </div>
                    <p className="text-xs text-zinc-500">out of 100</p>
                </div>

                {/* Actions */}
                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className={cn(
                        "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all",
                        isAnalyzing
                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20"
                    )}
                >
                    {isAnalyzing ? (
                        <RefreshCcw size={18} className="animate-spin" />
                    ) : (
                        <Sparkles size={18} />
                    )}
                    <span>{isAnalyzing ? "Analyzing..." : "Analyze Resume"}</span>
                </button>

                {/* Suggestions */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Top Improvements</h3>

                    {resumeData.analysis.improvements.length === 0 ? (
                        <p className="text-xs text-zinc-500 italic">Run analysis to see suggestions.</p>
                    ) : (
                        <ul className="space-y-3">
                            {resumeData.analysis.improvements.map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-zinc-300 p-3 bg-zinc-900/30 rounded-lg border border-white/5">
                                    <CheckCircle2 size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </aside>
    );
}
