import { useState, useEffect } from 'react';

const inp = {
  background: '#0d0d0d', border: '1px solid #1F2937', color: '#fff',
  padding: '0.75rem 1rem', borderRadius: 2, fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.85rem', width: '100%', outline: 'none'
};

export default function StepCharacters({ genre, characters, onChange, onBack, onNext }) {
  const [focused, setFocused] = useState(null);

  const set = (field, val) => onChange({ ...characters, [field]: val });
  const canContinue = characters.maleName?.trim() && characters.femaleName?.trim();

  return (
    <div>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em', color: genre.color, marginBottom: '0.5rem' }}>STEP 02</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>Build Your Characters</h2>
      <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B7280', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Name them. Define them. They'll carry your story.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {[
          { key: 'male', label: genre.leads.male, nameField: 'maleName', roleField: 'maleRole', names: genre.maleNames, rolePh: 'e.g. Cold, obsessive, ruthless' },
          { key: 'female', label: genre.leads.female, nameField: 'femaleName', roleField: 'femaleRole', names: genre.femaleNames, rolePh: 'e.g. Fierce, independent, broken' },
        ].map(({ key, label, nameField, roleField, names, rolePh }) => (
          <div key={key} style={{ borderRadius: 4, padding: '1.5rem', background: '#080808', border: `1px solid ${genre.color}44` }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', color: genre.color, marginBottom: '1rem' }}>{label.toUpperCase()}</p>

            <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: '#9CA3AF', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>Name *</label>
            <input
              style={{ ...inp, borderColor: focused === nameField ? genre.color : '#1F2937' }}
              value={characters[nameField] || ''}
              placeholder={names[0]}
              onFocus={() => setFocused(nameField)}
              onBlur={() => setFocused(null)}
              onChange={e => set(nameField, e.target.value)}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.75rem' }}>
              {names.map(n => (
                <span key={n}
                  onClick={() => set(nameField, n)}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', color: '#6B7280', border: '1px solid #1F2937', padding: '0.2rem 0.5rem', borderRadius: 2, cursor: 'pointer' }}
                >{n}</span>
              ))}
            </div>

            <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: '#9CA3AF', display: 'block', margin: '1rem 0 0.5rem', letterSpacing: '0.1em' }}>
              Personality <span style={{ color: '#4B5563' }}>(optional)</span>
            </label>
            <input
              style={{ ...inp, borderColor: focused === roleField ? genre.color : '#1F2937' }}
              value={characters[roleField] || ''}
              placeholder={rolePh}
              onFocus={() => setFocused(roleField)}
              onBlur={() => setFocused(null)}
              onChange={e => set(roleField, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#6B7280', border: '1px solid #374151', padding: '0.7rem 1.5rem', borderRadius: 2, fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer' }}>← Back</button>
        <button onClick={onNext} disabled={!canContinue} style={{ background: genre.color, color: '#fff', border: 'none', padding: '0.85rem 2.5rem', borderRadius: 2, fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 600, cursor: canContinue ? 'pointer' : 'not-allowed', opacity: canContinue ? 1 : 0.4 }}>Continue →</button>
      </div>
    </div>
  );
}
