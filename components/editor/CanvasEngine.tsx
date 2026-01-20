"use client";

import { useResumeStore } from "@/lib/store";
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableZone } from "./DraggableZone";
import { EditableText } from "@/components/blocks/EditableText";
import { cn } from "@/lib/utils";

export function CanvasEngine() {
    const { resumeData, reorderSections, updateSection } = useResumeStore();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = resumeData.sections.findIndex((item) => item.id === active.id);
            const newIndex = resumeData.sections.findIndex((item) => item.id === over.id);

            reorderSections(arrayMove(resumeData.sections, oldIndex, newIndex));
        }
    };

    // Temporary Section Renderer Factory
    const renderSectionContent = (section: any) => {
        return (
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    {section.type}
                </h3>
                <EditableText
                    value={section.title}
                    onSave={(val) => updateSection(section.id, { ...section.content, title: val })}
                    className="text-xl font-bold text-white mb-2"
                />
                {/* Placeholder for complex content */}
                <div className="p-4 rounded-lg bg-zinc-950/50 text-zinc-400 text-sm italic">
                    Content for {section.type} goes here. (EditableText implementations coming next)
                </div>
            </div>
        );
    }

    if (resumeData.sections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-zinc-800 rounded-2xl text-zinc-500">
                <p>Your resume is empty.</p>
                <p className="text-sm">Add a section to get started.</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Paper / Canvas Constraint */}
            <div id="resume-canvas" className={cn(
                "min-h-[800px] bg-zinc-950 shadow-2xl shadow-black/50 overflow-hidden",
                "border border-white/5 rounded-none md:rounded-sm", // Paper-like look? Or keep it digital?
                // "md:aspect-[1/1.414]" // A4 Ratio if desired, but sticking to fluid for now
            )}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={resumeData.sections.map(s => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-4 p-8 md:p-12">
                            {/* Header Section (Static for now, could be draggable too) */}
                            <div className="mb-8 border-b border-zinc-800 pb-8">
                                <h1 className="text-4xl font-bold text-white mb-2">{resumeData.title}</h1>
                                <p className="text-zinc-400">Professional Summary & Contact Info Placeholder</p>
                            </div>

                            {resumeData.sections.map((section) => (
                                <DraggableZone key={section.id} id={section.id}>
                                    {renderSectionContent(section)}
                                </DraggableZone>
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}
