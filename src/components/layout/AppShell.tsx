import React from 'react';
import { Sidebar } from './Sidebar';

interface AppShellProps {
    children: React.ReactNode;
    currentView: string;
    onViewChange: (view: string) => void;
}

export function AppShell({ children, currentView, onViewChange }: AppShellProps) {
    return (
        <div className="app-shell">
            <Sidebar currentView={currentView} onViewChange={onViewChange} />
            <main className="main-content">
                {children}
            </main>

            <style>{`
        .app-shell {
          min-height: 100vh;
          background-color: var(--color-bg);
          /* Optional subtle mesh gradient background */
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(var(--hue-primary), 100, 50, 0.1) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(var(--hue-secondary), 100, 50, 0.1) 0%, transparent 20%);
        }

        .main-content {
          margin-left: 260px;
          padding: var(--space-lg);
          min-height: 100vh;
          width: calc(100% - 260px);
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding-bottom: 80px; /* Space for bottom nav if we implement it */
            width: 100%;
          }
          /* TODO: Mobile Navigation */
        }
      `}</style>
        </div>
    );
}
