import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Check,
  Mail,
  Phone,
  Cloud,
  BrainCircuit,
  ShieldCheck,
  Database,
  Smartphone,
  Workflow,
  Sun,
  Moon,
} from "lucide-react";
import "./styles.css";
import "./theme.css";
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
const contactPhone = import.meta.env.VITE_CONTACT_PHONE;
const contactPhoneDisplay = import.meta.env.VITE_CONTACT_PHONE_DISPLAY;
const projects = [
  {
    n: "01",
    name: "The Big POS",
    sector: "Mortgage technology",
    slug: "the-big-pos",
    client: "Mortgage Automation Technologies",
    role: "Senior Full-Stack Engineer",
    galleryCount: 6,
    codeLine: "caseStudy : confidential deployment",
    image: "/projects/zach-big-pos.png",
    copy: "A configurable mortgage point-of-sale platform supporting loan originators, consumers, and thousands of applications each day.",
    detail:
      "The Big POS is an all-in-one point-of-sale platform for the mortgage industry. Zachary helped design and implement a configurable system that keeps loan originators, consumers, and back-office teams aligned throughout the loan process. The product combines streamlined consumer workflows with web portals and native mobile experiences, making it easier to adopt while supporting thousands of mortgage applications each day.",
    result: "2018 - 2024",
    tags: ["React", "React Native", "Kubernetes", "TypeScript", "Node.js"],
  },
  {
    n: "02",
    name: "Autospeed",
    sector: "Automotive systems",
    slug: "autospeed",
    client: "Autospeed",
    role: "Senior Full-Stack Engineer",
    galleryCount: 6,
    codeLine: "https://autospeed.us",
    image: "/projects/zach-autospeed.png",
    copy: "An automotive platform spanning e-commerce, operational workflows, ECU tracking, and Windows tuning software.",
    detail:
      "Autospeed began as a custom e-commerce and service platform for performance automotive products and expanded into a broader operational system for sales, vehicle tracking, software history, and ECU flashing. Zachary also contributed to a Windows tuning application built with C# and WPF, plus a C++ module communicating with vehicle OBD-II systems over the J2534 protocol.",
    result: "2010 - Present",
    tags: [
      "Node.js",
      "Restify",
      "React",
      "Python",
      "Heroku",
      "C#",
      "WPF",
      "C++",
      "OBD-II",
      "J2534",
    ],
  },
  {
    n: "03",
    name: "Outgrow AI Platform",
    sector: "AI SaaS",
    slug: "outgrow-ai-platform",
    client: "Outgrow",
    role: "Full-Stack Engineer",
    galleryCount: 3,
    codeLine: "caseStudy : confidential deployment",
    image: "/projects/zach-outgrow.png",
    copy: "An AI chatbot and calculator platform with real-time LLM streaming, responsive interfaces, and live preview workflows.",
    detail:
      "This AI SaaS platform was built from the ground up for custom chatbot and calculator creation. Zachary translated high-fidelity product designs into a responsive frontend and engineered complex state management around live previews. GPT-4 and Claude streams were integrated directly into the experience, enabling real-time conversational workflows that automated support and improved conversion.",
    result: "22% conversion lift",
    tags: [
      "AI Chatbot",
      "Next.js",
      "Node.js",
      "Full-Stack Development",
      "AWS",
      "GPT-4",
      "Claude",
    ],
  },
  {
    n: "04",
    name: "Global Booking & Rental",
    sector: "Digital marketplace",
    slug: "global-booking-rental-platform",
    client: "Sailo",
    role: "Full-Stack Engineer",
    galleryCount: 2,
    codeLine: "caseStudy : confidential deployment",
    image: "/projects/zach-sailo.png",
    copy: "A responsive boat-rental marketplace with global geolocation search, resilient booking flows, and secure payments.",
    detail:
      "Zachary developed a mobile-responsive peer-to-peer boat rental marketplace focused on conversion across discovery, booking, and checkout. The work included resilient backend booking workflows, secure payment integrations, optimized database queries for global geolocation search, and owner dashboards for managing availability and rental operations.",
    result: "Global marketplace",
    tags: [
      "Full-Stack Development",
      "REST API",
      "Python",
      "Django",
      "TypeScript",
      "Secure Payments",
      "Geolocation Search",
    ],
  },
  {
    n: "05",
    name: "OCOV",
    sector: "Civic technology",
    slug: "ocov",
    client: "OCOV",
    role: "Senior Full-Stack Engineer",
    galleryCount: 3,
    codeLine: "https://ocov.us",
    image: "/projects/zach-ocov.png",
    copy: "A mobile-first polling, voting, content, and live-debate platform built for politically engaged communities.",
    detail:
      "OCOV was conceived as a social platform where people could vote on current political issues, share viewpoints in live debates, and follow new events through an integrated content experience. Zachary built the application as a mobile-first product, balancing participation, voting flows, topical content, and public discussion in one cohesive system.",
    result: "Mobile-first",
    tags: [
      "Node.js",
      "REST APIs",
      "Mobile-First Web App",
      "Polling Platform",
      "Debate Workflows",
      "Editorial Content",
    ],
  },
  {
    n: "06",
    name: "Gormat",
    sector: "Cybersecurity",
    slug: "gormat-marketing-site",
    client: "Gormat",
    role: "Lead Front-End Engineer",
    galleryCount: 4,
    codeLine: "caseStudy : confidential deployment",
    image: "/projects/zach-gormat.png",
    copy: "A custom React marketing website that communicates complex cybersecurity and engineering capabilities with clarity.",
    detail:
      "A cybersecurity solutions company needed a custom marketing site that clearly presented its services without relying on a generic template. Zachary led the front-end implementation using React and TypeScript, then deployed the site to Amazon Lightsail for reliable, cost-conscious hosting and straightforward ongoing operation.",
    result: "Lead front-end",
    tags: ["React", "TypeScript", "AWS Lightsail"],
  },
];
const skills = [
  [
    "01",
    "Enterprise architecture",
    "Design dependable web, mobile, SaaS, and cloud systems that can evolve with the business.",
    ["System design", "Microservices & APIs"],
  ],
  [
    "02",
    "Product engineering",
    "Turn complex requirements into intuitive experiences and production-ready software.",
    ["React & TypeScript", "Node.js & data"],
  ],
  [
    "03",
    "Cloud & AI delivery",
    "Build secure AWS foundations, AI workflows, and release systems teams can confidently operate.",
    ["AWS architecture", "LLMs & CI/CD"],
  ],
];
function Header() {
  const [open, setOpen] = useState(false),
    [active, setActive] = useState(""),
    [progress, setProgress] = useState(0),
    [scrolled, setScrolled] = useState(false),
    [theme, setTheme] = useState(
      () => localStorage.getItem("eas-theme") || "dark",
    );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("eas-theme", theme);
    document.querySelector('meta[name="theme-color"]').content =
      theme === "dark" ? "#0d1524" : "#f5f0e7";
  }, [theme]);
  useEffect(() => {
    let update = () => {
      let max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max ? (scrollY / max) * 100 : 0);
      setScrolled(scrollY > 12);
    };
    addEventListener("scroll", update, { passive: true });
    update();
    let sections = ["services", "work", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    let observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55%" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => {
      removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);
  let nav = (id) => (active === id ? "active" : "");
  return (
    <>
      <div
        className="theme-switch floating-theme"
        role="group"
        aria-label="Color theme"
      >
        <button
          className={theme === "light" ? "selected" : ""}
          onClick={() => setTheme("light")}
          aria-label="Use light mode"
          aria-pressed={theme === "light"}
        >
          <Sun />
        </button>
        <button
          className={theme === "dark" ? "selected" : ""}
          onClick={() => setTheme("dark")}
          aria-label="Use dark mode"
          aria-pressed={theme === "dark"}
        >
          <Moon />
        </button>
      </div>
      <header className={scrolled ? "scrolled" : ""}>
        <div className="progress" style={{ width: progress + "%" }} />
        <div className="nav-wrap">
          <a href="/#top" className="brand" onClick={() => setOpen(false)}>
            <img src="/eas.svg" alt="EAS" />
          </a>
          <nav className={open ? "open" : ""}>
            <a onClick={() => setOpen(false)} href="/">
              Home
            </a>
            <a
              className="nav-cta"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Start a conversation <ArrowRight />
            </a>
          </nav>
          <button
            className="menu"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
function ProjectDetail({ project }) {
  const [projectTheme, setProjectTheme] = useState(
    () => localStorage.getItem("eas-project-theme") || "light",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = projectTheme;
    localStorage.setItem("eas-project-theme", projectTheme);
    document.querySelector('meta[name="theme-color"]').content =
      projectTheme === "dark" ? "#0d1524" : "#f5f0e7";
  }, [projectTheme]);
  const projectThemeControl = (
    <div
      className="theme-switch floating-theme"
      role="group"
      aria-label="Color theme"
    >
      <button
        className={projectTheme === "light" ? "selected" : ""}
        onClick={() => setProjectTheme("light")}
        aria-label="Use light mode"
        aria-pressed={projectTheme === "light"}
      >
        <Sun />
      </button>
      <button
        className={projectTheme === "dark" ? "selected" : ""}
        onClick={() => setProjectTheme("dark")}
        aria-label="Use dark mode"
        aria-pressed={projectTheme === "dark"}
      >
        <Moon />
      </button>
    </div>
  );
  if (!project) {
    return (
      <>
        {projectThemeControl}
        <main className="project-detail project-not-found" id="top">
          <div className="shell">
            <span className="eyebrow">Project not found</span>
            <h1>This project page does not exist.</h1>
            <a className="primary" href="/#work">
              Return to selected work <ArrowRight />
            </a>
          </div>
        </main>
      </>
    );
  }
  const gallery = Array.from(
    { length: project.galleryCount },
    (_, index) => `/projects/${project.slug}-${index + 2}.png`,
  );
  return (
    <>
      {projectThemeControl}
      <main className="project-detail reference-project" id="top">
        <nav className="reference-nav" aria-label="Project navigation">
          <a href="/">Home</a>
          <a className="reference-nav-cta" href="/contact">
            Start a conversation <ArrowUpRight />
          </a>
        </nav>
        <div className="project-page-shell">
          <section className="reference-project-hero">
            <div className="reference-project-intro">
              <a
                href="/"
                className="reference-project-logo"
                aria-label="Portfolio home"
              >
                <img src="/eas.svg" alt="Elemental App Studio" />
              </a>
              <div className="project-role">&lt; {project.role} / &gt;</div>
              <h1>{project.name}</h1>
              <a className="project-back" href="/#work">
                <ArrowRight /> Explore Projects
              </a>
            </div>
            <div className="reference-cover">
              <img src={project.image} alt={project.name} />
            </div>
          </section>
          <section className="reference-project-body">
            <aside className="reference-details">
              <h2>Details</h2>
              <dl>
                <dt>Client</dt>
                <dd>{project.client}</dd>
                <dt>Role</dt>
                <dd>{project.role}</dd>
                <dt>Skill Sets</dt>
                <dd className="project-stack">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </dd>
                <dt>Timeline</dt>
                <dd>{project.result}</dd>
              </dl>
            </aside>
            <article className="reference-story">
              <div className="reference-code">
                <span className="code-prefix">//</span>
                <span className="code-value">
                  {project.codeLine.startsWith("https://") ? (
                    <>
                      <b>https://</b>
                      <em>{project.codeLine.replace("https://", "")}</em>
                    </>
                  ) : (
                    project.codeLine
                  )}
                </span>
              </div>
              <h2>{project.copy}</h2>
              <p>{project.detail}</p>
              <div className="reference-gallery">
                {gallery.map((image, index) => (
                  <figure key={image} className="reveal">
                    <img
                      src={image}
                      alt={`${project.name} project view ${index + 2}`}
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
              <p className="reference-deliverables">
                Skills and deliverables included {project.tags.join(", ")}.
              </p>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}
function ContactPage() {
  return (
    <>
      <Header />
      <main className="conversation-page" id="top">
        <section className="conversation-hero">
          <div className="shell conversation-shell">
            <h1 className="contact-page-title">Contact</h1>
            <div className="conversation-grid">
              <figure className="contact-profile">
                <div className="contact-photo">
                  <img src="/Zachary-contact.png" alt="Zachary Rosenberg" />
                </div>
                <figcaption>Principal Software Architect</figcaption>
              </figure>
              <div className="conversation-intro">
                <h2>
                  Let&apos;s build something <span className="title-accent">great together</span>
                </h2>
                <p>
                  Have a project in mind? Whether you&apos;re launching a new
                  application, modernizing your technology stack, or bringing a
                  custom idea to life, I can help shape a scalable,
                  maintainable, results-driven solution.
                </p>
                <p>
                  Send me a note about your goals and the challenge in front of
                  you. I&apos;d be glad to discuss the practical next step.
                </p>
                <div className="contact-methods">
                  <div className="conversation-direct">
                    <span>Email</span>
                    <a href={`mailto:${contactEmail}`}>
                      <Mail /> {contactEmail}
                    </a>
                  </div>
                  <div className="conversation-direct">
                    <span>Phone</span>
                    <a href={`tel:${contactPhone}`}>
                      <Phone /> {contactPhoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
function App() {
  useEffect(() => {
    let items = document.querySelectorAll(".reveal");
    let observer = new IntersectionObserver(
      (es) =>
        es.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible"),
        ),
      { threshold: 0.12 },
    );
    items.forEach((x) => observer.observe(x));
    return () => observer.disconnect();
  }, []);
  const projectSlug = window.location.pathname.match(
    /^\/projects\/([^/]+)\/?$/,
  )?.[1];
  if (window.location.pathname.startsWith("/projects/")) {
    return (
      <ProjectDetail project={projects.find((p) => p.slug === projectSlug)} />
    );
  }
  if (
    window.location.pathname === "/contact" ||
    window.location.pathname === "/contact/"
  ) {
    return <ContactPage />;
  }
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                Zachary Rosenberg · Principal Software Architect
              </div>
              <h1>
                Turn <em>complex</em> systems into useful <em>software</em>
              </h1>
              <p>
                I help organizations design, build, and operate reliable
                enterprise platforms, cloud products, and AI-powered
                experiences.
              </p>
              <div className="hero-actions">
                <a className="primary" href="#work">
                  Explore selected work <ArrowRight />
                </a>
                <a
                  className="text-link"
                  href="/Zachary-Rosenberg-Resume.pdf"
                  target="_blank"
                >
                  View résumé <ArrowUpRight />
                </a>
              </div>
              <small>
                No pitch deck required. Start with the problem you need to
                solve.
              </small>
            </div>
          </div>
        </section>
        <section className="principles">
          <div className="shell principle-grid">
            {[
              [
                "01",
                "Senior-led delivery",
                "Work directly with the architect shaping strategy, experience, and engineering.",
              ],
              [
                "02",
                "From question to production",
                "Connect business decisions with the systems required to deliver them.",
              ],
              [
                "03",
                "Built for real constraints",
                "Reliable software for the workflows, data, security, and teams you already have.",
              ],
            ].map((x) => (
              <article key={x[0]}>
                <span>{x[0]}</span>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section mist" id="services">
          <div className="shell">
            <div className="section-intro reveal">
              <div>
                <span className="eyebrow">Where I help</span>
                <h2>
                  Move past the <span className="title-accent">technology backlog</span>
                </h2>
              </div>
              <p>
                The hard part is not finding another technology. It is choosing
                the right leverage point, building with care, and creating the
                conditions for the system to keep improving.
              </p>
            </div>
            <div className="opportunities reveal">
              {[
                "A platform that needs to scale without adding fragility",
                "A workflow ready for better automation and intelligence",
                "A cloud estate that costs too much or moves too slowly",
                "A product idea that needs a safe path to production",
              ].map((x) => (
                <div key={x}>
                  <span>→</span>
                  {x}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section ink" id="expertise">
          <div className="shell">
            <div className="section-intro light reveal">
              <div>
                <span className="eyebrow">What I do</span>
                <h2>
                  Close enough to understand. {" "}
                  <span className="title-accent">Experienced enough to ship</span>
                </h2>
              </div>
            </div>
            <div className="service-grid">
              {skills.map((x) => (
                <article className="reveal" key={x[0]}>
                  <span>{x[0]}</span>
                  <h3>{x[1]}</h3>
                  <p>{x[2]}</p>
                  <ul>
                    {x[3].map((y) => (
                      <li key={y}>
                        <Check />
                        {y}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section process">
          <div className="shell">
            <div className="section-intro reveal">
              <div>
                <span className="eyebrow">How I work</span>
                <h2>
                  A clear route from complexity to a {" "}
                  <span className="title-accent">system your team can own</span>
                </h2>
              </div>
              <a className="text-link" href={`mailto:${contactEmail}`}>
                Work with Zachary <ArrowUpRight />
              </a>
            </div>
            <div className="process-grid">
              {[
                [
                  "01",
                  "Listen",
                  "Start with the user, business question, current system, and real constraints.",
                ],
                [
                  "02",
                  "Focus",
                  "Define the smallest valuable release and the architecture that supports it.",
                ],
                [
                  "03",
                  "Build",
                  "Work closely with the team to make the product useful, secure, and production-ready.",
                ],
                [
                  "04",
                  "Improve",
                  "Measure what matters, share the learning, and leave a system the team can operate.",
                ],
              ].map((x) => (
                <article className="reveal" key={x[0]}>
                  <span>{x[0]}</span>
                  <h3>{x[1]}</h3>
                  <p>{x[2]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section work mist" id="work">
          <div className="shell">
            <div className="section-intro reveal">
              <div>
                <span className="eyebrow">Selected work</span>
                <h2>
                  A closer look at systems {" "}
                  <span className="title-accent">built for the real world</span>
                </h2>
              </div>
              <p>
                Selected platforms across mortgage technology, automotive
                systems, applied AI, digital marketplaces, civic tech, and
                cybersecurity.
              </p>
            </div>
            <div className="project-grid">
              {projects.map((p) => (
                <a
                  href={`/projects/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card reveal"
                  key={p.name}
                >
                  <div className="project-image">
                    <img src={p.image} alt={`${p.name} public website`} />
                    <span>
                      View project <ArrowUpRight />
                    </span>
                  </div>
                  <div className="project-meta">
                    <span>{p.n}</span>
                    <small>{p.sector}</small>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.copy}</p>
                  <div className="result">
                    <b>{p.result}</b>
                    {p.tags.map((t) => (
                      <i key={t}>{t}</i>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="shell footer-grid">
          <div>
            <img src="/eas.svg" alt="EAS" />
            <p>Custom software solutions built with clarity and care.</p>
          </div>
          <nav>
            <a href="/">Home</a>
            <a href="/contact">Start a conversation</a>
            <a href="https://linkedin.com/in/zachary-rosenberg">LinkedIn ↗</a>
          </nav>
          <small>© {new Date().getFullYear()} Elemental App Studio</small>
        </div>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
