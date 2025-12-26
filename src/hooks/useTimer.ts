import { useState, useEffect, useRef } from 'react';
import type { Subject, SessionLog } from '../types';

export function useTimer(initialDuration = 25 * 60) {
    const [timeLeft, setTimeLeft] = useState(initialDuration);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');
    const [subject, setSubject] = useState<Subject>('GS1');
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);

            // Log session if in focus mode
            if (mode === 'focus') {
                const session: SessionLog = {
                    id: crypto.randomUUID(),
                    subject,
                    duration: initialDuration,
                    timestamp: Date.now()
                };

                const existingLogs = JSON.parse(localStorage.getItem('study_sessions') || '[]');
                localStorage.setItem('study_sessions', JSON.stringify([...existingLogs, session]));

                // TODO: Play sound or notification
            }

            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft, mode, subject, initialDuration]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const setTimerMode = (newMode: 'focus' | 'break') => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
    };

    return {
        timeLeft,
        isActive,
        toggleTimer,
        resetTimer,
        mode,
        setTimerMode,
        subject,
        setSubject
    };
}
