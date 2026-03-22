const EDGE_TYPES = [
  { color: '#D4AF37', label: 'Family bond',    dash: false, w: 3 },
  { color: '#E879A0', label: 'Romance',         dash: false, w: 3 },
  { color: '#4CAF50', label: 'Friendship',      dash: false, w: 2 },
  { color: '#2196F3', label: 'Alliance',        dash: false, w: 2 },
  { color: '#C0392B', label: 'Rivalry / Enemy', dash: true,  w: 2 },
];

export default function Legend() {
  return (
    <div className="legend-section">
      <div className="section-title">Relationships</div>
      {EDGE_TYPES.map(({ color, label, dash, w }) => (
        <div key={label} className="legend-item">
          <svg width="28" height="10" style={{ flexShrink: 0 }}>
            <line
              x1="0" y1="5" x2="28" y2="5"
              stroke={color}
              strokeWidth={w}
              strokeDasharray={dash ? '5,3' : undefined}
              strokeOpacity={0.9}
            />
          </svg>
          <span className="legend-label">{label}</span>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <div className="section-title">Nodes</div>
        <div className="legend-item">
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#555', border: '2px solid #aaa', flexShrink: 0 }} />
          <span className="legend-label">Character (size = importance)</span>
        </div>
        <div className="legend-item">
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'transparent', border: '2px solid #888', boxShadow: '0 0 6px #888', flexShrink: 0 }} />
          <span className="legend-label">Magical aura = faction</span>
        </div>
      </div>
    </div>
  );
}
