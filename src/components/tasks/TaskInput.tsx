import React, { useState } from 'react';
import { Plus, Zap, Briefcase, User, FileText } from 'lucide-react';
import type { EnergyLevel, TaskContext } from '../../types';

interface TaskInputProps {
    onAdd: (text: string, energy: EnergyLevel, context: TaskContext) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
    const [value, setValue] = useState('');
    const [energy, setEnergy] = useState<EnergyLevel>('medium');
    const [context, setContext] = useState<TaskContext>('personal');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            onAdd(value.trim(), energy, context);
            setValue('');
            // Reset defaults
            setEnergy('medium');
            setContext('personal');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-input-wrapper">
            <div className="input-row">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    className="task-input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit" className="add-btn" disabled={!value.trim()}>
                    <Plus size={20} />
                </button>
            </div>

            <div className="meta-row">
                <div className="selector-group">
                    <span className="label"><Zap size={12} /> Energy:</span>
                    <select
                        value={energy}
                        onChange={(e) => setEnergy(e.target.value as EnergyLevel)}
                        className="meta-select"
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div className="selector-group">
                    <span className="label">
                        {context === 'work' ? <Briefcase size={12} /> :
                            context === 'personal' ? <User size={12} /> : <FileText size={12} />}
                        Context:
                    </span>
                    <select
                        value={context}
                        onChange={(e) => setContext(e.target.value as TaskContext)}
                        className="meta-select"
                    >
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            <style>{`
        .task-input-wrapper {
            margin-bottom: var(--space-md);
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-md);
            padding: var(--space-sm);
        }

        .input-row {
            position: relative;
            display: flex;
            align-items: center;
            margin-bottom: var(--space-sm);
        }

        .task-input {
            width: 100%;
            padding: var(--space-sm);
            padding-right: 50px;
            background: transparent;
            border: none;
            color: var(--color-text);
            font-size: 1rem;
        }

        .task-input:focus {
            outline: none;
        }

        .meta-row {
            display: flex;
            gap: var(--space-md);
            padding-top: var(--space-xs);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .selector-group {
            display: flex;
            align-items: center;
            gap: var(--space-xs);
            font-size: 0.8rem;
            color: var(--color-text-dim);
        }

        .label {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .meta-select {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--color-text);
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 0.8rem;
            cursor: pointer;
        }

        .meta-select:focus {
            outline: none;
            border-color: var(--color-primary);
        }

        .add-btn {
            position: absolute;
            right: 0;
            background: var(--color-primary);
            color: white;
            border-radius: var(--radius-sm);
            padding: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .add-btn:hover:not(:disabled) {
            transform: scale(1.05);
            box-shadow: 0 0 10px var(--color-primary-glow);
        }
        
        .add-btn:disabled {
            background: var(--color-text-dim);
            opacity: 0.5;
            cursor: not-allowed;
        }
      `}</style>
        </form>
    );
}
