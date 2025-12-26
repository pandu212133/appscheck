export type Subject = 'GS1' | 'GS2' | 'GS3' | 'GS4' | 'Optional' | 'Essay' | 'CSAT' | 'Current Affairs';

export interface SessionLog {
    id: string;
    subject: Subject;
    duration: number; // in seconds
    timestamp: number;
    notes?: string;
}

export type EnergyLevel = 'high' | 'medium' | 'low';
export type TaskContext = 'work' | 'personal' | 'admin';

export interface Task {
    id: string;
    text: string;
    completed: boolean;
    subject?: Subject;
    createdAt: number;
    // New fields for Context-Aware System
    energyLevel?: EnergyLevel;
    context?: TaskContext;
    snoozeCount: number;
    dueDate?: number;
}

export type Chronotype = 'lark' | 'owl' | 'third-bird';

export interface UserSettings {
    workStartHour: number; // 0-23
    workEndHour: number;   // 0-23
    chronotype: Chronotype;
}
