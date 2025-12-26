
import { useState } from 'react';

// Simplified Syllabus Structure
const SYLLABUS_DATA = {
    'GS1': [
        'Indian Heritage and Culture',
        'History of the World',
        'Society',
        'Geography of the World'
    ],
    'GS2': [
        'Indian Constitution',
        'Governance',
        'Social Justice',
        'International Relations'
    ],
    'GS3': [
        'Economic Development',
        'Technology',
        'Environment',
        'Biodiversity',
        'Security & Disaster Management'
    ],
    'GS4': [
        'Ethics and Human Interface',
        'Attitude',
        'Aptitude',
        'Emotional Intelligence',
        'Public Service Values'
    ]
};

export function Syllabus() {
    const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
        const saved = localStorage.getItem('syllabus_progress');
        return saved ? JSON.parse(saved) : {};
    });

    const toggleTopic = (paper: string, topic: string) => {
        const key = `${paper}-${topic}`;
        const newStatus = { ...completedTopics, [key]: !completedTopics[key] };
        setCompletedTopics(newStatus);
        localStorage.setItem('syllabus_progress', JSON.stringify(newStatus));
    };

    const calculateProgress = (paper: string) => {
        const topics = SYLLABUS_DATA[paper as keyof typeof SYLLABUS_DATA];
        const completedCount = topics.filter(t => completedTopics[`${paper}-${t}`]).length;
        return Math.round((completedCount / topics.length) * 100);
    };

    return (
        <div className="glass-panel" style={{ padding: 'var(--space-lg)', minHeight: '80vh' }}>
            <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>Syllabus Tracker</h2>

            <div className="syllabus-grid">
                {Object.entries(SYLLABUS_DATA).map(([paper, topics]) => (
                    <div key={paper} className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ color: 'var(--color-primary)' }}>{paper}</h3>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>{calculateProgress(paper)}% Done</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {topics.map(topic => (
                                <label key={topic} className="topic-item">
                                    <input
                                        type="checkbox"
                                        checked={!!completedTopics[`${paper}-${topic}`]}
                                        onChange={() => toggleTopic(paper, topic)}
                                        style={{ marginRight: '10px' }}
                                    />
                                    <span style={{
                                        color: completedTopics[`${paper}-${topic}`] ? 'var(--color-text-dim)' : 'var(--color-text)',
                                        textDecoration: completedTopics[`${paper}-${topic}`] ? 'line-through' : 'none',
                                        transition: 'all 0.3s'
                                    }}>
                                        {topic}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .syllabus-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                
                .topic-item {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    padding: 4px 0;
                }
                
                .topic-item:hover span {
                    color: var(--color-secondary);
                }
            `}</style>
        </div>
    );
}
