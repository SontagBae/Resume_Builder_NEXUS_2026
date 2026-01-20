"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface EditableTextProps {
    value: string;
    onSave: (value: string) => void;
    placeholder?: string;
    className?: string;
    multiline?: boolean;
}

export function EditableText({
    value,
    onSave,
    placeholder = "Type here...",
    className,
    multiline = false,
}: EditableTextProps) {
    const [content, setContent] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync with prop updates
    useEffect(() => {
        if (content !== value) {
            setContent(value);
        }
    }, [value]);

    const handleBlur = () => {
        if (containerRef.current) {
            const newContent = containerRef.current.innerText;
            if (newContent !== value) {
                onSave(newContent);
            }
        }
    };

    return (
        <div
            ref={containerRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleBlur}
            className={cn(
                "empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-500 cursor-text outline-none focus:bg-white/5 rounded-md px-1 transition-colors",
                multiline ? "whitespace-pre-wrap" : "whitespace-nowrap overflow-hidden",
                className
            )}
            data-placeholder={placeholder}
        >
            {content}
        </div>
    );
}
