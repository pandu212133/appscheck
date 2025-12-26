import { useState, useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { TaskList } from './components/tasks/TaskList';
import { Timer } from './components/timer/Timer';
import { Syllabus } from './pages/Syllabus';
import { Settings } from './pages/Settings';
import { useTasks } from './hooks/useTasks';
import { useContextEngine } from './hooks/useContextEngine';
import type { SessionLog } from './types';
import { Zap, Activity } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const { tasks, addTask, toggleTask, deleteTask, snoozeTask } = useTasks();
  const { currentMode, settings, updateSettings } = useContextEngine();
  const [stats, setStats] = useState({ totalMinutes: 0, subjectBreakdown: {} as Record<string, number> });

  useEffect(() => {
    const loadStats = () => {
      const sessions: SessionLog[] = JSON.parse(localStorage.getItem('study_sessions') || '[]');
      const totalSeconds = sessions.reduce((acc, curr) => acc + curr.duration, 0);

      const breakdown = sessions.reduce((acc, curr) => {
        acc[curr.subject] = (acc[curr.subject] || 0) + curr.duration;
        return acc;
      }, {} as Record<string, number>);

      setStats({
        totalMinutes: Math.floor(totalSeconds / 60),
        subjectBreakdown: breakdown
      });
    };

    loadStats();
    // Refresh stats every time we switch to dashboard
  }, [currentView]);

  const activeTasksCount = tasks.filter(t => !t.completed).length;

  // New Analytics
  const highEnergyCompleted = tasks.filter(t => t.completed && t.energyLevel === 'high').length;
  const totalCompleted = tasks.filter(t => t.completed).length;
  const focusRatio = totalCompleted > 0 ? Math.round((highEnergyCompleted / totalCompleted) * 100) : 0;

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="glass-panel" style={{ padding: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 className="text-gradient" style={{ fontSize: '2rem' }}>Dashboard</h2>
              <div className={`status-badge ${currentMode}`}>
                {currentMode === 'work' ? 'Briefcase' : currentMode === 'personal' ? 'User' : 'Sunset'}
                Mode: {currentMode.toUpperCase()}
              </div>
            </div>
            <p>Welcome back! Your system is currently optimized for <strong>{currentMode}</strong>.</p>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="glass-panel stat-card">
                <h3 className="stat-label">Today's Load</h3>
                <p className="stat-value" style={{ color: 'var(--color-primary)' }}>{activeTasksCount}</p>
                <p className="stat-sub">Pending items</p>
              </div>
              <div className="glass-panel stat-card">
                <h3 className="stat-label">Focus Ratio</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={20} color="#ff6b6b" />
                  <p className="stat-value">{focusRatio}%</p>
                </div>
                <p className="stat-sub">High Energy Tasks</p>
              </div>
              <div className="glass-panel stat-card">
                <h3 className="stat-label">System State</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={20} color="#6bffad" />
                  <p className="stat-value">{currentMode === 'work' ? 'On' : 'Off'}</p>
                </div>
                <p className="stat-sub">Work Mode</p>
              </div>
              <div className="glass-panel stat-card">
                <h3 className="stat-label">Total Focus</h3>
                <p className="stat-value" style={{ color: 'var(--color-secondary)' }}>{stats.totalMinutes}m</p>
                <p className="stat-sub">Lifetime tracked</p>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-dim)' }}>Subject Breakdown</h3>
              <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)' }}>
                {Object.keys(stats.subjectBreakdown).length === 0 ? (
                  <p style={{ color: 'var(--color-text-dim)', fontStyle: 'italic' }}>No study sessions recorded yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {Object.entries(stats.subjectBreakdown).map(([subject, duration]) => (
                      <div key={subject}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                          <span>{subject}</span>
                          <span>{Math.floor(duration / 60)}m</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${(duration / (stats.totalMinutes * 60)) * 100}%`,
                            background: 'var(--color-primary)'
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="glass-panel" style={{ padding: 'var(--space-lg)', minHeight: '80vh' }}>
            <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>Tasks</h2>
            <TaskList
              tasks={tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onSnoozeTask={snoozeTask}
              systemMode={currentMode}
            />
          </div>
        );
      case 'timer':
        return (
          <div className="glass-panel" style={{ padding: 'var(--space-lg)', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Timer />
          </div>
        );
      case 'syllabus':
        return <Syllabus />;
      case 'settings':
        return <Settings settings={settings} onUpdate={updateSettings} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <AppShell currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
      <style>{`
        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .status-badge.work { color: #6bffad; border-color: #6bffad; background: rgba(107, 255, 173, 0.1); }
        .status-badge.personal { color: #ffd93d; border-color: #ffd93d; background: rgba(255, 217, 61, 0.1); }
        .status-badge.transition { color: #ff6b6b; border-color: #ff6b6b; background: rgba(255, 107, 107, 0.1); }

        .stat-card {
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.03);
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .stat-label {
            color: var(--color-text-dim);
            font-size: 0.8rem;
            text-transform: uppercase;
        }
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--color-text);
        }
        .stat-sub {
            font-size: 0.8rem;
            color: var(--color-text-dim);
            opacity: 0.7;
        }
      `}</style>
    </AppShell>
  );
}

export default App
