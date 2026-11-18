import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useRef } from 'react';
import { profile } from '../data';
import { Roll } from './ui';

const wrap = (min, max, v) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

/** Marquee that speeds up / reverses with scroll velocity. */
function VelocityMarquee({ children, base = -2 }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const pos = useTransform(x, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = dir.current * base * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    x.set(x.get() + move);
  });

  return (
    <div className="vm">
      <motion.div className="vm-track" style={{ x: pos }}>
        {[0, 1, 2, 3].map((k) => (
          <span key={k}>{children}</span>
        ))}
      </motion.div>
    </div>
  );
}

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <VelocityMarquee>
        Sivakumar M <em>—</em> Full Stack Developer <em>—</em>&nbsp;
      </VelocityMarquee>
      <div className="foot-row">
        <span className="mono">© {YEAR} Sivakumar M</span>
        <div className="foot-links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Roll>LinkedIn</Roll>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Roll>GitHub</Roll>
          </a>
          <a href={`mailto:${profile.email}`}>
            <Roll>Email</Roll>
          </a>
        </div>
        <a href="#top" className="mono">
          <Roll>Back to top ↑</Roll>
        </a>
      </div>
    </footer>
  );
}
