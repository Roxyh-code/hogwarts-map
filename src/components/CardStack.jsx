import { AnimatePresence, motion } from 'framer-motion';
import CharacterCard from './CharacterCard';
import { CHARACTERS_MAP } from '../data/characters';

const CARD_W = 300; // must match CSS --card-width

/**
 * Compute each card's x-offset and rotation for the fan layout.
 * Cards fan outward from center, with a dynamic step that ensures
 * no card is clipped by the viewport.
 */
function getFanConfig(index, total) {
  if (total === 0) return { x: 0, rotate: 0 };

  const center = (total - 1) / 2;
  const offset = index - center; // negative = left, positive = right

  // Step shrinks as card count grows to keep the fan on screen
  const graphW    = window.innerWidth - 260; // approximate graph area width
  const maxHalf   = Math.max(1, (graphW - CARD_W - 40) / 2); // space on each side of center card
  const halfSpan  = Math.abs(offset) || 1;
  const maxStep   = maxHalf / halfSpan;
  const step      = Math.min(118, maxStep * 0.9);

  const maxRotate = Math.min(8, 28 / total); // tighter fan when many cards
  const rotate    = offset * maxRotate;

  return { x: offset * step, rotate };
}

// Spring config for the main deal animation
const DEAL_SPRING = { type: 'spring', stiffness: 290, damping: 26, mass: 0.85 };
// Faster spring for hover lift
const HOVER_SPRING = { type: 'spring', stiffness: 480, damping: 30 };

export default function CardStack({ cardIds, onClose, onSelect, currentTime }) {
  if (!cardIds.length) return null;

  return (
    // cards-overlay is a zero-height horizontal centering container at the bottom of the graph
    <div className="cards-overlay">
      {/* cards-anchor is the absolute center point; cards position themselves relative to it */}
      <div className="cards-anchor">
        <AnimatePresence mode="popLayout">
          {cardIds.map((id, i) => {
            const char = CHARACTERS_MAP[id];
            if (!char) return null;

            const { x, rotate } = getFanConfig(i, cardIds.length);

            return (
              <motion.div
                key={id}
                // Initial state: card comes from bottom, slightly rotated the wrong way
                initial={{
                  x,
                  y: 130,
                  rotate: rotate > 0 ? rotate - 18 : rotate + 18,
                  opacity: 0,
                  scale: 0.78,
                }}
                // Settled fan position
                animate={{
                  x,
                  y: 0,
                  rotate,
                  opacity: 1,
                  scale: 1,
                }}
                // Exit: reverse deal — fall back and fade
                exit={{
                  y: 90,
                  opacity: 0,
                  scale: 0.85,
                  rotate: rotate > 0 ? rotate + 14 : rotate - 14,
                  transition: { duration: 0.26, ease: [0.4, 0, 1, 1] },
                }}
                // Hover: lift the card up and pop it forward
                whileHover={{
                  y: -14,
                  scale: 1.04,
                  zIndex: 200,
                  rotate: rotate * 0.4, // flatten rotation on hover
                  transition: HOVER_SPRING,
                }}
                transition={DEAL_SPRING}
                style={{
                  position: 'absolute',
                  bottom: 28,
                  left: -CARD_W / 2, // center the card on the anchor point
                  width: CARD_W,
                  transformOrigin: 'bottom center',
                  zIndex: 10 + i,
                  pointerEvents: 'all',
                  cursor: 'default',
                }}
                // Prevent bg-click from closing all cards when clicking a card
                onClick={(e) => e.stopPropagation()}
              >
                <CharacterCard
                  character={char}
                  onClose={onClose}
                  onSelect={onSelect}
                  zIndex={10 + i}
                  globalTime={currentTime}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
