import { motion } from 'framer-motion';
import { experience } from '../data';
import { Reveal, SectionLabel, SplitText } from './ui';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionLabel n="03">Experience</SectionLabel>
      <h2 className="sec-title">
        <SplitText text="Where I've" /> <em className="serif">worked</em>
      </h2>

      <div className="jobs">
        {experience.map((job) => (
          <article key={job.company} className="job">
            <motion.span
              className="job-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            />
            <Reveal className="job-side">
              <span className="job-period mono">{job.period}</span>
              <span className={`tag ${job.current ? 'tag-live' : ''}`}>{job.duration}</span>
            </Reveal>
            <div className="job-main">
              <Reveal>
                <h3 className="job-company">{job.company}</h3>
                <p className="job-role">
                  {job.role} <span>· {job.location}</span>
                </p>
              </Reveal>
              <ul className="job-points">
                {job.points.map((p, i) => (
                  <Reveal as="li" key={p} delay={i * 0.05} y={20}>
                    {p}
                  </Reveal>
                ))}
              </ul>
              <Reveal className="job-tags mono">{job.tags.join('  ·  ')}</Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
