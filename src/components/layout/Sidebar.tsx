
import { LayoutDashboard, CheckSquare, Timer, Settings, BookOpen } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'timer', label: 'Timer', icon: Timer },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings }, // Optional
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="logo-container">
        <h1 className="text-gradient">TimeFlow</h1>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <style>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
          z-index: 100;
        }

        .logo-container {
          margin-bottom: var(--space-xl);
          padding-left: var(--space-xs);
        }
        
        .logo-container h1 {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm);
          color: var(--color-text-dim);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.03);
          color: var(--color-text);
        }

        .nav-item.active {
          background: var(--color-primary-glow);
          color: white; /* Contrast against glow */
          /* box-shadow: 0 0 10px var(--color-primary-glow); Optional glow */
        }
      `}</style>
    </aside>
  );
}
