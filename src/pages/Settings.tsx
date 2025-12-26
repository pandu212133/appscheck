import type { UserSettings } from '../types';
import { Clock, Sun, Moon, Sunrise } from 'lucide-react';

interface SettingsProps {
    settings: UserSettings;
    onUpdate: (settings: Partial<UserSettings>) => void;
}

export function Settings({ settings, onUpdate }: SettingsProps) {
    return (
        <div className="glass-panel" style={{ padding: 'var(--space-lg)', maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="text-gradient" style={{ marginBottom: '2rem' }}>System Settings</h2>

            <div className="settings-section">
                <h3 className="section-title"><Clock size={16} /> Work Schedule</h3>
                <p className="section-desc">
                    Define your "Official" work hours. Outside this window, the system enters
                    <strong> Personal Mode</strong> to protect your downtime.
                </p>

                <div className="time-inputs">
                    <div className="input-group">
                        <label>Start Hour (0-23)</label>
                        <input
                            type="number"
                            min="0"
                            max="23"
                            value={settings.workStartHour}
                            onChange={(e) => onUpdate({ workStartHour: parseInt(e.target.value) })}
                            className="glass-input"
                        />
                    </div>
                    <div className="input-group">
                        <label>End Hour (0-23)</label>
                        <input
                            type="number"
                            min="0"
                            max="23"
                            value={settings.workEndHour}
                            onChange={(e) => onUpdate({ workEndHour: parseInt(e.target.value) })}
                            className="glass-input"
                        />
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h3 className="section-title"><Sun size={16} /> Chronotype</h3>
                <p className="section-desc">
                    This adjusts energy recommendations based on your biological peak times.
                </p>

                <div className="chronotype-options">
                    <button
                        className={`option-card ${settings.chronotype === 'lark' ? 'active' : ''}`}
                        onClick={() => onUpdate({ chronotype: 'lark' })}
                    >
                        <Sunrise size={24} />
                        <span className="title">Lark</span>
                        <span className="desc">Early riser, peak energy in morning.</span>
                    </button>

                    <button
                        className={`option-card ${settings.chronotype === 'third-bird' ? 'active' : ''}`}
                        onClick={() => onUpdate({ chronotype: 'third-bird' })}
                    >
                        <Sun size={24} />
                        <span className="title">Third Bird</span>
                        <span className="desc">Most people. Peak mid-morning & late afternoon.</span>
                    </button>

                    <button
                        className={`option-card ${settings.chronotype === 'owl' ? 'active' : ''}`}
                        onClick={() => onUpdate({ chronotype: 'owl' })}
                    >
                        <Moon size={24} />
                        <span className="title">Owl</span>
                        <span className="desc">Late riser, peak energy in evening.</span>
                    </button>
                </div>
            </div>

            <style>{`
        .settings-section {
            margin-bottom: var(--space-xl);
            padding-bottom: var(--space-lg);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .settings-section:last-child {
            border-bottom: none;
        }

        .section-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.2rem;
            color: var(--color-text);
            margin-bottom: var(--space-xs);
        }

        .section-desc {
            color: var(--color-text-dim);
            font-size: 0.9rem;
            margin-bottom: var(--space-md);
            line-height: 1.5;
        }

        .time-inputs {
            display: flex;
            gap: var(--space-lg);
        }

        .input-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .glass-input {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--glass-border);
            padding: 12px;
            border-radius: var(--radius-md);
            color: var(--color-text);
            font-size: 1rem;
            width: 100px;
        }

        .chronotype-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: var(--space-md);
        }

        .option-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--glass-border);
            padding: var(--space-md);
            border-radius: var(--radius-md);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .option-card:hover {
            background: rgba(255, 255, 255, 0.08);
        }

        .option-card.active {
            border-color: var(--color-primary);
            background: rgba(var(--color-primary-rgb), 0.1);
        }

        .option-card .title {
            font-weight: 600;
            color: var(--color-text);
        }

        .option-card .desc {
            font-size: 0.75rem;
            color: var(--color-text-dim);
        }
      `}</style>
        </div>
    );
}
