import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '../data';
import { Roll } from './ui';

const links = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

function useClock() {
  const fmt = () => new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const YEAR = new Date().getFullYear();

export default function Nav({ ready }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const time = useClock();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 200 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('lock', open);
  }, [open]);

  return (
    <>
      <motion.header
        className="nav"
        initial={{ y: -100 }}
        animate={{ y: ready && !hidden ? 0 : -100 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        <a href="#top" className="nav-brand">
          <Roll>Sivakumar M</Roll>
          <sup>©{YEAR % 100}</sup>
        </a>
        <span className="nav-time">
          Coimbatore <b>{time}</b> IST
        </span>
        <nav className="nav-links">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              <Roll>{l.label}</Roll>
            </a>
          ))}
        </nav>
        <button className="nav-menu" onClick={() => setOpen(true)} aria-label="Open menu">
          Menu <span className="burger" />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu-top">
              <span className="mono">Navigation</span>
              <button onClick={() => setOpen(false)} className="menu-close">
                Close ✕
              </button>
            </div>
            <ul>
              {links.map((l, i) => (
                <li key={l.id} className="mask">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="mono">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="menu-foot">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href={profile.resume} download>
                Resume ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
