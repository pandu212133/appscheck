import { useState, useEffect } from 'react';
import type { UserSettings } from '../types';

export type SystemMode = 'work' | 'personal' | 'transition';

const DEFAULT_SETTINGS: UserSettings = {
    workStartHour: 9,
    workEndHour: 17,
    chronotype: 'third-bird'
};

export function useContextEngine() {
    const [settings, setSettings] = useState<UserSettings>(() => {
        const saved = localStorage.getItem('user_settings');
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    });

    const [currentMode, setCurrentMode] = useState<SystemMode>('personal');

    useEffect(() => {
        const checkContext = () => {
            const now = new Date();
            const hour = now.getHours();

            if (hour >= settings.workStartHour && hour < settings.workEndHour) {
                setCurrentMode('work');
            } else if (hour === settings.workEndHour) {
                setCurrentMode('transition'); // The "Shutdown" hour
            } else {
                setCurrentMode('personal');
            }
        };

        // Check immediately
        checkContext();

        // Check every minute
        const interval = setInterval(checkContext, 60000);

        return () => clearInterval(interval);
    }, [settings]);

    const updateSettings = (newSettings: Partial<UserSettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        localStorage.setItem('user_settings', JSON.stringify(updated));
    };

    return {
        currentMode,
        settings,
        updateSettings
    };
}
