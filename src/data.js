const env = import.meta.env;

export const profile = {
  name: 'Sivakumar M',
  firstName: 'Sivakumar',
  role: 'Full Stack Developer',
  email: env.VITE_CONTACT_EMAIL || 'sivasivakumar8979@gmail.com',
  phone: env.VITE_CONTACT_PHONE || '+91 8220132998',
  location: env.VITE_LOCATION || 'Coimbatore, Tamil Nadu',
  linkedin: env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/sivakumar333/',
  github: env.VITE_GITHUB_URL || 'https://github.com/sivakumar-472',
  resume: env.VITE_RESUME_FILE || '/Sivakumar_M_Resume.pdf',
  web3formsKey: env.VITE_WEB3FORMS_ACCESS_KEY || '',
  roles: ['Full Stack Developer', 'React.js Developer', 'React Native Developer', 'Node.js Developer'],
  summary:
    'Full Stack Developer with 1+ year of experience building web and mobile apps using React.js, React Native, Node.js, Express.js, MongoDB and MySQL. I have shipped a production HRM system and a Netflix-style OTT app, and I enjoy clean REST APIs, secure JWT auth and solid database design.',
};

export const stats = [
  { value: 1, suffix: '+', label: 'Year of experience' },
  { value: 3, suffix: '', label: 'Live products shipped' },
  { value: 6, suffix: 'm', label: 'Internship at Codem' },
];

export const skillGroups = [
  { title: 'Frontend', icon: 'layout', items: ['React.js', 'React Native', 'React Hooks', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'] },
  { title: 'Backend', icon: 'server', items: ['Node.js', 'Express.js', 'REST API', 'GraphQL', 'JWT'] },
  { title: 'Database', icon: 'db', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { title: 'Cloud & Media', icon: 'cloud', items: ['Hostinger', 'Cloudflare CDN', 'Bunny.net', 'Video Streaming', 'LiveKit', 'Shopify'] },
  { title: 'Tools', icon: 'tool', items: ['Git', 'GitHub', 'Postman', 'Swagger', 'VS Code', 'Eclipse'] },
  { title: 'AI & Practices', icon: 'spark', items: ['ChatGPT', 'GitHub Copilot', 'Claude', 'OpenAI Codex', 'Agile / Scrum', 'DSA · OOP · MVC'] },
];

export const marquee = ['React.js', 'React Native', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'PostgreSQL', 'GraphQL', 'JWT', 'Cloudflare', 'Bunny.net', 'Java', 'Git', 'Swagger'];

export const experience = [
  {
    role: 'Software Engineer',
    company: 'ICFC Tech Labs',
    location: 'Coimbatore, Tamil Nadu',
    period: 'Dec 2025 – Present',
    duration: '1 Year',
    current: true,
    points: [
      'Working on live products: HRM system, OTT platform and the company website.',
      'Built the HRM system for web and mobile — employee attendance, leave and payroll.',
      'Built the OTT backend to upload and stream videos to a React Native app via Bunny.net.',
      'Wrote REST APIs and database schemas, secured with JWT authentication.',
      'Set up Hostinger hosting and Cloudflare CDN to make video delivery faster.',
      'Shipped features and fixes in Agile sprints using GitHub, Postman and Swagger.',
    ],
    tags: ['React.js', 'React Native', 'Node.js', 'MySQL', 'Bunny.net', 'Cloudflare'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Codem Technologies',
    location: 'Chennai, Tamil Nadu',
    period: 'May 2025 – Dec 2025',
    duration: '6 Months',
    points: [
      'Built web features using the MERN stack.',
      'Made reusable React components for mobile-friendly pages using REST and GraphQL APIs.',
    ],
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'GraphQL'],
  },
];

export const projects = [
  {
    id: 'hrm',
    title: 'ICFC HRM Portal',
    kind: 'Web App + Mobile App',
    accent: 'violet',
    visual: 'hrm',
    description:
      'A complete HR management platform for web and mobile — attendance, leave approvals and payroll with role-based dashboards for admins, managers and staff.',
    highlights: ['Leave approval time cut from days to hours', 'Separate dashboards for admins, managers & staff', 'Mobile screens to apply leave & check attendance'],
    stack: ['React.js', 'React Native', 'Node.js', 'Express.js', 'MySQL'],
  },
  {
    id: 'web',
    title: 'ICFC Tech Labs Website',
    kind: 'Company Website',
    accent: 'cyan',
    visual: 'web',
    description:
      'The official ICFC Tech Labs website — fast, responsive and SEO-friendly, hosted on Hostinger and served through the Cloudflare CDN.',
    highlights: ['Fully responsive on every device', 'Cloudflare CDN for fast global loads', 'Clean, reusable React components'],
    stack: ['React.js', 'Responsive Design', 'Hostinger', 'Cloudflare'],
  },
  {
    id: 'ott',
    title: 'OTT Video Streaming App',
    kind: 'Mobile App + Admin Panel',
    accent: 'rose',
    visual: 'ott',
    description:
      'A Netflix-style streaming app with user profiles and watch history, adaptive playback in 480p / 720p / 1080p, and an admin panel to upload and publish videos.',
    highlights: ['Adaptive streaming via Bunny.net', 'Profiles, watch history & continue watching', 'Admin panel to upload, organize, publish'],
    stack: ['React Native', 'Node.js', 'Express.js', 'MySQL', 'Bunny.net', 'Cloudflare'],
  },
];

export const education = {
  degree: 'B.E. Civil Engineering',
  school: 'Kongu Engineering College, Erode',
  period: '2019 – 2023',
  score: 'CGPA 7.99',
};

export const certifications = [
  { title: 'Full Stack Web Development', by: 'Edureka' },
  { title: 'Java Programming', by: 'Besant Technologies' },
];
