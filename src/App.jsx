import { useState, useCallback, useMemo, useRef } from 'react';
import ForceGraph  from './components/ForceGraph';
import CardStack   from './components/CardStack';
import FilterPanel from './components/FilterPanel';
import Legend      from './components/Legend';
import Timeline    from './components/Timeline';
import { CHARACTERS, FACTIONS, deriveEdges } from './data/characters';

const ALL_FACTIONS = new Set(Object.keys(FACTIONS));
const ALL_EDGES    = deriveEdges(CHARACTERS);

// ── Ambient magic particles ───────────────────────────────────
function MagicParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id:    i,
        left:  Math.random() * 100,
        top:   40 + Math.random() * 50,
        dur:   5 + Math.random() * 9,
        delay: Math.random() * 7,
        size:  1 + Math.random() * 1.5,
      })),
    []
  );
  return (
    <div className="magic-particles" aria-hidden>
      {particles.map((p) => (
        <span key={p.id} style={{
          left: p.left + '%', top: p.top + '%',
          '--dur': p.dur + 's', '--delay': p.delay + 's',
          width: p.size + 'px', height: p.size + 'px',
        }} />
      ))}
    </div>
  );
}

// ── Graph canvas (isolated SVG ref) ───────────────────────────
function GraphCanvas({
  activeFilters, searchQuery, focusedFaction, currentTime,
  onSelectCharacter, cardIds, hoveredId, onHoverCharacter,
}) {
  const svgRef = useRef(null);
  return (
    <>
      <svg ref={svgRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      <ForceGraph
        svgRef={svgRef}
        characters={CHARACTERS}
        edges={ALL_EDGES}
        activeFilters={activeFilters}
        searchQuery={searchQuery}
        focusedFaction={focusedFaction}
        currentTime={currentTime}
        onSelectCharacter={onSelectCharacter}
        selectedIds={cardIds}
        hoveredId={hoveredId}
        onHoverCharacter={onHoverCharacter}
      />
    </>
  );
}

// ── Root App ──────────────────────────────────────────────────
export default function App() {
  const [activeFilters,  setActiveFilters]  = useState(ALL_FACTIONS);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [cardIds,        setCardIds]        = useState([]);
  const [hoveredId,      setHoveredId]      = useState(null);
  const [focusedFaction, setFocusedFaction] = useState(null);
  const [currentTime,    setCurrentTime]    = useState(1); // Book year 1–7

  const handleToggleFaction = useCallback((fid) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(fid)) {
        if (next.size === 1) return prev;
        next.delete(fid);
      } else {
        next.add(fid);
      }
      return next;
    });
  }, []);

  const handleFocusFaction = useCallback(
    (fid) => setFocusedFaction((prev) => (prev === fid ? null : fid)),
    []
  );

  const handleSelectCharacter = useCallback((id) => {
    if (id === null) { setCardIds([]); return; }
    setCardIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      return next.length > 5 ? next.slice(next.length - 5) : next;
    });
  }, []);

  const handleCloseCard = useCallback(
    (id) => setCardIds((p) => p.filter((c) => c !== id)),
    []
  );

  const handleBgClick = useCallback(() => setCardIds([]), []);

  return (
    <div className="app" onClick={handleBgClick}>

      {/* ── SIDEBAR ─────────────────────────────── */}
      <aside className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <div className="sidebar-logo">✦ The Wizarding Web ✦</div>
          <div className="sidebar-subtitle">Harry Potter — Character Atlas</div>
        </div>

        <div className="search-wrap">
          <input
            className="search-input" type="text"
            placeholder="Search characters…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <FilterPanel
          activeFilters={activeFilters}
          onToggle={handleToggleFaction}
          focusedFaction={focusedFaction}
          onFocus={handleFocusFaction}
        />
        <Legend />
      </aside>

      {/* ── GRAPH AREA ──────────────────────────── */}
      <main className="graph-area" onClick={handleBgClick}>
        <MagicParticles />

        <GraphCanvas
          activeFilters={activeFilters}
          searchQuery={searchQuery}
          focusedFaction={focusedFaction}
          currentTime={currentTime}
          onSelectCharacter={handleSelectCharacter}
          cardIds={cardIds}
          hoveredId={hoveredId}
          onHoverCharacter={setHoveredId}
        />

        {/* Card stack — positioned above the timeline bar */}
        <CardStack
          cardIds={cardIds}
          onClose={handleCloseCard}
          onSelect={handleSelectCharacter}
          currentTime={currentTime}
        />

        {/* ── GLOBAL TIMELINE (bottom of graph area) ── */}
        <Timeline currentTime={currentTime} onChange={setCurrentTime} />
      </main>

      <div id="graph-tooltip" className="graph-tooltip" style={{ display: 'none' }} />
    </div>
  );
}
