import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types - eventually move to types/index.ts
export interface ResumeSection {
    id: string;
    type: 'experience' | 'education' | 'skills' | 'summary' | 'custom';
    title: string;
    content: any; // JSONB structure
}

export interface ResumeState {
    resumeData: {
        id: string;
        title: string;
        sections: ResumeSection[];
        theme: any;
        analysis: {
            score: number;
            improvements: string[];
        };
    };
    isLoading: boolean;
    setAnalysis: (data: { score: number; improvements: string[] }) => void;
    updateSection: (id: string, content: any) => void;
    addSection: (section: ResumeSection) => void;
    reorderSections: (newOrder: ResumeSection[]) => void;
    resetResume: () => void;
}

const initialResumeData = {
    id: 'default-resume',
    title: 'My Resume',
    sections: [],
    theme: {},
    analysis: { score: 0, improvements: [] },
};

export const useResumeStore = create<ResumeState>()(
    persist(
        (set) => ({
            resumeData: initialResumeData,
            isLoading: false,
            setAnalysis: (data) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, analysis: data }
                })),
            updateSection: (id, content) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        sections: state.resumeData.sections.map((s) =>
                            s.id === id ? { ...s, content } : s
                        ),
                    },
                })),
            addSection: (section) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        sections: [...state.resumeData.sections, section],
                    },
                })),
            reorderSections: (newOrder) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        sections: newOrder,
                    },
                })),
            resetResume: () =>
                set({ resumeData: initialResumeData }),
        }),
        {
            name: 'nexus-resume-storage', // unique name
            // storage defaults to localStorage
        }
    )
);
