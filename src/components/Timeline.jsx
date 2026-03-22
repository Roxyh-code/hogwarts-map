import { BOOKS } from '../data/characters';

// Story phases for the HP series
const PHASES = [
  { label: 'School Years',     years: [1, 2, 3], color: '#D4A017' },
  { label: 'Rising Darkness',  years: [4, 5],    color: '#B8860B' },
  { label: 'The War',          years: [6, 7],    color: '#9B0000' },
];

function getPhase(year) {
  return PHASES.find((p) => p.years.includes(year)) ?? PHASES[0];
}

export default function Timeline({ currentTime, onChange }) {
  const book    = BOOKS[currentTime - 1];
  const phase   = getPhase(currentTime);
  const progress = ((currentTime - 1) / (BOOKS.length - 1)) * 100;

  return (
    <div className="timeline-container" onClick={(e) => e.stopPropagation()}>

      {/* ── Header row ────────────────────────────────────── */}
      <div className="timeline-header">
        <div className="timeline-identity">
          <span className="timeline-year-badge" style={{ borderColor: phase.color, color: phase.color }}>
            Year {currentTime}
          </span>
          <span className="timeline-book-title">— {book.title}</span>
        </div>
        <span className="timeline-phase-pill" style={{ background: phase.color + '22', color: phase.color, borderColor: phase.color + '55' }}>
          {phase.label}
        </span>
        <span className="timeline-instruction">
          Drag to travel through time
        </span>
      </div>

      {/* ── Phase band above track ─────────────────────────── */}
      <div className="timeline-phases">
        {PHASES.map((p) => {
          const startPct = ((Math.min(...p.years) - 1) / 6) * 100;
          const endPct   = ((Math.max(...p.years) - 1) / 6) * 100;
          const active   = p.years.includes(currentTime);
          return (
            <div
              key={p.label}
              className={`timeline-phase-band ${active ? 'active' : ''}`}
              style={{
                left:   startPct + '%',
                width:  (endPct - startPct) + '%',
                background: p.color + (active ? '30' : '14'),
                borderColor: p.color + (active ? 'aa' : '33'),
              }}
              title={p.label}
            >
              <span className="phase-band-label" style={{ color: p.color + (active ? 'ff' : '77') }}>
                {p.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Track + slider ────────────────────────────────── */}
      <div className="timeline-track-area">
        <div className="timeline-fill" style={{ width: progress + '%', background: `linear-gradient(90deg, #D4A017, ${phase.color})` }} />

        <input
          type="range"
          min="1" max="7" step="1"
          value={currentTime}
          onChange={(e) => onChange(Number(e.target.value))}
          className="timeline-slider"
          aria-label={`Timeline: Year ${currentTime}, ${book.title}`}
        />

        {/* Year marker dots */}
        <div className="timeline-marks">
          {BOOKS.map((b) => {
            const ph = getPhase(b.year);
            return (
              <button
                key={b.year}
                className={`timeline-mark ${b.year === currentTime ? 'active' : ''}`}
                style={b.year === currentTime ? { '--mark-color': ph.color } : {}}
                onClick={() => onChange(b.year)}
                title={b.title}
              >
                <div className="mark-dot" style={b.year === currentTime ? { background: ph.color, boxShadow: `0 0 8px ${ph.color}` } : {}} />
                <div className="mark-label">{b.short}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
