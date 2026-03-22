# Hogwarts Map — Visualization Write-Up

## Rationale for Design Decisions

### Visual Encodings

The central challenge was representing a dense social network of 62 characters across multiple overlapping factions, where relationships carry different types and intensities. I chose a **force-directed graph** as the primary representation because it naturally reveals clustering and connectivity without requiring manual layout — nodes with more shared relationships gravitate toward each other, making community structure emergent rather than imposed.

**Faction** is the most structurally important attribute, so it is encoded redundantly across four channels: node fill color, ambient glow color, convex hull background region, and spatial position (cluster forces pull each faction toward a designated quadrant). Using only color would have been ambiguous in a dense graph; the spatial grouping and hull outlines make faction membership legible even at small node sizes.

**Relationship type** is encoded through edge color (gold for family, pink for romance, red for rivalry, blue/green for friendship/alliance) and stroke style (dashed for rivalry). **Relationship strength** maps to edge thickness. These choices follow established network visualization conventions and minimize the learning curve.

**Node importance** maps to circle radius. Major characters like Harry, Dumbledore, and Voldemort are visibly larger, which provides an immediate sense of narrative centrality without a separate legend entry.

I initially considered using a matrix view alongside the graph to show relationship types more systematically, but this would have broken the spatial faction structure that is central to the HP story. I also considered node icons (character portraits) but decided initials were cleaner and less distracting at the scale used.

### Interaction Design

**Hover highlighting** dims all non-adjacent nodes and edges, letting users trace individual relationships without visual clutter. The alternative — showing a separate detail panel on hover — would have required eye movement away from the graph.

**Faction focus** in the sidebar zooms and pans the camera to a faction's cluster rather than hiding other factions. Hiding nodes would have broken the layout and destroyed spatial context. Smooth camera transitions preserve the user's mental map.

**Character cards** surface detailed attributes on click. Up to five cards can be open simultaneously in a fan layout, inspired by a hand of playing cards, which felt thematically appropriate for a game-like, magical aesthetic. A simple modal list was considered but felt flat by comparison.

### Timeline & Animation

The **global timeline** (Book 1–7) was designed to communicate story evolution rather than just filter data. Three decisions distinguish it from a simple on/off filter:

1. **Spatial evolution** — cluster forces interpolate between house positions (Years 1–3) and war-faction positions (Years 6–7) as the timeline advances, so the graph visibly reorganizes. This required smoothly updating D3 force targets without rebuilding the simulation — nodes drift to new positions rather than teleporting.
2. **Continuous edge modulation** — edges ramp opacity and thickness in and out over their first and last active year, giving the impression of relationships forming and fading rather than switching abruptly.
3. **Node emphasis** — characters with a defined `emphasisPeak` year grow slightly larger and brighter near that year, encoding narrative importance at a given moment.

The convex hull borders also fade as the war phase advances, visually reflecting how house identity dissolves into broader factional conflict by Books 6–7.

---

## Development Process

### Tools and LLM Use

This project was developed collaboratively with **Claude (Anthropic)**, used as a pair-programming assistant throughout. The workflow was iterative: I described features and constraints in natural language, Claude generated the implementation, and I reviewed, tested, and directed further refinements.

The LLM was most useful for D3-specific boilerplate — setting up the force simulation, writing the zoom/transform logic, computing convex hulls, and managing the D3 + React hybrid rendering pattern (where D3 owns all SVG DOM inside a `useEffect`, bypassing React's virtual DOM for performance). These are areas where the API surface is wide and the documentation is dense; having working code to inspect and modify significantly reduced ramp-up time.

I was comfortable with this workflow because I maintained full design authority — every visual encoding, interaction model, and data structure was my decision, and I understood the code well enough to debug and extend it. The LLM acted as a fast-typing collaborator rather than an autonomous agent.

### Time Breakdown

Total development time: approximately **18–22 people-hours**.

| Phase | Estimated Time |
|-------|---------------|
| Data collection & character dataset | 3–4 hrs |
| Core graph (simulation, rendering, hull) | 4–5 hrs |
| Faction sidebar & camera focus | 2 hrs |
| Character cards & Framer Motion animations | 3 hrs |
| Timeline system & spatial evolution | 4–5 hrs |
| CSS, polish, and debugging | 2–3 hrs |

The **timeline system** took the most time. Achieving smooth spatial evolution without resetting the simulation required careful management of D3 force references and alpha values. Getting the edge evolution to feel continuous (rather than on/off) also required several iterations to tune the ramp-in/ramp-out math.

### Data Sources

Character relationship data was compiled manually from the Harry Potter book series by J.K. Rowling and cross-referenced with the [Harry Potter Wiki (Fandom)](https://harrypotter.fandom.com/wiki/Harry_Potter_Wiki). No external dataset was used; all relationship classifications and temporal annotations reflect the canonical book timeline.

### Inspiration

Visual style and layout approach were informed by [The Pudding's](https://pudding.cool/) network essays and Mike Bostock's D3 force-directed graph examples. The faction cluster + convex hull pattern was inspired by community detection visualizations in academic network analysis.
