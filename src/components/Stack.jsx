import { motion } from 'framer-motion';
import { skillGroups } from '../data';
import { SectionLabel, SplitText } from './ui';

export default function Stack() {
  return (
    <section id="stack" className="section">
      <SectionLabel n="02">Stack</SectionLabel>
      <h2 className="sec-title">
        <SplitText text="Tools I reach for" /> <em className="serif">every day</em>
      </h2>

      <ul className="stack-list">
        {skillGroups.map((g, i) => (
          <motion.li
            key={g.title}
            className="stack-row"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mono stack-i">0{i + 1}</span>
            <h3 className="stack-cat">{g.title}</h3>
            <p className="stack-items">
              {g.items.map((s, j) => (
                <span key={s}>
                  {s}
                  {j < g.items.length - 1 && <i> / </i>}
                </span>
              ))}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
