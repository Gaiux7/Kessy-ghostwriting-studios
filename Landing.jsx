export default function Landing({ onStart }) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '2rem', position: 'relative'
    }}>
      <p style={{
        fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem',
        letterSpacing: '0.3em', color: '#C084FC', marginBottom: '1.5rem'
      }}>
        ✦ DIGITAL KESSY PRESENTS ✦
      </p>

      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(2.5rem, 7vw, 5rem)',
        fontWeight: 300, lineHeight: 1.1
      }}>
        Ghostwriting
        <span style={{
          color: '#C084FC', fontStyle: 'italic',
          fontWeight: 600, display: 'block'
        }}>
          Studio
        </span>
      </h1>

      <div style={{
        width: 60, height: 1,
        background: 'linear-gradient(90deg, transparent, #C084FC, transparent)',
        margin: '1.5rem auto'
      }} />

      <p style={{
        fontFamily: 'Montserrat, sans-serif', color: '#9CA3AF',
        fontSize: '1rem', fontWeight: 300, letterSpacing: '0.05em',
        lineHeight: 1.8, marginBottom: '3rem'
      }}>
        Your AI-powered dark romance writing companion.<br />
        From idea to chapter — step by step.
      </p>

      <button
        onClick={onStart}
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #C084FC)',
          color: '#fff', border: 'none', padding: '1rem 3rem',
          borderRadius: 2, fontSize: '0.85rem', letterSpacing: '0.2em',
          fontFamily: 'Montserrat, sans-serif', fontWeight: 600,
          cursor: 'pointer', transition: 'all 0.2s'
        }}
        onMouseEnter={e => { e.target.style.opacity = '0.85'; e.target.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}
      >
        BEGIN YOUR STORY
      </button>

      <p style={{
        fontFamily: 'Montserrat, sans-serif', color: '#4B5563',
        fontSize: '0.75rem', marginTop: '1rem', letterSpacing: '0.1em'
      }}>
        Werewolf · Billionaire · Mafia
      </p>
    </div>
  );
}
