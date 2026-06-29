import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  DATA — pulled straight from Vaishnaviya's resume                      */
/* ---------------------------------------------------------------------- */

const PROFILE = {
  name: "Vaishnaviya Sankar",
  role: "Cybersecurity Analyst",
  focus: "Web Application Security & VAPT",
  location: "Madurai, Tamil Nadu, India",
  email: "vaishnaviya.s@gmail.com",
  phone: "+91 78689 38255",
  linkedin: "linkedin.com/in/vaishnaviya-sankar-483994247",
  linkedinHref:
    "https://www.linkedin.com/in/vaishnaviya-sankar-483994247",
};

const SUMMARY =
  "Cybersecurity analyst with hands-on experience in web application security, vulnerability assessment, and secure code review — built through live projects using Burp Suite and Nmap for manual and automated black-box testing. Skilled at identifying and remediating security defects against OWASP-aligned secure coding practices, mapping findings to NIST and CVE references, and writing clear technical reports with patch-fixing and remediation-priority recommendations. Working knowledge of the NIST Cybersecurity Framework, ISO 27001, and IAM/RBAC controls, backed by secure full-stack (MERN) development and AWS/GCP cloud security experience.";

const COVERAGE = [
  {
    id: "01",
    title: "Application & Web Security",
    items: [
      "Vulnerability Assessment",
      "Secure Code Review",
      "Secure Coding Practices",
      "Manual & Automated Testing",
      "Business Logic Review",
      "Threat Detection",
      "Incident Response",
    ],
  },
  {
    id: "02",
    title: "Security Tools",
    items: ["Burp Suite", "Nmap", "Wireshark", "TryHackMe Platform"],
  },
  {
    id: "03",
    title: "Standards & Compliance",
    items: [
      "NIST Cybersecurity Framework",
      "NIST SP 800 Series",
      "ISO 27001",
      "RBAC",
      "JWT Auth",
      "GRC",
      "Risk Assessment",
    ],
  },
  {
    id: "04",
    title: "Networking",
    items: [
      "TCP/IP",
      "DNS",
      "HTTP/HTTPS",
      "Subnets",
      "VPC Design",
      "Traffic Analysis",
      "Port Scanning",
    ],
  },
  {
    id: "05",
    title: "Cloud & Infrastructure",
    items: ["AWS — EC2, S3, VPC, IAM, RDS, ECS, CloudWatch", "GCP"],
  },
  {
    id: "06",
    title: "Scripting & Development",
    items: [
      "Python Automation Scripting",
      "REST APIs",
      "Git",
      "Linux Fundamentals",
      "MERN Stack",
    ],
  },
];

const EXPERIENCE = {
  role: "MERN Stack Developer Intern",
  company: "Osiz Technology Private Limited",
  range: "2024.06 \u2192 2025.02",
  bullets: [
    "Performed code reviews and vulnerability assessments on production applications, identifying and remediating critical security defects in line with secure coding principles.",
    "Used Burp Suite, Nmap, and Wireshark to run manual and automated security testing, including port scanning and network traffic analysis, to support threat detection and monitoring.",
    "Implemented JWT-based authentication and role-based access control (RBAC) aligned with the NIST Cybersecurity Framework to secure application access.",
    "Wrote Python automation scripts to streamline security testing and incident-response procedures.",
    "Deployed and secured full-stack applications with REST APIs on AWS, configuring IAM roles and least-privilege access controls.",
  ],
};

const CASES = [
  {
    id: "CASE-01",
    title:
      "Real-Time Threat Detection, Risk Assessment & Compliance Tracking System",
    objective:
      "Give a SOC team one place to watch live traffic, catch incidents early, and stay audit-ready.",
    actions: [
      "Built a SOC module for real-time log/network monitoring, automated alerting, and incident tracking on a rule- and threat-intel-based detection engine.",
      "Designed a risk-assessment module (Low / Medium / High / Critical) and a GRC module aligned to ISO 27001 and NIST CSF.",
      "Generated audit and compliance reports backed by RBAC, JWT auth, and audit logging.",
    ],
    stack: ["NIST CSF", "ISO 27001", "RBAC", "JWT", "Audit Logging"],
  },
  {
    id: "CASE-02",
    title: "Real-Time Port Scanning & Vulnerability Assessment Tool",
    objective:
      "Automate the first pass of a VAPT engagement — find what's open, what's running, and what's exposed.",
    actions: [
      "Built an automated Nmap-based vulnerability assessment tool to scan open ports, identify running services, and flag common CVEs.",
      "Mapped findings to NIST SP 800-53 controls.",
      "Produced remediation-prioritization reports with patch-fixing recommendations.",
    ],
    stack: ["Nmap", "Python", "CVE Mapping", "NIST SP 800-53"],
  },
  {
    id: "CASE-03",
    title: "Enterprise Cloud-Based Web Application on AWS",
    objective:
      "Stand up a production web app on AWS without leaving the network wide open.",
    actions: [
      "Architected a secure, scalable web application on EC2, VPC, S3, RDS, and ECS.",
      "Configured security groups, NACLs, and least-privilege IAM roles across the stack.",
    ],
    stack: ["AWS EC2", "VPC", "S3", "RDS", "ECS", "IAM"],
  },
];

const CREDENTIALS = [
  {
    name: "Advanced Master Program in Cybersecurity",
    org: "Zenjade Automation Technology Pvt. Ltd.",
    range: "2026.02 \u2192 2026.04",
  },
  {
    name: "Master Program in Cloud Computing — AWS & GCP",
    org: "Zenjade Automation Technology Pvt. Ltd.",
    range: "2025.11 \u2192 2026.01",
  },
  {
    name: "Cybersecurity Learning Path",
    org: "TryHackMe",
    range: "Ongoing",
  },
];

const EDUCATION = {
  degree: "B.Sc., Forensic Science",
  school:
    "Srinivasan College of Arts and Science (Affiliated to Bharathidasan University)",
  range: "2020 \u2192 2023",
};

const NAV = [
  { id: "summary", label: "Summary", code: "00" },
  { id: "coverage", label: "Coverage", code: "01" },
  { id: "log", label: "Log", code: "02" },
  { id: "cases", label: "Cases", code: "03" },
  { id: "credentials", label: "Credentials", code: "04" },
  { id: "contact", label: "Contact", code: "05" },
];

/* ---------------------------------------------------------------------- */
/*  HERO — boot / scan sequence                                           */
/* ---------------------------------------------------------------------- */

const BOOT_LINES = [
  "$ whoami",
  "vaishnaviya_sankar",
  "$ scan --target profile --depth full",
  "[+] role ......... Cybersecurity Analyst",
  "[+] focus ........ Web App Security, VAPT",
  "[+] status ....... VERIFIED",
];

function useTypedLines(lines, speed = 18, lineDelay = 260) {
  const [done, setDone] = useState([]);
  const [current, setCurrent] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setDone(lines);
      setCurrent("");
      setFinished(true);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let charTimer;
    let lineTimer;

    function typeLine() {
      const line = lines[lineIndex];
      charTimer = setInterval(() => {
        charIndex += 1;
        setCurrent(line.slice(0, charIndex));
        if (charIndex >= line.length) {
          clearInterval(charTimer);
          lineTimer = setTimeout(() => {
            setDone((d) => [...d, line]);
            setCurrent("");
            charIndex = 0;
            lineIndex += 1;
            if (lineIndex < lines.length) {
              typeLine();
            } else {
              setFinished(true);
            }
          }, lineDelay);
        }
      }, speed);
    }

    typeLine();
    return () => {
      clearInterval(charTimer);
      clearTimeout(lineTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { done, current, finished };
}

function Hero() {
  const { done, current, finished } = useTypedLines(BOOT_LINES);

  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <div className="terminal" role="img" aria-label="Profile scan terminal output">
          <div className="terminal-bar">
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
            <span className="terminal-title">profile_scan.sh</span>
          </div>
          <div className="terminal-body">
            {done.map((line, i) => (
              <div className="term-line" key={i}>
                {line}
              </div>
            ))}
            {current && (
              <div className="term-line">
                {current}
                <span className="cursor" />
              </div>
            )}
            {!current && !finished && done.length === 0 && (
              <span className="cursor" />
            )}
          </div>
        </div>

        <div className={"identity" + (finished ? " is-in" : "")}>
          <div className="eyebrow">
            <ShieldCheck size={14} strokeWidth={2.5} />
            PROFILE_SCAN // STATUS: VERIFIED
          </div>
          <h1 className="hero-name">{PROFILE.name}</h1>
          <p className="hero-role">
            {PROFILE.role} <span className="dash">—</span> {PROFILE.focus}
          </p>

          <div className="chip-row">
            <a className="chip" href={`mailto:${PROFILE.email}`}>
              <Mail size={14} /> {PROFILE.email}
            </a>
            <a className="chip" href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>
              <Phone size={14} /> {PROFILE.phone}
            </a>
            <a
              className="chip"
              href={PROFILE.linkedinHref}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <span className="chip chip-static">
              <MapPin size={14} /> {PROFILE.location}
            </span>
          </div>

          <div className="cta-row">
            <a className="btn btn-primary" href="#cases">
              View case files <ChevronRight size={16} />
            </a>
            <a className="btn btn-ghost" href="#contact">
              Open a channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  SHARED — Finding header                                               */
/* ---------------------------------------------------------------------- */

function Finding({ code, title, kicker, children, id }) {
  return (
    <section className="finding" id={id}>
      <div className="finding-head">
        <span className="finding-code">FINDING {code}</span>
        <h2 className="finding-title">{title}</h2>
        {kicker && <p className="finding-kicker">{kicker}</p>}
      </div>
      {children}
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  NAV                                                                    */
/* ---------------------------------------------------------------------- */

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"nav" + (scrolled ? " is-scrolled" : "")}>
      <a className="nav-mark" href="#top">
        <ShieldCheck size={18} strokeWidth={2.5} />
        VS
      </a>
      <nav className="nav-links">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`}>
            <span className="nav-code">{n.code}</span>
            {n.label}
          </a>
        ))}
      </nav>
      <button
        className="nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <nav className="nav-mobile" onClick={() => setOpen(false)}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              <span className="nav-code">{n.code}</span>
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------------- */
/*  SECTIONS                                                                */
/* ---------------------------------------------------------------------- */

function Summary() {
  return (
    <Finding
      code="00"
      title="Executive Summary"
      id="summary"
      kicker="Scope of this report"
    >
      <p className="summary-text">{SUMMARY}</p>
    </Finding>
  );
}

function Coverage() {
  return (
    <Finding
      code="01"
      title="Coverage Matrix"
      id="coverage"
      kicker="Tooling and domains exercised across study and practice"
    >
      <div className="matrix-grid">
        {COVERAGE.map((cat) => (
          <div className="matrix-panel" key={cat.id}>
            <div className="matrix-panel-head">
              <span className="matrix-id">{cat.id}</span>
              <h3>{cat.title}</h3>
            </div>
            <ul className="tag-list">
              {cat.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Finding>
  );
}

function ExperienceLog() {
  return (
    <Finding
      code="02"
      title="Experience Log"
      id="log"
      kicker="Where the practice was applied"
    >
      <div className="log-entry">
        <div className="log-meta">
          <span className="log-range">{EXPERIENCE.range}</span>
          <div>
            <h3 className="log-role">{EXPERIENCE.role}</h3>
            <p className="log-company">{EXPERIENCE.company}</p>
          </div>
        </div>
        <ul className="log-bullets">
          {EXPERIENCE.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </Finding>
  );
}

function CaseFiles() {
  return (
    <Finding
      code="03"
      title="Case Files"
      id="cases"
      kicker="Projects opened, worked, and closed"
    >
      <div className="case-grid">
        {CASES.map((c) => (
          <article className="case-card" key={c.id}>
            <div className="case-id">{c.id}</div>
            <h3 className="case-title">{c.title}</h3>
            <p className="case-objective">{c.objective}</p>
            <ul className="case-actions">
              {c.actions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
            <div className="case-stack">
              {c.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Finding>
  );
}

function Credentials() {
  return (
    <Finding
      code="04"
      title="Credentials & Education"
      id="credentials"
      kicker="Verification trail"
    >
      <div className="cred-columns">
        <div>
          <h3 className="cred-sub">Certifications &amp; Training</h3>
          <ul className="cred-list">
            {CREDENTIALS.map((c) => (
              <li key={c.name}>
                <span className="cred-name">{c.name}</span>
                <span className="cred-org">{c.org}</span>
                <span className="cred-range">{c.range}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="cred-sub">Education</h3>
          <ul className="cred-list">
            <li>
              <span className="cred-name">{EDUCATION.degree}</span>
              <span className="cred-org">{EDUCATION.school}</span>
              <span className="cred-range">{EDUCATION.range}</span>
            </li>
          </ul>
        </div>
      </div>
    </Finding>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <span className="finding-code">FINDING 05</span>
        <h2 className="contact-title">Open a Channel</h2>
        <p className="contact-text">
          Open to analyst and VAPT roles where I can keep finding what's
          exposed and help close it. The fastest way to reach me is email or
          LinkedIn.
        </p>
        <div className="chip-row chip-row-contact">
          <a className="chip" href={`mailto:${PROFILE.email}`}>
            <Mail size={14} /> {PROFILE.email}
          </a>
          <a className="chip" href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>
            <Phone size={14} /> {PROFILE.phone}
          </a>
          <a
            className="chip"
            href={PROFILE.linkedinHref}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={14} /> {PROFILE.linkedin}
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
      <footer className="footer">
        <span>{PROFILE.name} \u2014 {PROFILE.location}</span>
        <span className="eof">EOF</span>
      </footer>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  ROOT                                                                    */
/* ---------------------------------------------------------------------- */

export default function App() {
  return (
    <div className="page">
      <style>{CSS}</style>
      <Nav />
      <Hero />
      <main>
        <Summary />
        <Coverage />
        <ExperienceLog />
        <CaseFiles />
        <Credentials />
      </main>
      <Contact />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  STYLES                                                                  */
/* ---------------------------------------------------------------------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root{
  --bg:#070b14;
  --bg-alt:#0c1322;
  --panel:#111a2d;
  --panel-2:#0e1626;
  --border:#22304a;
  --border-soft:#1a2438;
  --teal:#2dd9a8;
  --teal-dim:#1c8a6c;
  --amber:#f0a942;
  --coral:#ff6f59;
  --text:#e8edf5;
  --text-dim:#9aa6bc;
  --text-faint:#5c6884;
  --font-display:'Space Grotesk', sans-serif;
  --font-body:'Inter', sans-serif;
  --font-mono:'JetBrains Mono', monospace;
}

*{ box-sizing:border-box; }

.page{
  background:var(--bg);
  color:var(--text);
  font-family:var(--font-body);
  line-height:1.55;
  min-height:100vh;
  width:100%;
  overflow-x:hidden;
}

a{ color:inherit; text-decoration:none; }
ul{ margin:0; padding:0; list-style:none; }
h1,h2,h3{ margin:0; font-family:var(--font-display); }
p{ margin:0; }

@media (prefers-reduced-motion: reduce){
  *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; }
}

/* ---------- NAV ---------- */
.nav{
  position:fixed; top:0; left:0; right:0; z-index:40;
  display:flex; align-items:center; justify-content:space-between;
  padding:18px clamp(20px,5vw,56px);
  background:transparent;
  border-bottom:1px solid transparent;
  transition:background .25s ease, border-color .25s ease;
}
.nav.is-scrolled{
  background:rgba(7,11,20,0.86);
  backdrop-filter:blur(10px);
  border-bottom:1px solid var(--border-soft);
}
.nav-mark{
  display:flex; align-items:center; gap:6px;
  font-family:var(--font-mono); font-weight:500; font-size:14px;
  color:var(--teal); letter-spacing:0.04em;
}
.nav-links{ display:flex; gap:28px; }
.nav-links a{
  display:flex; align-items:baseline; gap:6px;
  font-family:var(--font-mono); font-size:13px; color:var(--text-dim);
  transition:color .2s ease;
}
.nav-links a:hover, .nav-links a:focus-visible{ color:var(--teal); }
.nav-code{ color:var(--text-faint); font-size:11px; }
.nav-toggle{
  display:none; background:none; border:1px solid var(--border);
  color:var(--text); padding:8px; border-radius:6px; cursor:pointer;
}
.nav-mobile{
  position:absolute; top:100%; left:0; right:0;
  background:var(--bg-alt); border-bottom:1px solid var(--border-soft);
  display:flex; flex-direction:column; padding:8px clamp(20px,5vw,56px) 18px;
}
.nav-mobile a{
  display:flex; gap:10px; padding:12px 0; font-family:var(--font-mono);
  font-size:14px; color:var(--text-dim); border-bottom:1px solid var(--border-soft);
}
.nav-mobile a:last-child{ border-bottom:none; }

@media (max-width: 760px){
  .nav-links{ display:none; }
  .nav-toggle{ display:inline-flex; }
}

/* ---------- HERO ---------- */
.hero{
  position:relative;
  min-height:100vh;
  display:flex; align-items:center;
  padding:120px clamp(20px,5vw,56px) 64px;
  overflow:hidden;
}
.hero-grid{
  position:absolute; inset:0;
  background-image:
    linear-gradient(var(--border-soft) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-soft) 1px, transparent 1px);
  background-size:42px 42px;
  opacity:0.35;
  mask-image:radial-gradient(circle at 30% 30%, rgba(0,0,0,0.9), transparent 70%);
}
.hero-inner{
  position:relative; z-index:1;
  display:grid; grid-template-columns:minmax(260px,380px) 1fr;
  gap:clamp(28px,5vw,64px);
  max-width:1180px; margin:0 auto; width:100%;
  align-items:center;
}
@media (max-width: 880px){
  .hero-inner{ grid-template-columns:1fr; }
}

.terminal{
  background:var(--panel-2);
  border:1px solid var(--border);
  border-radius:10px;
  overflow:hidden;
  box-shadow:0 30px 60px -20px rgba(0,0,0,0.6);
}
.terminal-bar{
  display:flex; align-items:center; gap:8px;
  padding:10px 14px;
  background:var(--bg-alt);
  border-bottom:1px solid var(--border-soft);
}
.dot{ width:9px; height:9px; border-radius:50%; display:inline-block; }
.dot-r{ background:#ff5f57; } .dot-y{ background:#febc2e; } .dot-g{ background:#28c840; }
.terminal-title{
  margin-left:8px; font-family:var(--font-mono); font-size:11px; color:var(--text-faint);
}
.terminal-body{
  padding:18px 16px; min-height:190px;
  font-family:var(--font-mono); font-size:12.5px; color:var(--teal);
}
.term-line{ white-space:pre-wrap; margin-bottom:6px; color:#b8f3e1; }
.term-line:nth-child(1){ color:var(--text-dim); }
.cursor{
  display:inline-block; width:7px; height:14px; margin-left:2px;
  background:var(--teal); vertical-align:-2px;
  animation:blink 1s steps(1) infinite;
}
@keyframes blink{ 50%{ opacity:0; } }

.identity{ opacity:0; transform:translateY(8px); transition:opacity .5s ease, transform .5s ease; }
.identity.is-in{ opacity:1; transform:translateY(0); }

.eyebrow{
  display:inline-flex; align-items:center; gap:7px;
  font-family:var(--font-mono); font-size:11.5px; letter-spacing:0.06em;
  color:var(--teal); border:1px solid var(--teal-dim); border-radius:100px;
  padding:6px 12px; margin-bottom:18px;
}
.hero-name{
  font-size:clamp(1.7rem, 6.2vw, 3.6rem);
  font-weight:700; letter-spacing:-0.02em;
  white-space:nowrap;
  margin-bottom:10px;
}
.hero-role{
  font-size:clamp(0.95rem, 2.4vw, 1.25rem);
  color:var(--text-dim); margin-bottom:26px;
}
.hero-role .dash{ color:var(--text-faint); }

.chip-row{ display:flex; flex-wrap:wrap; gap:10px; margin-bottom:28px; }
.chip{
  display:inline-flex; align-items:center; gap:7px;
  font-family:var(--font-mono); font-size:12.5px; color:var(--text-dim);
  background:var(--panel); border:1px solid var(--border);
  padding:8px 12px; border-radius:8px;
  transition:border-color .2s ease, color .2s ease;
}
.chip:hover, .chip:focus-visible{ border-color:var(--teal-dim); color:var(--text); }
.chip-static{ cursor:default; }

.cta-row{ display:flex; flex-wrap:wrap; gap:12px; }
.btn{
  display:inline-flex; align-items:center; gap:6px;
  font-family:var(--font-body); font-weight:600; font-size:14px;
  padding:12px 20px; border-radius:8px; transition:transform .15s ease, opacity .2s ease;
}
.btn-primary{ background:var(--teal); color:#04140f; }
.btn-primary:hover, .btn-primary:focus-visible{ transform:translateY(-1px); }
.btn-ghost{ border:1px solid var(--border); color:var(--text); }
.btn-ghost:hover, .btn-ghost:focus-visible{ border-color:var(--teal-dim); color:var(--teal); }

/* ---------- FINDING SECTIONS ---------- */
main{ background:var(--bg); }
.finding{
  padding:88px clamp(20px,5vw,56px);
  max-width:1180px; margin:0 auto;
  border-top:1px solid var(--border-soft);
}
.finding-head{ margin-bottom:40px; max-width:680px; }
.finding-code{
  display:block; font-family:var(--font-mono); font-size:12px;
  letter-spacing:0.12em; color:var(--teal); margin-bottom:10px;
}
.finding-title{ font-size:clamp(1.5rem,3.4vw,2.1rem); font-weight:600; margin-bottom:8px; }
.finding-kicker{ color:var(--text-dim); font-size:15px; }

.summary-text{ max-width:760px; color:var(--text-dim); font-size:16.5px; line-height:1.75; }

/* coverage matrix */
.matrix-grid{
  display:grid; grid-template-columns:repeat(3, 1fr); gap:18px;
}
@media (max-width: 980px){ .matrix-grid{ grid-template-columns:repeat(2,1fr); } }
@media (max-width: 640px){ .matrix-grid{ grid-template-columns:1fr; } }
.matrix-panel{
  background:var(--panel); border:1px solid var(--border-soft);
  border-radius:10px; padding:20px;
}
.matrix-panel-head{ display:flex; align-items:baseline; gap:10px; margin-bottom:14px; }
.matrix-id{ font-family:var(--font-mono); color:var(--text-faint); font-size:12px; }
.matrix-panel-head h3{ font-size:15px; font-weight:600; }
.tag-list{ display:flex; flex-wrap:wrap; gap:7px; }
.tag-list li{
  font-family:var(--font-mono); font-size:11.5px; color:var(--text-dim);
  background:var(--panel-2); border:1px solid var(--border-soft);
  padding:5px 9px; border-radius:6px;
}

/* experience log */
.log-entry{
  background:var(--panel); border:1px solid var(--border-soft);
  border-radius:10px; padding:28px clamp(20px,3vw,32px);
}
.log-meta{ display:flex; gap:22px; align-items:flex-start; margin-bottom:20px; flex-wrap:wrap; }
.log-range{
  font-family:var(--font-mono); font-size:12px; color:var(--teal);
  border:1px solid var(--teal-dim); border-radius:6px; padding:5px 10px;
  white-space:nowrap; margin-top:4px;
}
.log-role{ font-size:18px; font-weight:600; margin-bottom:4px; }
.log-company{ color:var(--text-dim); font-size:14px; }
.log-bullets{ display:flex; flex-direction:column; gap:11px; }
.log-bullets li{
  position:relative; padding-left:18px; color:var(--text-dim); font-size:14.5px;
}
.log-bullets li::before{
  content:''; position:absolute; left:0; top:8px; width:6px; height:6px;
  background:var(--teal); border-radius:50%;
}

/* case files */
.case-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
@media (max-width: 980px){ .case-grid{ grid-template-columns:1fr; } }
.case-card{
  background:var(--panel); border:1px solid var(--border-soft);
  border-radius:10px; padding:22px; display:flex; flex-direction:column;
}
.case-id{
  font-family:var(--font-mono); font-size:12px; color:var(--coral);
  letter-spacing:0.06em; margin-bottom:12px;
}
.case-title{ font-size:16px; font-weight:600; margin-bottom:12px; line-height:1.4; }
.case-objective{ color:var(--text-dim); font-size:13.5px; margin-bottom:16px; font-style:italic; }
.case-actions{ display:flex; flex-direction:column; gap:9px; margin-bottom:18px; }
.case-actions li{
  position:relative; padding-left:16px; color:var(--text-dim); font-size:13.5px;
}
.case-actions li::before{
  content:''; position:absolute; left:0; top:7px; width:5px; height:5px;
  background:var(--amber); border-radius:50%;
}
.case-stack{ display:flex; flex-wrap:wrap; gap:6px; margin-top:auto; }
.case-stack span{
  font-family:var(--font-mono); font-size:10.5px; color:var(--text-faint);
  border:1px solid var(--border-soft); padding:4px 8px; border-radius:5px;
}

/* credentials */
.cred-columns{ display:grid; grid-template-columns:1fr 1fr; gap:32px; }
@media (max-width: 760px){ .cred-columns{ grid-template-columns:1fr; } }
.cred-sub{ font-size:14px; color:var(--text-dim); font-weight:500; margin-bottom:16px; text-transform:uppercase; letter-spacing:0.06em; }
.cred-list{ display:flex; flex-direction:column; gap:16px; }
.cred-list li{
  display:flex; flex-direction:column; gap:3px;
  border-left:2px solid var(--teal-dim); padding-left:14px;
}
.cred-name{ font-weight:600; font-size:14.5px; }
.cred-org{ color:var(--text-dim); font-size:13px; }
.cred-range{ font-family:var(--font-mono); font-size:11.5px; color:var(--text-faint); }

/* contact / footer */
.contact{
  background:var(--bg-alt);
  border-top:1px solid var(--border-soft);
  padding:90px clamp(20px,5vw,56px) 32px;
}
.contact-inner{ max-width:680px; margin:0 auto; text-align:center; }
.contact-title{ font-size:clamp(1.8rem,4vw,2.6rem); font-weight:700; margin:10px 0 16px; }
.contact-text{ color:var(--text-dim); font-size:16px; margin-bottom:30px; }
.chip-row-contact{ justify-content:center; }
.footer{
  max-width:1180px; margin:64px auto 0;
  display:flex; justify-content:space-between; align-items:center;
  font-family:var(--font-mono); font-size:11.5px; color:var(--text-faint);
  padding-top:20px; border-top:1px solid var(--border-soft); flex-wrap:wrap; gap:8px;
}
.eof{ color:var(--teal); }
`;
