import { useState, useEffect } from 'react';
import type { Task } from '../types';

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (text: string, energy?: Task['energyLevel'], context?: Task['context'], dueDate?: number) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: Date.now(),
            energyLevel: energy || 'medium',
            context: context || 'personal',
            snoozeCount: 0,
            dueDate
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const snoozeTask = (id: string) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    snoozeCount: (task.snoozeCount || 0) + 1,
                    // Optional: Push due date if we had one? For now just track the count.
                };
            }
            return task;
        }));
    };

    return {
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        snoozeTask
    };
}
