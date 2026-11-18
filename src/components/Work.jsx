import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '../data';
import { SectionLabel, SplitText } from './ui';

/* Flat, hand-drawn style previews of each product (no screenshots needed). */
function HrmVisual() {
  return (
    <div className="mk mk-hrm">
      <div className="mk-win">
        <div className="mk-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="mk-dash">
          <div className="mk-side">
            <b />
            <span className="on" />
            <span />
            <span />
            <span />
          </div>
          <div className="mk-content">
            <div className="mk-kpi">
              <div>
                <strong>96%</strong>
                <small>attendance</small>
              </div>
              <div>
                <strong>12</strong>
                <small>on leave</small>
              </div>
              <div className="hide-xs">
                <strong>48</strong>
                <small>staff</small>
              </div>
            </div>
            <div className="mk-chart">
              {[40, 65, 50, 85, 60, 75, 55].map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mk-phone">
        <small>Leave · 2 days</small>
        <strong>Approved</strong>
        <span className="mk-line" />
        <span className="mk-line short" />
        <span className="mk-btn">Check in</span>
      </div>
    </div>
  );
}

function WebVisual() {
  return (
    <div className="mk mk-web">
      <div className="mk-win">
        <div className="mk-bar">
          <i />
          <i />
          <i />
          <em>icfctechlabs.com</em>
        </div>
        <div className="mk-site">
          <div className="mk-topnav">
            <b />
            <span />
            <span />
            <span />
          </div>
          <p className="mk-headline">
            We build <em>digital</em> products.
          </p>
          <span className="mk-cta">Get started</span>
          <div className="mk-tiles">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function OttVisual() {
  return (
    <div className="mk mk-ott">
      <div className="mk-admin">
        <small>Upload · episode_04.mp4</small>
        <div className="mk-progress">
          <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.3 }} />
        </div>
        <strong>Published</strong>
      </div>
      <div className="mk-phone tall">
        <div className="mk-player">
          <span className="mk-play">▶</span>
          <div className="mk-q">
            <span>480p</span>
            <span className="on">720p</span>
            <span>1080p</span>
          </div>
        </div>
        <small>Continue watching</small>
        <div className="mk-posters">
          <span />
          <span />
          <span />
        </div>
        <div className="mk-progress">
          <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 0.66 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.4 }} />
        </div>
      </div>
    </div>
  );
}

const visuals = { hrm: HrmVisual, web: WebVisual, ott: OttVisual };

function Card({ p, i, total, progress }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i - 1) * 0.05]);
  const Visual = visuals[p.visual];
  return (
    <div className="card-slot" style={{ '--i': i }}>
      <motion.article className={`pcard pcard--${p.visual}`} style={{ scale }} data-cursor>
        <div className="pcard-head">
          <span className="mono">
            {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="mono">{p.kind}</span>
        </div>
        <div className="pcard-body">
          <div className="pcard-text">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul>
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="pcard-stack mono">{p.stack.join(' · ')}</p>
          </div>
          <div className="pcard-visual">
            <Visual />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Work() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section id="work" className="section">
      <SectionLabel n="04">Selected work</SectionLabel>
      <h2 className="sec-title">
        <SplitText text="Things I've" /> <em className="serif">shipped</em>
      </h2>
      <div className="cards" ref={ref}>
        {projects.map((p, i) => (
          <Card key={p.id} p={p} i={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
