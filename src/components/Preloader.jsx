import { animate, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const greetings = ['Hello', 'வணக்கம்', 'नमस्ते', 'Hola', 'Bonjour', 'Hello'];

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [g, setG] = useState(0);

  useEffect(() => {
    const c = animate(0, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 250),
    });
    const t = setInterval(() => setG((i) => Math.min(i + 1, greetings.length - 1)), 330);
    return () => {
      c.stop();
      clearInterval(t);
    };
  }, [onDone]);

  return (
    <motion.div className="preloader" exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
      <p className="pre-greet">
        <span className="pre-dot" /> {greetings[g]}
      </p>
      <span className="pre-count">{String(count).padStart(3, '0')}</span>
      <div className="pre-bar">
        <span style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </motion.div>
  );
}
