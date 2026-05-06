import { useState, useEffect } from 'react';
import { GENRES } from './data/genres';
import { callGroq } from './utils/api';
import Particles from './components/Particles';
import StepsBar from './components/StepsBar';
import Landing from './components/Landing';
import StepGenre from './components/StepGenre';
import StepCharacters from './components/StepCharacters';
import StepPlot from './components/StepPlot';
import StepOutline from './components/StepOutline';
import StepWrite from './components/StepWrite';

const INITIAL_STATE = {
  step: 0,
  genreId: null,
  characters: {},
  plot: {},
  outline: null,
  chapter: '',
};

export default function App() {
  const [state, setState] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const genre = GENRES.find(g => g.id === state.genreId);

  const accent = genre?.color || '#8B5CF6';

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);

  const goStep = (n) => {
    setState(s => ({ ...s, step: n }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGenre = (id) => {
    setState(s => ({ ...s, genreId: id, characters: {}, plot: {}, outline: null, chapter: '' }));
    goStep(2);
  };

  const handleGenerateOutline = async () => {
    setLoading(true);
    setError('');
    const g = genre;
    const { maleName, femaleName, maleRole, femaleRole } = state.characters;
    const { trope, conflictSelect, conflictCustom, setting } = state.plot;
    const conflict = conflictCustom || conflictSelect;

    const prompt = `Generate a 10-chapter dark romance outline for a ${g.name} story.

Hero: ${maleName} (${g.leads.male})${maleRole ? ` — personality: ${maleRole}` : ' — invent a compelling dark personality for him'}
Heroine: ${femaleName} (${g.leads.female})${femaleRole ? ` — personality: ${femaleRole}` : ' — invent a compelling personality for her'}
Setting: ${setting || `choose the most dramatic setting for a ${g.name} dark romance`}
Trope: ${trope || `choose the most compelling trope for this ${g.name} story`}
Core conflict: ${conflict || `invent a high-stakes emotionally charged conflict for this ${g.name} story`}

For any field marked "choose" or "invent", make a bold creative decision that best fits the genre.

Return ONLY a JSON array of 10 objects like:
[{"chapter":1,"title":"Chapter title","summary":"2-sentence chapter summary"}]
No markdown, no explanation. Pure JSON only.`;

    const system = `You are a dark romance story expert specializing in ${g.name} romance. You write fast-paced, emotionally intense outlines with strong hooks. When story details are not provided, invent compelling ones that fit the genre perfectly. Return ONLY valid JSON arrays, nothing else.`;

    try {
      const result = await callGroq(prompt, system);
      const clean = result.replace(/```json|```/g, '').trim();
      const outline = JSON.parse(clean);
      setState(s => ({ ...s, outline }));
      goStep(4);
    } catch (e) {
      setError('Could not generate outline. Please try again.');
      console.error(e);
    }
    setLoading(false);
  };

  const handleWriteChapter = async (num) => {
    goStep(5);
    setLoading(true);
    setError('');
    setState(s => ({ ...s, chapter: '' }));

    const g = genre;
    const ch = state.outline[num - 1];
    const opener = g.openers[Math.floor(Math.random() * g.openers.length)];
    const maleRole = state.characters.maleRole || 'dark, obsessive, commanding';
    const femaleRole = state.characters.femaleRole || 'fierce, guarded, resilient';
    const conflict = state.plot.conflictCustom || state.plot.conflictSelect || 'a dangerous forbidden attraction';
    const setting = state.plot.setting || 'a dramatically appropriate location';

    const prompt = `Write Chapter ${num} of this dark romance story.

Title: ${ch.title}
Summary: ${ch.summary}
Hero: ${state.characters.maleName} — personality: ${maleRole}
Heroine: ${state.characters.femaleName} — personality: ${femaleRole}
Setting: ${setting}
Core conflict: ${conflict}
Suggested opener style: "${opener}"

Write 800-1000 words. Fast-paced, short paragraphs, 70% dialogue. End with a hook that makes the reader desperate for the next chapter. Show don't tell. Make it INTENSE.`;

    const system = `You are a dark romance author specializing in ${g.name} fiction. Your style: cinematic, emotionally raw, fast-paced with short punchy paragraphs. Heavy dialogue. Forbidden tension. Every scene pushes the story forward.`;

    try {
      const result = await callGroq(prompt, system);
      setState(s => ({ ...s, chapter: result }));
    } catch (e) {
      setError('Could not generate chapter. Please try again.');
    }
    setLoading(false);
  };

  const handleDownload = () => {
    const blob = new Blob([state.chapter], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${state.characters.maleName}-${state.characters.femaleName}-chapter.txt`;
    a.click();
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
    goStep(1);
  };

  // Landing
  if (state.step === 0) {
    return (
      <>
        <Particles color="#C084FC" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Landing onStart={() => goStep(1)} />
        </div>
      </>
    );
  }

  return (
    <>
      <Particles color={accent} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* NAV */}
        <div style={{
          borderBottom: '1px solid #111', padding: '1rem 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, background: '#050005', zIndex: 100
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem',
            fontStyle: 'italic', color: accent, transition: 'color 0.3s'
          }}>
            Digital Kessy
          </div>
          <StepsBar current={state.step} accent={accent} />
        </div>

        {/* MAIN CONTENT */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.5rem' }} className="animate-in">

          {state.step === 1 && (
            <StepGenre onSelect={handleSelectGenre} />
          )}

          {state.step === 2 && genre && (
            <StepCharacters
              genre={genre}
              characters={state.characters}
              onChange={chars => setState(s => ({ ...s, characters: chars }))}
              onBack={() => goStep(1)}
              onNext={() => goStep(3)}
            />
          )}

          {state.step === 3 && genre && (
            <StepPlot
              genre={genre}
              plot={state.plot}
              onChange={plot => setState(s => ({ ...s, plot }))}
              onBack={() => goStep(2)}
              onGenerate={handleGenerateOutline}
              loading={loading}
            />
          )}

          {state.step === 4 && genre && state.outline && (
            <StepOutline
              genre={genre}
              characters={state.characters}
              plot={state.plot}
              outline={state.outline}
              onBack={() => goStep(3)}
              onWriteChapter={handleWriteChapter}
            />
          )}

          {state.step === 5 && genre && (
            <StepWrite
              genre={genre}
              chapter={state.chapter}
              loading={loading}
              error={error}
              onBack={() => goStep(4)}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          )}

        </div>
      </div>
    </>
  );
}
