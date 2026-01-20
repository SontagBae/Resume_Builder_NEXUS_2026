"use client";

import { CanvasEngine } from "@/components/editor/CanvasEngine";
import { AIAssistantPanel } from "@/components/editor/AIAssistantPanel";
import { useResumeStore } from "@/lib/store";
import { Plus, Settings2, Download } from "lucide-react";
import { nanoid } from "nanoid"; // We need to install nanoid or use uuid

export default function EditorPage() {
    const { addSection } = useResumeStore();

    const handleAddSection = (type: 'experience' | 'education' | 'skills' | 'custom') => {
        addSection({
            id: crypto.randomUUID(),
            type,
            title: type.charAt(0).toUpperCase() + type.slice(1),
            content: {}
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">

            {/* Sidebar Controls */}
            <aside className="w-full md:w-64 shrink-0 space-y-6">
                <div className="sticky top-24 space-y-6 p-4 glass-panel rounded-xl">
                    <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
                        Blocks
                    </h2>

                    <div className="grid grid-cols-1 gap-2">
                        <button
                            onClick={() => handleAddSection('experience')}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all text-sm font-medium text-left border border-white/5 hover:border-white/10"
                        >
                            <Plus size={16} />
                            Experience
                        </button>
                        <button
                            onClick={() => handleAddSection('education')}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all text-sm font-medium text-left border border-white/5 hover:border-white/10"
                        >
                            <Plus size={16} />
                            Education
                        </button>
                        <button
                            onClick={() => handleAddSection('skills')}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all text-sm font-medium text-left border border-white/5 hover:border-white/10"
                        >
                            <Plus size={16} />
                            Skills
                        </button>
                    </div>

                    <div className="h-px bg-zinc-800" />

                    <button className="flex items-center gap-2 w-full px-4 py-3 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-all text-sm font-medium">
                        <Download size={16} />
                        Export PDF
                    </button>
                </div>
            </aside>

            {/* Main Canvas Area */}
            <div className="flex-1 min-w-0">
                <CanvasEngine />
            </div>

            {/* AI Assistant Panel */}
            <AIAssistantPanel />
        </div>
    );
}
