
import type { Task } from '../../types';
import type { SystemMode } from '../../hooks/useContextEngine';
import { TaskItem } from './TaskItem';
import { TaskInput } from './TaskInput';
import { AlertTriangle } from 'lucide-react';

interface TaskListProps {
    tasks: Task[];
    onAddTask: (text: string, energy: Task['energyLevel'], context: Task['context']) => void;
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
    onSnoozeTask: (id: string) => void;
    systemMode?: SystemMode;
}

export function TaskList({
    tasks,
    onAddTask,
    onToggleTask,
    onDeleteTask,
    onSnoozeTask,
    systemMode
}: TaskListProps) {
    // Smart Filtering Logic
    const activeTasks = tasks.filter(t => !t.completed).filter(t => {
        if (!systemMode) return true;

        // In Personal Mode, hide Work tasks
        if (systemMode === 'personal' && t.context === 'work') return false;

        // In Work Mode, we generally show everything, or maybe hide 'Personal' if strict?
        // For now, let's just protect Personal time.

        return true;
    });

    const hiddenCount = tasks.filter(t => !t.completed).length - activeTasks.length;

    const completedTasks = tasks.filter(t => t.completed);

    return (
        <div className="task-list-container">
            <TaskInput onAdd={onAddTask} />

            {hiddenCount > 0 && (
                <div className="context-banner">
                    <AlertTriangle size={14} />
                    <span>{hiddenCount} work tasks hidden (Personal Mode)</span>
                </div>
            )}

            <div className="tasks-section">
                {activeTasks.length === 0 && completedTasks.length === 0 && hiddenCount === 0 ? (
                    <div className="empty-state">
                        <p>No tasks yet. Add one to get started!</p>
                    </div>
                ) : (
                    <>
                        {activeTasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={onToggleTask}
                                onDelete={onDeleteTask}
                                onSnooze={onSnoozeTask}
                            />
                        ))}

                        {completedTasks.length > 0 && (
                            <div className="completed-section">
                                <h3 className="section-title">Completed</h3>
                                {completedTasks.map(task => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onToggle={onToggleTask}
                                        onDelete={onDeleteTask}
                                        onSnooze={onSnoozeTask}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            <style>{`
        .task-list-container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .empty-state {
            text-align: center;
            color: var(--color-text-dim);
            padding: var(--space-xl);
            font-style: italic;
        }

        .context-banner {
            background: rgba(255, 217, 61, 0.1);
            border: 1px solid rgba(255, 217, 61, 0.2);
            color: #ffd93d;
            padding: 8px 12px;
            border-radius: var(--radius-sm);
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: var(--space-md);
        }

        .completed-section {
            margin-top: var(--space-lg);
            padding-top: var(--space-md);
            border-top: 1px solid var(--glass-border);
            opacity: 0.7;
        }

        .section-title {
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--color-text-dim);
            margin-bottom: var(--space-sm);
        }
      `}</style>
        </div>
    );
}
