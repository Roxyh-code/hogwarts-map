import { useState, useEffect, useRef } from 'react';
import { FACTIONS, CHARACTERS_MAP, EDGE_TIMELINE, BOOKS, CHARACTER_ACTIVITY } from '../data/characters';

const REL_GROUPS = [
  { key: 'friends',  label: 'Friends', cls: 'type-friends' },
  { key: 'family',   label: 'Family',  cls: 'type-family'  },
  { key: 'romance',  label: 'Romance', cls: 'type-romance' },
  { key: 'allies',   label: 'Allies',  cls: 'type-allies'  },
  { key: 'enemies',  label: 'Enemies', cls: 'type-enemies' },
];

function getInitials(name) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('');
}

/** Is a specific relationship active at the given time? */
function isRelActive(charId, relId, time) {
  const key    = [charId, relId].sort().join('||');
  const timing = EDGE_TIMELINE[key];
  if (!timing) return true; // not in EDGE_TIMELINE → always active
  return time >= timing.start && time <= timing.end;
}

export default function CharacterCard({ character, onClose, onSelect, zIndex, globalTime }) {
  const faction = FACTIONS[character.faction] ?? FACTIONS.neutral;

  // ── Card-level timeline: syncs with global unless user overrides ──
  const [cardTime,        setCardTime]        = useState(globalTime ?? 1);
  const [locallyOverridden, setLocallyOverridden] = useState(false);
  const prevGlobalRef = useRef(globalTime ?? 1);

  useEffect(() => {
    if (!locallyOverridden) {
      setCardTime(globalTime ?? 1);
    } else if (prevGlobalRef.current !== globalTime) {
      // User has overridden but global just changed — re-sync
      setLocallyOverridden(false);
      setCardTime(globalTime ?? 1);
    }
    prevGlobalRef.current = globalTime ?? 1;
  }, [globalTime]); // eslint-disable-line

  const handleCardTimeChange = (val) => {
    setCardTime(val);
    setLocallyOverridden(val !== globalTime);
  };

  const resetToGlobal = () => {
    setCardTime(globalTime ?? 1);
    setLocallyOverridden(false);
  };

  // Activity status for this character at cardTime
  const activity     = CHARACTER_ACTIVITY[character.id];
  const isActive     = cardTime >= (activity?.activeFrom ?? 1) && cardTime <= (activity?.activeTo ?? 7);
  const currentBook  = BOOKS[cardTime - 1];

  const cardStyle = {
    '--card-border':     faction.accentColor,
    '--card-glow':       faction.glowColor,
    '--card-header-bg':  faction.bgGlow,
    '--card-avatar-bg':  faction.color + '44',
    zIndex,
    opacity: isActive ? 1 : 0.7,
  };

  return (
    <div className="character-card" style={cardStyle}>
      {/* Close */}
      <button
        className="card-close"
        onClick={(e) => { e.stopPropagation(); onClose(character.id); }}
        title="Close card"
      >✕</button>

      {/* Header */}
      <div className="card-header">
        <div className="card-header-info">
          <div className="card-avatar" style={{ color: faction.accentColor }}>
            {getInitials(character.name)}
          </div>
          <div>
            <div className="card-title">{character.name}</div>
            <div className="card-role">{character.role}</div>
            <div className="card-faction-badge"
              style={{ borderColor: faction.accentColor, color: faction.accentColor }}>
              <span>{faction.symbol}</span>
              <span>{faction.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        {/* Traits */}
        <div className="card-traits">
          {character.traits.map((t) => (
            <span key={t} className="trait-pill">{t}</span>
          ))}
        </div>

        {/* Description */}
        <div className="card-desc">{character.description}</div>

        {/* ── CARD-LEVEL TIMELINE ──────────────────────── */}
        <div className="card-timeline">
          <div className="card-timeline-header">
            <span className="card-timeline-title">Timeline</span>
            <span className="card-timeline-year">
              Year {cardTime} — {currentBook?.short}
              {!isActive && <span className="card-timeline-inactive-badge"> · Not yet introduced</span>}
            </span>
            {locallyOverridden && (
              <button className="card-timeline-sync-btn" onClick={resetToGlobal} title="Re-sync to global year">
                ↩ sync
              </button>
            )}
          </div>

          {/* Compact slider */}
          <div className="card-timeline-track">
            <div
              className="card-timeline-fill"
              style={{ width: ((cardTime - 1) / 6 * 100) + '%' }}
            />
            <input
              type="range" min="1" max="7" step="1"
              value={cardTime}
              onChange={(e) => handleCardTimeChange(Number(e.target.value))}
              className="card-timeline-slider"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Year dots */}
          <div className="card-timeline-dots">
            {BOOKS.map((b) => (
              <button
                key={b.year}
                className={`card-dot ${b.year === cardTime ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); handleCardTimeChange(b.year); }}
                title={b.title}
              />
            ))}
          </div>
        </div>

        {/* Relationships (filtered by cardTime) */}
        <div className="card-relations-title">
          Connections {locallyOverridden ? `(Year ${cardTime})` : ''}
        </div>
        <div className="relations-grid">
          {REL_GROUPS.map(({ key, label, cls }) => {
            const ids   = character[key] ?? [];
            const known = ids.filter(
              (id) => CHARACTERS_MAP[id] && isRelActive(character.id, id, cardTime)
            );
            if (!known.length) return null;
            return (
              <div key={key} className="relation-group">
                <span className="relation-type-label">{label}</span>
                <div className="relation-chips">
                  {known.map((id) => {
                    const rel = CHARACTERS_MAP[id];
                    return (
                      <button
                        key={id}
                        className={`relation-chip ${cls}`}
                        onClick={(e) => { e.stopPropagation(); onSelect(id); }}
                        title={`Open ${rel.name}`}
                      >
                        {rel.name.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {/* No connections message */}
          {REL_GROUPS.every(({ key }) => {
            const ids = character[key] ?? [];
            return !ids.some((id) => CHARACTERS_MAP[id] && isRelActive(character.id, id, cardTime));
          }) && (
            <div className="card-no-connections">
              No recorded connections at this point in time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
