"use client";

import { useEffect, useState } from "react";
import { useResumeStore } from "@/lib/store";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true);
        // Potential place to trigger an initial sync check
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-background" />; // Default fallback
    }

    return <div className="min-h-screen animate-in fade-in duration-500">{children}</div>;
}
