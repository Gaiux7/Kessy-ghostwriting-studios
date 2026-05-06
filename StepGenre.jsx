import { useState } from 'react';
import { GENRES } from '../data/genres';

export default function StepGenre({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--accent)', marginBottom: '0.5rem' }}>STEP 01</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>Choose Your Genre</h2>
      <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B7280', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Every dark romance starts with a world. Which one calls to you?</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {GENRES.map(g => (
          <div
            key={g.id}
            onClick={() => onSelect(g.id)}
            onMouseEnter={() => setHovered(g.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              border: `1px solid ${hovered === g.id ? g.color : '#1F2937'}`,
              borderRadius: 4, padding: '2rem 1.5rem', textAlign: 'center',
              background: '#080808', cursor: 'pointer',
              transform: hovered === g.id ? 'translateY(-4px) scale(1.02)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{g.emoji}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontStyle: 'italic', color: g.color, marginBottom: '0.5rem' }}>{g.name}</div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B7280', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{g.tagline}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginTop: '1.5rem' }}>
              {g.tropes.slice(0, 3).map(t => (
                <span key={t} style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: '0.6rem',
                  padding: '0.2rem 0.5rem', borderRadius: 2, letterSpacing: '0.05em',
                  color: g.accent, border: `1px solid ${g.color}44`
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
