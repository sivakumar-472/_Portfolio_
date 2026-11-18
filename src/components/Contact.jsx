import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { profile } from '../data';
import { Magnetic, Roll, SectionLabel, SplitText } from './ui';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const empty = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', msg: '' });

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Your name, please';
    if (!EMAIL_RE.test(form.email)) er.email = "That email doesn't look right";
    if (form.message.trim().length < 10) er.message = 'A few more words (10+ characters)';
    setErrors(er);
    if (Object.keys(er).length) return;
    if (!profile.web3formsKey) {
      setStatus({ type: 'error', msg: 'Mail service not configured — set VITE_WEB3FORMS_ACCESS_KEY in .env' });
      return;
    }
    setStatus({ type: 'loading', msg: '' });
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          subject: `Portfolio message from ${form.name}`,
          from_name: 'Portfolio Contact Form',
          replyto: form.email,
          ...form,
          botcheck: '',
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus({ type: 'success', msg: "Message sent. I'll reply within a day or two." });
      setForm(empty);
    } catch {
      setStatus({ type: 'error', msg: `Couldn't send right now — email me at ${profile.email}` });
    }
  };

  const Field = ({ n, name, label, type = 'text', area }) => (
    <label className={`f ${errors[name] ? 'f-err' : ''}`}>
      <span className="mono f-n">{n}</span>
      <span className="f-label">{label}</span>
      {area ? (
        <textarea name={name} value={form[name]} onChange={update} rows={3} placeholder="Tell me about your project or role..." />
      ) : (
        <input name={name} type={type} value={form[name]} onChange={update} placeholder={type === 'email' ? 'you@company.com' : 'Your name'} autoComplete={name} />
      )}
      {errors[name] && <span className="f-msg">{errors[name]}</span>}
    </label>
  );

  return (
    <section id="contact" className="section contact">
      <SectionLabel n="05">Contact</SectionLabel>
      <h2 className="contact-title">
        <SplitText text="Let's work" /> <br />
        <em className="serif">
          <SplitText text="together" delay={0.15} />
        </em>
      </h2>

      <div className="contact-grid">
        <div className="contact-side">
          <p className="mono">Email</p>
          <a href={`mailto:${profile.email}`} className="big-link">
            <Roll>{profile.email}</Roll>
          </a>
          <p className="mono">Phone</p>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="big-link">
            <Roll>{profile.phone}</Roll>
          </a>
          <p className="mono">Elsewhere</p>
          <div className="socials">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Roll>LinkedIn ↗</Roll>
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Roll>GitHub ↗</Roll>
            </a>
          </div>
        </div>

        <form className="form" onSubmit={submit} noValidate>
          {Field({ n: '01', name: 'name', label: "What's your name?" })}
          {Field({ n: '02', name: 'email', label: "What's your email?", type: 'email' })}
          {Field({ n: '03', name: 'message', label: 'Your message', area: true })}

          <div className="form-foot">
            <AnimatePresence mode="wait">
              {(status.type === 'success' || status.type === 'error') && (
                <motion.p key={status.type} className={`status status-${status.type}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
                  {status.msg}
                </motion.p>
              )}
            </AnimatePresence>
            <Magnetic strength={0.4}>
              <button type="submit" className="send" disabled={status.type === 'loading'}>
                {status.type === 'loading' ? 'Sending…' : 'Send it'}
              </button>
            </Magnetic>
          </div>
        </form>
      </div>
    </section>
  );
}
