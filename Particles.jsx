import { useEffect, useRef } from 'react';

export default function Particles({ color = '#C084FC' }) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        position: fixed; border-radius: 50%; pointer-events: none;
        width:${size}px; height:${size}px; background:${color};
        opacity:${Math.random() * 0.25 + 0.05};
        left:${Math.random() * 100}%; top:${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 8}s ease-in-out infinite ${Math.random() * 5}s;
        z-index: 0;
      `;
      container.appendChild(p);
    }
  }, [color]);

  return <div ref={ref} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
}
