import { FACTIONS, CHARACTERS } from '../data/characters';

const FACTION_COUNTS = Object.fromEntries(
  Object.keys(FACTIONS).map((fid) => [
    fid,
    CHARACTERS.filter((c) => c.faction === fid).length,
  ])
);

export default function FilterPanel({
  activeFilters,
  onToggle,
  focusedFaction,
  onFocus,
}) {
  return (
    <div className="filter-section">

      {/* Header row with optional Reset */}
      <div className="filter-header-row">
        <span className="section-title" style={{ marginBottom: 0 }}>Factions</span>
        {focusedFaction && (
          <button
            className="reset-view-btn"
            onClick={() => onFocus(null)}
            title="Return to full graph view"
          >
            ↩ Reset View
          </button>
        )}
      </div>

      {/* Focus hint — only shown when nothing focused */}
      {!focusedFaction && (
        <div className="filter-hint">Click a faction to navigate there</div>
      )}

      {/* Faction rows */}
      {Object.values(FACTIONS).map((f) => {
        const active  = activeFilters.has(f.id);
        const focused = focusedFaction === f.id;
        return (
          <div
            key={f.id}
            className={`faction-row ${focused ? 'focused' : ''} ${active ? '' : 'hidden'}`}
            style={{ '--faction-color': f.color, '--faction-glow': f.glowColor }}
          >
            {/* Main area: click = camera focus */}
            <div
              className="faction-focus-area"
              onClick={() => onFocus(f.id)}
              title={focused ? 'Click again to reset view' : `Zoom to ${f.name}`}
            >
              <div
                className="faction-dot"
                style={{ backgroundColor: f.color, boxShadow: focused ? `0 0 8px ${f.color}` : 'none' }}
              />
              <div className="faction-text">
                <span className="faction-name">{f.name}</span>
                {focused && <span className="faction-focused-badge">focused</span>}
              </div>
              <span className="faction-count">{FACTION_COUNTS[f.id]}</span>
            </div>

            {/* Eye toggle: click = show/hide nodes */}
            <button
              className={`faction-vis-btn ${active ? 'active' : 'inactive'}`}
              onClick={(e) => { e.stopPropagation(); onToggle(f.id); }}
              title={active ? 'Hide this faction' : 'Show this faction'}
              aria-label={active ? 'Hide' : 'Show'}
            >
              {active ? '◉' : '○'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
