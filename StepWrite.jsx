export default function StepWrite({ genre, chapter, loading, error, onBack, onDownload, onReset }) {
  return (
    <div>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em', color: genre.color, marginBottom: '0.5rem' }}>STEP 05</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 300, marginBottom: '2rem' }}>Your Chapter</h2>

      {loading && (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontStyle: 'italic', color: genre.color, marginBottom: '1.5rem' }}>
            Writing your story...
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%', background: genre.color,
                animation: `pulse 1.2s ease-in-out infinite ${i * 0.2}s`
              }} />
            ))}
          </div>
        </div>
      )}

      {error && (
        <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#EF4444', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>
      )}

      {!loading && chapter && (
        <>
          <div style={{
            borderRadius: 4, padding: '2.5rem', background: '#080808',
            border: `1px solid ${genre.color}33`, marginBottom: '2rem'
          }}>
            <p style={{
              lineHeight: 1.9, fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.05rem', color: '#E5E7EB', whiteSpace: 'pre-wrap'
            }}>{chapter}</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button onClick={onBack} style={{ background: 'transparent', color: '#6B7280', border: '1px solid #374151', padding: '0.7rem 1.5rem', borderRadius: 2, fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer' }}>← Back to Outline</button>
            <button onClick={onDownload} style={{ background: genre.color, color: '#fff', border: 'none', padding: '0.85rem 2.5rem', borderRadius: 2, fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 600, cursor: 'pointer' }}>Download Chapter</button>
            <button onClick={onReset} style={{ background: 'transparent', border: `1px solid ${genre.color}`, color: genre.color, padding: '0.85rem 2.5rem', borderRadius: 2, fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 600, cursor: 'pointer' }}>Start New Story</button>
          </div>
        </>
      )}
    </div>
  );
}
