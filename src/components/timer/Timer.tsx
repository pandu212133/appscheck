
import { Play, Pause, RefreshCw } from 'lucide-react';
import { useTimer } from '../../hooks/useTimer';
import type { Subject } from '../../types';

const SUBJECTS: Subject[] = ['GS1', 'GS2', 'GS3', 'GS4', 'Optional', 'Essay', 'CSAT', 'Current Affairs'];

export function Timer() {
  const { timeLeft, isActive, toggleTimer, resetTimer, mode, setTimerMode, subject, setSubject } = useTimer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus'
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="timer-container">
      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === 'focus' ? 'active' : ''}`}
          onClick={() => setTimerMode('focus')}
        >
          Focus
        </button>
        <button
          className={`mode-btn ${mode === 'break' ? 'active' : ''}`}
          onClick={() => setTimerMode('break')}
        >
          Break
        </button>
      </div>

      {mode === 'focus' && !isActive && (
        <div className="subject-selector">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value as Subject)}
            className="glass-input"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      <div className="timer-display glass-panel">
        <div className="time-text">{formatTime(timeLeft)}</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="controls">
        <button className="control-btn main" onClick={toggleTimer}>
          {isActive ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: 4 }} />}
        </button>
        <button className="control-btn secondary" onClick={resetTimer}>
          <RefreshCw size={24} />
        </button>
      </div>

      <style>{`
        .timer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 400px;
          margin: 0 auto;
        }

        .mode-toggle {
          display: flex;
          background: rgba(0,0,0,0.2);
          padding: 4px;
          border-radius: var(--radius-full);
          margin-bottom: var(--space-lg);
        }

        .mode-btn {
          padding: 8px 24px;
          border-radius: var(--radius-full);
          color: var(--color-text-dim);
          font-weight: 500;
          transition: all 0.3s;
        }

        .mode-btn.active {
          background: var(--color-primary);
          color: white;
          box-shadow: 0 0 15px var(--color-primary-glow);
        }

        .subject-selector {
            margin-bottom: var(--space-md);
            width: 100%;
            max-width: 200px;
        }
        
        .glass-input {
            width: 100%;
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-sm);
            color: var(--color-text);
            font-family: inherit;
            cursor: pointer;
        }
        
        .glass-input option {
            background-color: var(--color-bg);
            color: var(--color-text);
        }

        .timer-display {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin-bottom: var(--space-lg);
          position: relative;
          overflow: hidden;
        }

        .time-text {
          font-size: 4rem;
          font-weight: 700;
          font-family: monospace;
          z-index: 2;
        }

        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.1);
        }

        .progress-fill {
          height: 100%;
          background: var(--color-secondary);
          transition: width 1s linear;
        }

        .controls {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .control-btn {
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          color: white;
        }

        .control-btn:hover {
          transform: scale(1.1);
        }

        .control-btn.main {
          width: 64px;
          height: 64px;
          background: var(--color-primary);
          box-shadow: 0 0 20px var(--color-primary-glow);
        }

        .control-btn.secondary {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
}
