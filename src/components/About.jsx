import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { certifications, education, stats } from '../data';
import { Reveal, SectionLabel } from './ui';

const statement =
  'I started as a civil engineer and fell in love with building software. Today I turn ideas into products people actually use — HR portals, streaming apps and fast websites — owning everything from the database to the last pixel.';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="sw">
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  );
}

function ScrollStatement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = statement.split(' ');
  return (
    <p ref={ref} className="statement">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {['products', 'actually', 'use', 'pixel.'].includes(w.replace(/[—,]/g, '')) ? <em>{w}</em> : w}
        </Word>
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <SectionLabel n="01">About</SectionLabel>
      <ScrollStatement />

      <div className="about-grid">
        <Reveal className="about-copy">
          <p>
            Full Stack Developer with <b>1+ year</b> of experience building web and mobile apps using React.js, React Native, Node.js,
            Express.js, MongoDB and MySQL. I care about clean REST APIs, secure JWT authentication, and database design that
            doesn&apos;t fall over later.
          </p>
        </Reveal>

        <div className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="stat">
              <span className="stat-v">
                {s.value}
                <small>{s.suffix}</small>
              </span>
              <span className="mono">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="facts">
        <Reveal className="fact">
          <span className="mono">Education</span>
          <div>
            <h3>{education.degree}</h3>
            <p>
              {education.school} — {education.score}
            </p>
          </div>
          <span className="mono">{education.period}</span>
        </Reveal>
        {certifications.map((c, i) => (
          <Reveal key={c.title} className="fact" delay={0.08 * (i + 1)}>
            <span className="mono">Certificate</span>
            <div>
              <h3>{c.title}</h3>
              <p>{c.by}</p>
            </div>
            <span className="mono">✓</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
