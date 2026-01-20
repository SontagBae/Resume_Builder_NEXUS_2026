"use client";

import Link from "next/link";
import { LayoutTemplate, User, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavigationHost() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className={cn(
                "glass-panel mx-auto max-w-7xl rounded-2xl p-4",
                "flex items-center justify-between"
            )}>
                {/* Branding */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-white/10">
                        <LayoutTemplate size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                        NEXUS
                    </span>
                </div>

                {/* Dynamic Actions */}
                <nav className="flex items-center gap-4">
                    <button className="flex items-center gap-2 rounded-xl px-4 py-2 hover:bg-white/5 transition-colors text-zinc-400 hover:text-white text-sm font-medium">
                        Templates
                    </button>
                    <button className="flex items-center gap-2 rounded-xl px-4 py-2 hover:bg-white/5 transition-colors text-zinc-400 hover:text-white text-sm font-medium">
                        History
                    </button>
                </nav>

                {/* User / Wallet */}
                <div className="flex items-center gap-3">
                    <button className={cn(
                        "group relative flex items-center justify-center h-10 px-4 gap-2",
                        "rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all"
                    )}>
                        <Wallet size={16} className="text-zinc-500 group-hover:text-zinc-300" />
                        <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200">Connect ID</span>
                    </button>
                    <div className="h-10 w-10 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden">
                        {/* Avatar Placeholder */}
                    </div>
                </div>
            </div>
        </header>
    );
}
