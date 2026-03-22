# 🗺️ Hogwarts Map

> *"I solemnly swear that I am up to no good."*

An interactive Harry Potter character relationship visualizer — force-directed graph with faction clustering, timeline-driven spatial evolution, and animated character cards.

**[Live Demo](#)** · Built with React + D3.js + Framer Motion

---

## Features

### Network Graph
- **Force-directed layout** with 62 characters across 7 factions
- **Faction clustering** — Gryffindor, Slytherin, Ravenclaw, Hufflepuff, Death Eaters, Order of the Phoenix, Neutral
- **Convex hull backgrounds** per faction with glow effects
- **Drag, zoom, and pan** freely around the graph

### Faction Sidebar
- Click a faction to **zoom the camera** to that cluster
- Toggle faction **visibility** independently
- Reset view to fit all characters

### Timeline (Book 1–7)
- Global slider controls the **entire graph's story phase**
- **Spatial evolution** — clusters gradually reorganize from house groups (Y1–3) to war factions (Y6–7) as the story progresses
- **Edge evolution** — relationships fade in/out, change thickness and color over time
- **Node emphasis** — important characters at a given moment appear larger and brighter
- `typeByPhase` support for relationships that change meaning (e.g. hostile → revealed-complex)

### Character Cards
- Click any node to open an **animated character card**
- Up to 5 cards in a **fan/poker-hand layout** with spring physics
- Each card has its own **mini timeline**, synced to global by default and independently overrideable
- Relationship list filters dynamically by current time

---

## Tech Stack

| Layer | Tech |
|-------|------|
| UI Framework | React 18 |
| Graph Rendering | D3.js v7 |
| Animations | Framer Motion |
| Build Tool | Vite |
| Fonts | Cinzel Decorative · IM Fell English |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Data

All character data is in [`src/data/characters.js`](src/data/characters.js), including:

- 62 characters with faction, traits, relationships
- `EDGE_TIMELINE` — per-relationship `{ start, end }` book years
- `CHARACTER_ACTIVITY` — per-character active years + `emphasisPeak`
- `typeByPhase` arrays for relationships that evolve in meaning

To add a character or relationship, edit that file — no other changes needed.
