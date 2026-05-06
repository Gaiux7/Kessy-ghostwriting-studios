import { useState } from 'react';

const inp = {
  background: '#0d0d0d', border: '1px solid #1F2937', color: '#fff',
  padding: '0.75rem 1rem', borderRadius: 2, fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.85rem', width: '100%', outline: 'none'
};

export default function StepPlot({ genre, plot, onChange, onBack, onGenerate, loading }) {
  const [focused, setFocused] = useState(null);
  const [selectedSetting, setSelectedSetting] = useState('');

  const set = (field, val) => onChange({ ...plot, [field]: val });

  return (
    <div>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em', color: genre.color, marginBottom: '0.5rem' }}>STEP 03</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>Shape the Story</h2>
      <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B7280', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Pick your trope, conflict and setting — or leave blank and let AI decide.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>

        {/* TROPE */}
        <div>
          <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: '#9CA3AF', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
            TROPE <span style={{ color: '#4B5563' }}>(optional)</span>
          </label>
          <select
            style={{ ...inp, borderColor: focused === 'trope' ? genre.color : '#1F2937' }}
            value={plot.trope || ''}
            onFocus={() => setFocused('trope')}
            onBlur={() => setFocused(null)}
            onChange={e => set('trope', e.target.value)}
          >
            <option value="">AI will choose the best trope...</option>
            {genre.tropes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* CONFLICT */}
        <div>
          <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: '#9CA3AF', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
            CORE CONFLICT <span style={{ color: '#4B5563' }}>(optional)</span>
          </label>
          <select
            style={{ ...inp, borderColor: focused === 'conflict' ? genre.color : '#1F2937' }}
            value={plot.conflictSelect || ''}
            onFocus={() => setFocused('conflict')}
            onBlur={() => setFocused(null)}
            onChange={e => { set('conflictSelect', e.target.value); set('conflictCustom', ''); }}
          >
            <option value="">AI will craft the conflict...</option>
            {genre.conflicts.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            style={{ ...inp, marginTop: '0.5rem', borderColor: focused === 'conflictCustom' ? genre.color : '#1F2937' }}
            value={plot.conflictCustom || ''}
            placeholder="...or type your own conflict"
            onFocus={() => setFocused('conflictCustom')}
            onBlur={() => setFocused(null)}
            onChange={e => { set('conflictCustom', e.target.value); set('conflictSelect', ''); }}
          />
        </div>

        {/* SETTING */}
        <div>
          <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: '#9CA3AF', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
            SETTING <span style={{ color: '#4B5563' }}>(optional)</span>
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {genre.settings.map(s => (
              <span key={s}
                onClick={() => { setSelectedSetting(s); set('setting', s); }}
                style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', cursor: 'pointer',
                  padding: '0.4rem 0.9rem', borderRadius: 2, transition: 'all 0.2s',
                  border: `1px solid ${selectedSetting === s ? genre.color : '#1F2937'}`,
                  background: selectedSetting === s ? genre.color + '22' : 'transparent',
                  color: selectedSetting === s ? '#fff' : '#6B7280',
                }}
              >{s}</span>
            ))}
          </div>
          <input
            style={{ ...inp, borderColor: focused === 'setting' ? genre.color : '#1F2937' }}
            value={plot.setting || ''}
            placeholder="Or type a custom setting..."
            onFocus={() => setFocused('setting')}
            onBlur={() => setFocused(null)}
            onChange={e => { set('setting', e.target.value); setSelectedSetting(''); }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#6B7280', border: '1px solid #374151', padding: '0.7rem 1.5rem', borderRadius: 2, fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer' }}>← Back</button>
        <button onClick={onGenerate} disabled={loading} style={{ background: genre.color, color: '#fff', border: 'none', padding: '0.85rem 2.5rem', borderRadius: 2, fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Generating Outline...' : 'Generate Outline →'}
        </button>
      </div>
    </div>
  );
}
