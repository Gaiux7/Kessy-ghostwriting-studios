export default function StepOutline({ genre, characters, plot, outline, onBack, onWriteChapter }) {
  return (
    <div>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em', color: genre.color, marginBottom: '0.5rem' }}>STEP 04</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>Your Story Outline</h2>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B7280', fontSize: '0.85rem' }}>
          {characters.maleName} × {characters.femaleName} · {genre.name} · {plot.setting || 'AI-chosen setting'}
        </p>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: genre.color, marginTop: '0.25rem' }}>
          {plot.trope || 'AI-chosen trope'} — {plot.conflictCustom || plot.conflictSelect || 'AI-crafted conflict'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {outline.map(ch => (
          <div key={ch.chapter} style={{
            border: '1px solid #1F2937', borderRadius: 4, padding: '1rem 1.25rem',
            background: '#080808', display: 'flex', alignItems: 'flex-start', gap: '1rem'
          }}>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', fontWeight: 600, minWidth: 50, paddingTop: 2, color: genre.color }}>
              CH {ch.chapter}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontStyle: 'italic', color: '#E5E7EB', marginBottom: '0.25rem' }}>{ch.title}</p>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.6 }}>{ch.summary}</p>
            </div>
            <button
              onClick={() => onWriteChapter(ch.chapter)}
              style={{
                background: genre.color, color: '#fff', border: 'none',
                padding: '0.4rem 0.8rem', borderRadius: 2,
                fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.1em', fontWeight: 600, cursor: 'pointer', flexShrink: 0
              }}
            >Write →</button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#6B7280', border: '1px solid #374151', padding: '0.7rem 1.5rem', borderRadius: 2, fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer' }}>← Edit Plot</button>
        <button onClick={() => onWriteChapter(1)} style={{ background: genre.color, color: '#fff', border: 'none', padding: '0.85rem 2.5rem', borderRadius: 2, fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 600, cursor: 'pointer' }}>Write Chapter 1 →</button>
      </div>
    </div>
  );
}
