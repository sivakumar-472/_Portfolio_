import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { profile } from '../data';
import { Magnetic, SplitText } from './ui';

const ease = [0.76, 0, 0.24, 1];
const out = [0.22, 1, 0.36, 1];

function SpinBadge() {
  const text = 'OPEN TO WORK • FULL STACK DEV • ';
  return (
    <div className="spin-badge" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs>
          <path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text>
          <textPath href="#circ">{text}</textPath>
        </text>
      </svg>
      <span>↘</span>
    </div>
  );
}

export default function Hero({ ready }) {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], [0, 60]);
  const archY = useTransform(scrollY, [0, 700], [0, 30]);

  // Subtle mouse parallax (desktop only): layers drift by different amounts
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const imgX = useTransform(mx, (v) => v * 14);
  const archX = useTransform(mx, (v) => v * -8);
  const badgeX = useTransform(mx, (v) => v * 24);
  const badgeY = useTransform(my, (v) => v * 18);
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const fade = (d) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay: d, ease: out },
  });

  return (
    <section id="top" className="hero" onPointerMove={onMove}>
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.span className="eyebrow mono" {...fade(0.3)}>
            <i className="live" /> Available for full-time roles
          </motion.span>

          <h1 className="hero-name">
            <SplitText text="Sivakumar" chars play={ready} delay={0.3} stagger={0.045} />
            <span className="hero-name-2">
              <SplitText text="M." chars play={ready} delay={0.75} stagger={0.08} className="serif accent" />
            </span>
          </h1>

          <p className="hero-role">
            <SplitText play={ready} delay={0.6} stagger={0.04} text="Full stack developer building" />{' '}
            <em className="serif accent">
              <SplitText play={ready} delay={0.8} text="web & mobile" />
            </em>{' '}
            <SplitText play={ready} delay={0.9} text="products." />
          </p>

          <motion.p className="hero-intro" {...fade(1)}>
            React.js, React Native and Node.js developer at <b>ICFC Tech Labs</b>, Coimbatore — I ship HR portals, OTT streaming apps and
            fast websites, from database schema to the last pixel.
          </motion.p>

          <motion.div className="hero-actions" {...fade(1.1)}>
            <Magnetic>
              <a href={profile.resume} download className="pill pill-accent">
                Download resume <span aria-hidden="true">↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="pill">
                Let&apos;s talk <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul className="hero-facts" {...fade(1.2)}>
            <li>
              <b>1+</b>
              <span>Year at ICFC</span>
            </li>
            <li>
              <b>6m</b>
              <span>Internship</span>
            </li>
            <li>
              <b>3</b>
              <span>Live products</span>
            </li>
          </motion.ul>
        </div>

        <div className="hero-visual">
          <motion.div className="hero-glow" initial={{ opacity: 0, scale: 0.6 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 2, delay: 0.4, ease: out }} />
          <motion.div
            className="arch"
            style={{ y: archY, x: archX }}
            initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 32px 32px)', scale: 0.92 }}
            animate={ready ? { clipPath: 'inset(0% 0 0 0 round 999px 999px 32px 32px)', scale: 1 } : {}}
            transition={{ duration: 1.4, ease }}
          >
            <span className="arch-rings" />
          </motion.div>

          <motion.img
            className="portrait"
            src="/profile-formal.webp"
            alt={`Portrait of ${profile.name}`}
            width="1000"
            height="950"
            style={{ y: imgY, x: imgX }}
            initial={{ opacity: 0, scale: 1.08, clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={ready ? { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' } : {}}
            transition={{ duration: 1.5, delay: 0.35, ease: out }}
            fetchPriority="high"
          />

          <motion.div className="hero-badge-wrap" style={{ x: badgeX, y: badgeY }} initial={{ scale: 0, rotate: -90 }} animate={ready ? { scale: 1, rotate: 0 } : {}} transition={{ delay: 1, duration: 0.9, ease: out }}>
            <SpinBadge />
          </motion.div>

          <motion.div className="hero-card" initial={{ opacity: 0, x: -30 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.2, duration: 0.9, ease: out }}>
            <span className="mono">Currently</span>
            <strong>Software Engineer</strong>
            <span>@ ICFC Tech Labs</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
