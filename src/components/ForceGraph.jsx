import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { FACTIONS, CHARACTER_ACTIVITY } from '../data/characters';

// ── Physics constants ─────────────────────────────────────────
const CLUSTER_STRENGTH = 0.18;
const NODE_REPULSION   = -420;
const LINK_DISTANCE    = 90;
const COLLISION_RADIUS = 32;

// ── Math helpers ──────────────────────────────────────────────
const lerp      = (a, b, t) => a + (b - a) * t;
const clamp     = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const smoothstep = (t) => t * t * (3 - 2 * t);

/** War phase: 0 = school years (Y1-2), 1 = war (Y6-7). Smooth middle. */
function warPhase(time) {
  return smoothstep(clamp((time - 2) / 4, 0, 1));
}

function getNodeRadius(d) { return 10 + (d.importance || 3) * 1.6; }
function getInitials(name) { return name.split(' ').slice(0, 2).map((n) => n[0]).join(''); }

/** Continuous 0-1 presence factor for a character at a given time. */
function charPresence(id, time) {
  const a = CHARACTER_ACTIVITY[id];
  const from = a?.activeFrom ?? 1;
  const to   = a?.activeTo   ?? 7;
  return time >= from && time <= to ? 1 : 0;
}

/**
 * Continuous 0.5–1.0 strength factor for an edge.
 * - Inactive period: 0
 * - First/last active year: 0.6 (ramping in/out)
 * - Mid-range: 1.0
 */
function edgeStrengthFactor(edge, time) {
  const s = edge.start ?? 1;
  const e = edge.end   ?? 7;
  if (time < s || time > e) return 0;
  const span = e - s;
  if (span === 0) return 1.0;
  // Ramp up over first year of activity, ramp down over last
  const rampUp   = clamp(time - s, 0, 1);
  const rampDown = clamp(e - time, 0, 1);
  return 0.55 + 0.45 * Math.min(rampUp, rampDown);
}

/**
 * A character's narrative emphasis at a given time.
 * Returns 0.75–1.30 scale. Characters near their emphasisPeak are larger/brighter.
 */
function charEmphasis(char, time) {
  const peak = CHARACTER_ACTIVITY[char.id]?.emphasisPeak;
  if (!peak) return 1.0;
  const dist = Math.abs(time - peak);
  return clamp(0.78 + 0.52 * Math.exp(-0.38 * dist * dist), 0.78, 1.30);
}

// Type → colour map (for typeByPhase overrides)
const TYPE_COLORS = {
  friendship:         '#4CAF50',
  romance:            '#E879A0',
  family:             '#D4AF37',
  alliance:           '#2196F3',
  rivalry:            '#C0392B',
  'revealed-alliance':'#FF8C00',
  neutral:            '#888888',
};

/**
 * Returns the override stroke colour for an edge at this time,
 * based on its typeByPhase array. Returns null if no override.
 */
function edgeColorAtTime(edge, time) {
  if (!edge.typeByPhase) return null;
  const phase = edge.typeByPhase.find((p) => time >= p.from && time <= p.to);
  return phase ? (TYPE_COLORS[phase.type] ?? null) : null;
}

function edgeIsDashed(edge, time) {
  if (!edge.typeByPhase) return edge.type === 'rivalry';
  const phase = edge.typeByPhase.find((p) => time >= p.from && time <= p.to);
  const t = phase?.type ?? edge.type;
  return t === 'rivalry';
}

/** Canonical default edge stroke (ignoring typeByPhase). */
function edgeDefaultColor(d) {
  if (d.type === 'rivalry') return '#C0392B';
  if (d.type === 'family')  return '#D4AF37';
  if (d.type === 'romance') return '#E879A0';
  const sf = d.source?.faction;
  const tf = d.target?.faction;
  return sf === tf ? (FACTIONS[sf]?.color ?? '#888') : '#4a7a9b';
}

// Smooth zoom to a bounding box of nodes
function zoomToNodes(svg, zoom, nodes, W, H, pad = 80, maxScale = 3) {
  if (!nodes.length) return;
  const x0 = d3.min(nodes, (n) => n.x) - pad;
  const x1 = d3.max(nodes, (n) => n.x) + pad;
  const y0 = d3.min(nodes, (n) => n.y) - pad;
  const y1 = d3.max(nodes, (n) => n.y) + pad;
  const scale = Math.max(0.25, Math.min(maxScale,
    0.85 * Math.min(W / (x1 - x0), H / (y1 - y0))));
  const tx = W / 2 - scale * (x0 + x1) / 2;
  const ty = H / 2 - scale * (y0 + y1) / 2;
  svg.transition().duration(820).ease(d3.easeCubicInOut)
    .call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
}

export default function ForceGraph({
  svgRef, characters, edges,
  activeFilters, searchQuery, focusedFaction, currentTime,
  onSelectCharacter, selectedIds, hoveredId, onHoverCharacter,
}) {
  const simRef   = useRef(null);
  const gRef     = useRef(null);
  const zoomRef  = useRef(null);
  const prevTimeRef    = useRef(currentTime);
  const currentTimeRef = useRef(currentTime);

  const onSelectRef = useRef(onSelectCharacter);
  const onHoverRef  = useRef(onHoverCharacter);
  useEffect(() => { onSelectRef.current = onSelectCharacter; }, [onSelectCharacter]);
  useEffect(() => { onHoverRef.current  = onHoverCharacter;  }, [onHoverCharacter]);

  const focusedFactionRef = useRef(focusedFaction);
  useEffect(() => { focusedFactionRef.current = focusedFaction; }, [focusedFaction]);

  // Keep a reactive ref for currentTime so tick callbacks read the latest value
  useEffect(() => { currentTimeRef.current = currentTime; }, [currentTime]);

  // ── Filtered node/edge sets ───────────────────────────────
  const filteredChars = characters.filter(
    (c) =>
      activeFilters.has(c.faction) &&
      (!searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const visibleIds = new Set(filteredChars.map((c) => c.id));
  const filteredEdges = edges.filter((e) => {
    const src = typeof e.source === 'object' ? e.source.id : e.source;
    const tgt = typeof e.target === 'object' ? e.target.id : e.target;
    return visibleIds.has(src) && visibleIds.has(tgt);
  });

  // ── ONE-TIME SETUP ────────────────────────────────────────
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const defs = svg.append('defs');

    Object.values(FACTIONS).forEach((f) => {
      const filt = defs.append('filter').attr('id', `glow-${f.id}`)
        .attr('x', '-60%').attr('y', '-60%').attr('width', '220%').attr('height', '220%');
      filt.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', '4').attr('result', 'blur');
      const m = filt.append('feMerge');
      m.append('feMergeNode').attr('in', 'blur');
      m.append('feMergeNode').attr('in', 'SourceGraphic');
    });

    const sf = defs.append('filter').attr('id', 'glow-selected')
      .attr('x', '-80%').attr('y', '-80%').attr('width', '260%').attr('height', '260%');
    sf.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', '9').attr('result', 'blur');
    const sm = sf.append('feMerge');
    sm.append('feMergeNode').attr('in', 'blur');
    sm.append('feMergeNode').attr('in', 'SourceGraphic');

    const g = svg.append('g').attr('class', 'zoom-root');
    gRef.current = g;

    const zoom = d3.zoom().scaleExtent([0.1, 5])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom).on('dblclick.zoom', null);
    zoomRef.current = zoom;

    svg.on('click', (event) => {
      if (event.target === svgEl) onSelectRef.current(null);
    });

    g.append('g').attr('class', 'hulls');
    g.append('g').attr('class', 'links');
    g.append('g').attr('class', 'nodes');

    return () => { simRef.current?.stop(); };
  }, [svgRef]); // eslint-disable-line

  // ── REBUILD SIMULATION ────────────────────────────────────
  useEffect(() => {
    const svgEl = svgRef.current;
    const g     = gRef.current;
    if (!svgEl || !g) return;

    const W = svgEl.clientWidth  || 900;
    const H = svgEl.clientHeight || 700;

    const prevNodes = simRef.current?.nodes() ?? [];
    const prevById  = Object.fromEntries(prevNodes.map((n) => [n.id, n]));

    const nodes = filteredChars.map((c) => {
      const prev = prevById[c.id];
      return {
        ...c,
        x:  prev?.x  ?? W * (FACTIONS[c.faction]?.clusterX ?? 0.5) + (Math.random() - 0.5) * 100,
        y:  prev?.y  ?? H * (FACTIONS[c.faction]?.clusterY ?? 0.5) + (Math.random() - 0.5) * 100,
        vx: prev?.vx ?? 0,
        vy: prev?.vy ?? 0,
      };
    });
    const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

    const links = filteredEdges
      .map((e) => ({
        ...e,
        source: nodeById[typeof e.source === 'object' ? e.source.id : e.source],
        target: nodeById[typeof e.target === 'object' ? e.target.id : e.target],
      }))
      .filter((e) => e.source && e.target);

    simRef.current?.stop();

    // Initial cluster targets use house positions (spatial evolution effect will override)
    const sim = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d) => d.id)
        .distance((d) => LINK_DISTANCE + (3 - d.strength) * 20).strength(0.4))
      .force('charge', d3.forceManyBody()
        .strength((d) => NODE_REPULSION - (d.importance || 3) * 12))
      .force('collision', d3.forceCollide()
        .radius((d) => getNodeRadius(d) + COLLISION_RADIUS).strength(0.85))
      .force('clusterX', d3.forceX((d) => W * (FACTIONS[d.faction]?.clusterX ?? 0.5))
        .strength(CLUSTER_STRENGTH))
      .force('clusterY', d3.forceY((d) => H * (FACTIONS[d.faction]?.clusterY ?? 0.5))
        .strength(CLUSTER_STRENGTH))
      .force('center', d3.forceCenter(W / 2, H / 2).strength(0.03))
      .alphaDecay(0.022).velocityDecay(0.44);

    simRef.current  = sim;
    sim._nodes      = nodes;
    sim._links      = links;

    // ── Links ──────────────────────────────────────────────
    const linkG   = g.select('.links');
    linkG.selectAll('*').remove();
    const linkSel = linkG.selectAll('line')
      .data(links, (d) => d.id)
      .join('line')
      .attr('stroke', (d) => edgeColorAtTime(d, currentTimeRef.current) ?? edgeDefaultColor(d))
      .attr('stroke-width', (d) => d.strength * 0.8 + 0.5)
      .attr('stroke-opacity', 0.28)
      .attr('stroke-dasharray', (d) => edgeIsDashed(d, currentTimeRef.current) ? '5,4' : null);

    // ── Nodes ──────────────────────────────────────────────
    const nodeG   = g.select('.nodes');
    nodeG.selectAll('*').remove();
    const nodeSel = nodeG.selectAll('g.node')
      .data(nodes, (d) => d.id)
      .join('g').attr('class', 'node').style('cursor', 'pointer')
      .call(
        d3.drag()
          .on('start', (event, d) => { if (!event.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
          .on('drag',  (event, d) => { d.fx = event.x; d.fy = event.y; })
          .on('end',   (event, d) => { if (!event.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
      )
      .on('click', (event, d) => { event.stopPropagation(); onSelectRef.current(d.id); })
      .on('mouseenter', (event, d) => {
        onHoverRef.current(d.id);
        const t = currentTimeRef.current;
        d3.select('#graph-tooltip')
          .style('display', 'block')
          .style('left', (event.clientX + 14) + 'px')
          .style('top',  (event.clientY - 10) + 'px')
          .html(`
            <div class="tooltip-name">${d.name}</div>
            <div class="tooltip-faction" style="color:${FACTIONS[d.faction]?.color ?? '#888'}">
              ${FACTIONS[d.faction]?.symbol ?? ''} ${FACTIONS[d.faction]?.name ?? d.faction}
            </div>
            <div class="tooltip-hint">
              ${charPresence(d.id, t) > 0
                ? 'Click to open card · Drag to reposition'
                : 'Not yet introduced at this point in time'}
            </div>
          `);
      })
      .on('mousemove', (event) => {
        d3.select('#graph-tooltip')
          .style('left', (event.clientX + 14) + 'px')
          .style('top',  (event.clientY - 10) + 'px');
      })
      .on('mouseleave', () => {
        onHoverRef.current(null);
        d3.select('#graph-tooltip').style('display', 'none');
      });

    // Node visual layers
    nodeSel.append('circle').attr('class', 'aura')
      .attr('r', (d) => getNodeRadius(d) + 9)
      .attr('fill', (d) => FACTIONS[d.faction]?.bgGlow ?? 'transparent')
      .attr('stroke', (d) => FACTIONS[d.faction]?.color ?? '#888')
      .attr('stroke-width', 1.2).attr('stroke-opacity', 0.3)
      .attr('filter', (d) => `url(#glow-${d.faction})`);

    nodeSel.append('circle').attr('class', 'ring')
      .attr('r', (d) => getNodeRadius(d) + 3.5)
      .attr('fill', 'none')
      .attr('stroke', (d) => FACTIONS[d.faction]?.accentColor ?? '#ccc')
      .attr('stroke-width', 1.5).attr('stroke-opacity', 0.55);

    nodeSel.append('circle').attr('class', 'body')
      .attr('r', (d) => getNodeRadius(d))
      .attr('fill', (d) => FACTIONS[d.faction]?.color ?? '#555')
      .attr('fill-opacity', 0.9)
      .attr('stroke', (d) => FACTIONS[d.faction]?.accentColor ?? '#ccc')
      .attr('stroke-width', 2)
      .attr('filter', (d) => `url(#glow-${d.faction})`);

    nodeSel.append('circle')
      .attr('r', (d) => getNodeRadius(d) * 0.7)
      .attr('fill', 'rgba(0,0,0,0.35)').attr('pointer-events', 'none');

    nodeSel.append('text')
      .attr('text-anchor', 'middle').attr('dominant-baseline', 'central')
      .attr('font-family', 'Cinzel, serif').attr('font-weight', '700')
      .attr('fill', '#fff').attr('fill-opacity', 0.92).attr('pointer-events', 'none')
      .attr('font-size', (d) => Math.max(7, getNodeRadius(d) * 0.52))
      .text((d) => getInitials(d.name));

    nodeSel.append('text').attr('class', 'name-label')
      .attr('text-anchor', 'middle').attr('dominant-baseline', 'hanging')
      .attr('font-family', 'IM Fell English, serif').attr('font-size', 10)
      .attr('fill', '#c8b898').attr('fill-opacity', 0.72).attr('pointer-events', 'none')
      .attr('y', (d) => getNodeRadius(d) + 6)
      .text((d) => d.name.split(' ')[0]);

    sim._nodeSel = nodeSel;
    sim._linkSel = linkSel;

    // ── Tick ───────────────────────────────────────────────
    const hullG = g.select('.hulls');
    sim.on('tick', () => {
      linkSel
        .attr('x1', (d) => d.source.x).attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x).attr('y2', (d) => d.target.y);
      nodeSel.attr('transform', (d) => `translate(${d.x},${d.y})`);

      // Hulls — fade out as war progresses
      hullG.selectAll('path.hull').remove();
      const phase = warPhase(currentTimeRef.current);
      const hullFillOp   = 1 - phase * 0.65;
      const hullStrokeOp = 0.22 - phase * 0.14;

      const byFaction = d3.group(nodes, (n) => n.faction);
      byFaction.forEach((fnodes, fid) => {
        if (fnodes.length < 3) return;
        const f    = FACTIONS[fid];
        const hull = d3.polygonHull(fnodes.map((n) => [n.x, n.y]));
        if (!hull || !f) return;
        const focused = focusedFactionRef.current;
        const visible = !focused || focused === fid;
        hullG.insert('path', ':first-child').attr('class', 'hull')
          .attr('d', smoothHull(expandHull(hull, 52)))
          .attr('fill',           visible ? f.bgGlow : 'transparent')
          .attr('fill-opacity',   visible ? hullFillOp : 0)
          .attr('stroke',         f.color)
          .attr('stroke-width',   1.5)
          .attr('stroke-opacity', visible ? hullStrokeOp : 0.04)
          .attr('filter',         visible ? `url(#glow-${fid})` : null);
      });
    });

    // Initial fit-all after simulation settles
    let fitted = false;
    sim.on('end', () => {
      if (!fitted && !focusedFactionRef.current && zoomRef.current) {
        fitted = true;
        zoomToNodes(d3.select(svgEl), zoomRef.current, nodes,
          svgEl.clientWidth, svgEl.clientHeight, 60, 1.2);
      }
    });

  }, [filteredChars.map((c) => c.id).join(','), filteredEdges.length]); // eslint-disable-line

  // ── SPATIAL EVOLUTION: house → war clustering ─────────────
  // Runs whenever currentTime changes. Smoothly updates cluster force
  // targets without rebuilding the simulation — nodes drift to new positions.
  useEffect(() => {
    const sim   = simRef.current;
    const svgEl = svgRef.current;
    if (!sim) return;

    const W = svgEl?.clientWidth  || 900;
    const H = svgEl?.clientHeight || 700;
    const t = warPhase(currentTime);

    sim.force('clusterX', d3.forceX((d) => {
      const f = FACTIONS[d.faction];
      if (!f) return W * 0.5;
      const hx = f.clusterX    ?? 0.5;
      const wx = f.warClusterX ?? hx;
      return W * lerp(hx, wx, t);
    }).strength(CLUSTER_STRENGTH + t * 0.06));

    sim.force('clusterY', d3.forceY((d) => {
      const f = FACTIONS[d.faction];
      if (!f) return H * 0.5;
      const hy = f.clusterY    ?? 0.5;
      const wy = f.warClusterY ?? hy;
      return H * lerp(hy, wy, t);
    }).strength(CLUSTER_STRENGTH + t * 0.06));

    // Gently restart simulation to drift nodes toward new targets
    if (sim.alpha() < 0.15) sim.alpha(0.28).restart();
  }, [currentTime]); // eslint-disable-line

  // ── FACTION FOCUS: smooth camera zoom ────────────────────
  useEffect(() => {
    const svgEl = svgRef.current;
    const zoom  = zoomRef.current;
    const sim   = simRef.current;
    if (!svgEl || !zoom) return;
    const svg = d3.select(svgEl);
    const W = svgEl.clientWidth, H = svgEl.clientHeight;

    if (!focusedFaction) {
      const all = sim?.nodes() ?? [];
      if (all.length) zoomToNodes(svg, zoom, all, W, H, 70, 1.2);
      else svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity);
      return;
    }
    const fNodes = (sim?.nodes() ?? []).filter((n) => n.faction === focusedFaction);
    if (fNodes.length) zoomToNodes(svg, zoom, fNodes, W, H, 90, 2.8);
  }, [focusedFaction]); // eslint-disable-line

  // ── COMBINED VISUAL STYLING ───────────────────────────────
  // Applies: time presence, node emphasis (size/brightness), edge evolution
  // (continuous opacity + color + dash), hover/selection highlighting.
  useEffect(() => {
    const sim = simRef.current;
    if (!sim?._nodeSel) return;
    const { _nodeSel: nodeSel, _linkSel: linkSel, _links: links } = sim;
    const selSet = new Set(selectedIds);

    const timeChanged = prevTimeRef.current !== currentTime;
    prevTimeRef.current = currentTime;
    const dur = timeChanged ? 520 : 0;

    const withT = (sel) => dur > 0
      ? sel.transition().duration(dur).ease(d3.easeCubicInOut)
      : sel;

    // ── Nodes ──────────────────────────────────────────────
    nodeSel.each(function (d) {
      const presence  = charPresence(d.id, currentTime);
      const emphasis  = charEmphasis(d, currentTime);
      const isSel     = selSet.has(d.id);
      const isHov     = d.id === hoveredId;
      const inFocus   = !focusedFaction || d.faction === focusedFaction;
      const isConn    = hoveredId && links.some(
        (l) =>
          (l.source.id === hoveredId && l.target.id === d.id) ||
          (l.target.id === hoveredId && l.source.id === d.id)
      );

      let bodyOp  = 0.9;
      let auraOp  = 0.3;
      let labelOp = 0.72;
      let ringOp  = 0.55;
      // Radius multiplier: emphasis only applies when character is present
      let radiusMult = presence > 0 ? emphasis : 1.0;

      if (!presence && !isSel) {
        bodyOp = 0.09; auraOp = 0.02; labelOp = 0.03; ringOp = 0.03;
        radiusMult = 0.85;
      } else if (!inFocus && !isSel) {
        bodyOp = 0.11; auraOp = 0.04; labelOp = 0.07; ringOp = 0.05;
      } else if (hoveredId && !isHov && !isConn && !isSel) {
        bodyOp = 0.22; auraOp = 0.08; labelOp = 0.15; ringOp = 0.18;
      }

      if (isSel || isHov) {
        bodyOp = 0.9; auraOp = 0.75; labelOp = 1.0; ringOp = 0.75;
        radiusMult = Math.max(radiusMult, 1.05);
      }

      const baseR = getNodeRadius(d);
      const r     = baseR * radiusMult;

      const node = d3.select(this);

      withT(node.select('.aura'))
        .attr('stroke-opacity', auraOp)
        .attr('r', isSel ? r + 16 : r + 9);

      withT(node.select('.body'))
        .attr('r', r)
        .attr('fill-opacity', bodyOp)
        .attr('filter', isSel ? 'url(#glow-selected)' : `url(#glow-${d.faction})`);

      withT(node.select('.ring'))
        .attr('r', r + 3.5)
        .attr('stroke-opacity', ringOp);

      withT(node.select('.name-label'))
        .attr('fill-opacity', labelOp)
        .attr('y', r + 6);
    });

    // ── Links ──────────────────────────────────────────────
    linkSel.each(function (d) {
      const sf     = edgeStrengthFactor(d, currentTime);
      const col    = edgeColorAtTime(d, currentTime) ?? edgeDefaultColor(d);
      const dashed = edgeIsDashed(d, currentTime);

      const srcF   = d.source?.faction;
      const tgtF   = d.target?.faction;
      const inFocus = !focusedFaction ||
        (srcF === focusedFaction && tgtF === focusedFaction);
      const conn   = hoveredId &&
        (d.source.id === hoveredId || d.target.id === hoveredId);

      let op = sf > 0
        ? (conn ? 0.92 : (!inFocus ? 0.03 : (hoveredId && !conn ? 0.05 : (d.type === 'rivalry' ? 0.50 : 0.28))))
        : 0.0;
      op *= sf;  // continuous modulation: fading in/out edges are less visible

      const w = sf > 0
        ? (conn ? d.strength * 0.8 + 2.5 : d.strength * 0.8 + 0.5) * (0.55 + 0.45 * sf)
        : 0.2;

      const link = d3.select(this);
      withT(link)
        .attr('stroke', col)
        .attr('stroke-opacity', op)
        .attr('stroke-width', w)
        .attr('stroke-dasharray', dashed ? '5,4' : null);
    });

  }, [hoveredId, selectedIds, focusedFaction, currentTime]); // eslint-disable-line

  return null;
}

// ── Hull helpers ──────────────────────────────────────────────
function expandHull(hull, padding) {
  const cx = d3.mean(hull, (p) => p[0]);
  const cy = d3.mean(hull, (p) => p[1]);
  return hull.map(([x, y]) => {
    const dx = x - cx; const dy = y - cy;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    return [x + (dx / len) * padding, y + (dy / len) * padding];
  });
}

function smoothHull(points) {
  const n = points.length;
  if (n < 2) return '';
  const mids = points.map((p, i) => {
    const next = points[(i + 1) % n];
    return [(p[0] + next[0]) / 2, (p[1] + next[1]) / 2];
  });
  let path = `M ${mids[0][0]},${mids[0][1]}`;
  for (let i = 0; i < n; i++) {
    path += ` Q ${points[i][0]},${points[i][1]} ${mids[(i + 1) % n][0]},${mids[(i + 1) % n][1]}`;
  }
  return path + ' Z';
}
