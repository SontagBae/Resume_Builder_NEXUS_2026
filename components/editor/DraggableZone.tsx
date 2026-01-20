"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

interface DraggableZoneProps {
    id: string;
    children: React.ReactNode;
}

export function DraggableZone({ id, children }: DraggableZoneProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group relative flex items-start gap-2 p-2 rounded-xl transition-all",
                isDragging ? "z-50 opacity-50 bg-zinc-900/50" : "hover:bg-zinc-900/30"
            )}
        >
            {/* Drag Handle - shows on hover */}
            <div
                {...attributes}
                {...listeners}
                className="mt-1 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400 transition-opacity"
            >
                <GripVertical size={20} />
            </div>

            {/* Content */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
