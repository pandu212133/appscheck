
import { Check, Trash2, Circle, Clock, Zap, Briefcase, User, FileText } from 'lucide-react';
import type { Task } from '../../types';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onSnooze?: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete, onSnooze }: TaskItemProps) {
    const getEnergyColor = (energy?: string) => {
        switch (energy) {
            case 'high': return '#ff6b6b';
            case 'medium': return '#ffd93d';
            case 'low': return '#6bffad';
            default: return 'var(--color-text-dim)';
        }
    };

    const getContextIcon = (context?: string) => {
        switch (context) {
            case 'work': return <Briefcase size={10} />;
            case 'personal': return <User size={10} />;
            case 'admin': return <FileText size={10} />;
            default: return null;
        }
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <button
                className="toggle-btn"
                onClick={() => onToggle(task.id)}
            >
                {task.completed ? (
                    <div className="check-circle completed">
                        <Check size={14} color="white" />
                    </div>
                ) : (
                    <Circle size={20} className="check-circle" />
                )}
            </button>

            <div className="task-content">
                <span className="task-text">{task.text}</span>
                <div className="task-meta">
                    {task.energyLevel && (
                        <span className="meta-badge" style={{ borderColor: getEnergyColor(task.energyLevel), color: getEnergyColor(task.energyLevel) }}>
                            <Zap size={10} /> {task.energyLevel}
                        </span>
                    )}
                    {task.context && (
                        <span className="meta-badge context">
                            {getContextIcon(task.context)} {task.context}
                        </span>
                    )}
                    {(task.snoozeCount || 0) > 0 && (
                        <span className="meta-badge snooze-badge">
                            <Clock size={10} /> {task.snoozeCount}
                        </span>
                    )}
                </div>
            </div>

            <div className="actions">
                {onSnooze && !task.completed && (task.snoozeCount || 0) < 3 && (
                    <button
                        className="action-btn snooze-btn"
                        onClick={() => onSnooze(task.id)}
                        title="Snooze"
                    >
                        <Clock size={16} />
                    </button>
                )}

                <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(task.id)}
                    title="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <style>{`
        .task-item {
            display: flex;
            align-items: center;
            padding: var(--space-sm);
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-sm);
            margin-bottom: var(--space-xs);
            transition: all 0.2s ease;
        }

        .task-item:hover {
            background: rgba(255, 255, 255, 0.06);
            transform: translateX(2px);
        }

        .task-item.completed .task-text {
            text-decoration: line-through;
            color: var(--color-text-dim);
            opacity: 0.6;
        }

        .toggle-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: var(--space-sm);
            padding: 4px;
        }

        .check-circle {
            color: var(--color-text-dim);
            transition: all 0.2s;
        }

        .check-circle.completed {
            background: var(--color-secondary);
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
        }

        .task-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .task-text {
            font-size: 1rem;
        }

        .task-meta {
            display: flex;
            gap: 6px;
        }

        .meta-badge {
            display: flex;
            align-items: center;
            gap: 3px;
            font-size: 0.7rem;
            padding: 1px 4px;
            border-radius: 4px;
            border: 1px solid var(--color-text-dim);
            color: var(--color-text-dim);
            text-transform: uppercase;
        }

        .snooze-badge {
            border-color: #ffd93d;
            color: #ffd93d;
        }

        .actions {
            display: flex;
            gap: 4px;
            opacity: 0;
            transition: opacity 0.2s;
        }

        .task-item:hover .actions {
            opacity: 1;
        }

        .action-btn {
            color: var(--color-text-dim);
            padding: 6px;
            border-radius: 4px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .action-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: var(--color-text);
        }

        .delete-btn:hover {
            color: #ff6b6b;
            background: rgba(255, 107, 107, 0.1);
        }

        .snooze-btn:hover {
            color: #ffd93d;
            background: rgba(255, 217, 61, 0.1);
        }
      `}</style>
        </div>
    );
}
