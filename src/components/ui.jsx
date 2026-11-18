import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

const ease = [0.76, 0, 0.24, 1];

/** Words slide up from behind a mask. `play` lets the hero wait for the preloader. */
export function SplitText({ text, className, delay = 0, play, as = 'span', stagger = 0.06, chars = false }) {
  const Tag = motion[as];
  const words = text.split(' ');
  const trigger = play === undefined ? { whileInView: 'show', viewport: { once: true, amount: 0.4 } } : { animate: play ? 'show' : 'hidden' };
  if (chars) {
    return (
      <Tag className={className} initial="hidden" {...trigger} aria-label={text}>
        <span className="mask" aria-hidden="true">
          {[...text].map((ch, i) => (
            <motion.span
              key={i}
              className="mask-inner"
              variants={{
                hidden: { y: '115%', rotate: 8 },
                show: { y: '0%', rotate: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger } },
              }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </span>
      </Tag>
    );
  }
  return (
    <Tag className={className} initial="hidden" {...trigger} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="mask" aria-hidden="true">
          <motion.span
            className="mask-inner"
            variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.9, ease, delay: delay + i * stagger } } }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({ children, className, delay = 0, y = 40, as = 'div', ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Hover: text rolls up and a copy rolls in from below. */
export function Roll({ children }) {
  return (
    <span className="roll" data-text={children}>
      <span>{children}</span>
    </span>
  );
}

export function SectionLabel({ n, children }) {
  return (
    <div className="sec-label">
      <span className="sec-n">({n})</span>
      <span>{children}</span>
      <motion.span
        className="sec-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      />
    </div>
  );
}

export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });
  return (
    <motion.div
      ref={ref}
      className="magnetic"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
