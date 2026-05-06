const STEPS = ['Genre', 'Chars', 'Plot', 'Outline', 'Write'];

export default function StepsBar({ current, accent }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {STEPS.map((s, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              border: `1px solid ${done || active ? accent : '#374151'}`,
              background: done ? accent : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              color: done ? '#fff' : active ? accent : '#4B5563',
              flexShrink: 0,
              transition: 'all 0.3s'
            }}>
              {done ? '✓' : idx}
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                width: 20, height: 1,
                background: done ? accent : '#1F2937',
                transition: 'background 0.3s'
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
