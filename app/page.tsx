"use client";

import { useResumeStore } from "@/lib/store";
import { ArrowRight, FileText, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { resumeData, addSection } = useResumeStore();

  const handleStartNew = () => {
    // Initial setup logic if needed
    router.push("/editor");
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-8">

      {/* Hero Section */}
      <div className="space-y-4 max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400 mb-4">
          <Sparkles size={12} className="text-yellow-400" />
          <span>Powered by Gemini 1.5 Pro</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
          Craft Your <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Career Narrative
          </span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Build a fraud-proof, AI-optimized resume in minutes using our local-first secure editor.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mt-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">

        {/* New Resume */}
        <button
          onClick={handleStartNew}
          className="group relative flex flex-col items-start p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 hover:bg-zinc-900 transition-all text-left"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Create New Resume</h3>
          <p className="text-sm text-zinc-500 mb-6">Start from scratch with our AI-guided block editor.</p>
          <div className="mt-auto flex items-center gap-2 text-indigo-400 text-sm font-medium group-hover:gap-3 transition-all">
            <span>Start Building</span>
            <ArrowRight size={16} />
          </div>
        </button>

        {/* Import */}
        <button className="group relative flex flex-col items-start p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 hover:bg-zinc-900 transition-all text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 mb-6 group-hover:scale-110 transition-transform">
            <Wand2 size={24} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Import & Optimize</h3>
          <p className="text-sm text-zinc-500 mb-6">Upload an existing PDF or LinkedIn profile to get started.</p>
          <div className="mt-auto flex items-center gap-2 text-pink-400 text-sm font-medium group-hover:gap-3 transition-all">
            <span>Import Data</span>
            <ArrowRight size={16} />
          </div>
        </button>
      </div>
    </div>
  );
}
