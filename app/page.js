"use client";

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  // Cinematic Intro loading state
  const [loading, setLoading] = useState(true);
  const [introFade, setIntroFade] = useState(false);

  // Mobile navigation state
  const [navActive, setNavActive] = useState(false);

  // Active section for navbar highlights
  const [activeSection, setActiveSection] = useState('home');

  // Projects filtering state
  const [projectFilter, setProjectFilter] = useState('all');

  // Contact form submission states
  const [formState, setFormState] = useState({ name: '', phone: '', telegram: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: null, error: null });

  // Refs for animations
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  const [skillsVisible, setSkillsVisible] = useState(false);
  const [roadmapVisible, setRoadmapVisible] = useState(false);

  // 1. Handle Cinematic Intro Overlay
  useEffect(() => {
    document.body.classList.add('loading');
    const fadeTimeout = setTimeout(() => {
      setIntroFade(true);
      document.body.classList.remove('loading');
      
      const removeTimeout = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(removeTimeout);
    }, 2500);

    return () => clearTimeout(fadeTimeout);
  }, []);

  // 2. Active Section on Scroll & Reveal Animations
  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          setActiveSection(id);
          
          // Trigger scroll reveal class
          entry.target.classList.add('revealed');
          
          if (id === 'skills') {
            setSkillsVisible(true);
          }
          if (id === 'about') {
            setRoadmapVisible(true);
          }
        }
      });
    };

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "-80px 0px 0px 0px" // Header offset
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);
    
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // 3. Handle Form Submit
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({ loading: false, success: 'እቅድዎ በተሳካ ሁኔታ ተልኳል! በቅርቡ በቴሌግራም አነጋግርዎታለሁ።', error: null });
        setFormState({ name: '', phone: '', telegram: '', message: '' });
      } else {
        setSubmitStatus({ 
          loading: false, 
          success: null, 
          error: data.error || 'መልዕክት መላክ አልተቻለም። እባክዎ እንደገና ይሞክሩ።' 
        });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({ loading: false, success: null, error: 'የኔትወርክ ስህተት አጋጥሟል። እባክዎ ይሞክሩ።' });
    }
  };

  // Projects list matching original index.html content
  const projects = [
    {
      id: 1,
      category: 'bots',
      title: 'Negedras Bot',
      image: '/enqopazyon_logo.jpg', // Using the beautiful 3D logo as project placeholders if needed, or keeping original structure
      tag: 'Bot Development',
      desc: 'A fully automated Telegram e-commerce bot built for selling and distributing books, featuring local payment gateway verification, shopping cart system, and real-time delivery alerts.',
      metric: '🚀 Live on Telegram: @thenegedrasbot',
      tech: ['Node.js', 'Telegraf', 'MongoDB', 'Telegram API'],
      link: 'https://t.me/thenegedrasbot'
    },
    {
      id: 2,
      category: 'apps',
      title: 'Gebeta Delivery',
      image: '/enqopazyon_logo.jpg',
      tag: 'App Development',
      desc: 'A high-performance food and grocery delivery mobile application serving thousands of users with real-time driver tracking and smart routing.',
      metric: '📱 10k+ Downloads',
      tech: ['Flutter', 'Dart', 'Google Maps API', 'Node.js'],
      link: '#'
    },
    {
      id: 3,
      category: 'fullstack',
      title: 'Sheger Commerce',
      image: '/enqopazyon_logo.jpg',
      tag: 'Full-Stack Web',
      desc: 'A premium e-commerce portal integrated with Telebirr & Chapa payment gateways, automated inventory dashboards, and Telegram order alerts.',
      metric: '💰 $120k+ Processed Volume',
      tech: ['Javascript', 'PostgreSQL', 'Express', 'Chapa API'],
      link: '#'
    },
    {
      id: 4,
      category: 'bots',
      title: 'EthioBot Creator',
      image: '/enqopazyon_logo.jpg',
      tag: 'Bot Development',
      desc: 'A visual no-code bot construction software letting non-technical users build logic trees, auto-replies, and customer database collections on Telegram.',
      metric: '🤖 5,000+ Bots Generated',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      link: '#'
    },
    {
      id: 5,
      category: 'fullstack',
      title: 'Adugna Finance',
      image: '/enqopazyon_logo.jpg',
      tag: 'Full-Stack Web',
      desc: 'A premium dark-themed wealth tracking dashboard with automatic transaction alerts, budgeting tools, and secure banking-grade data pipelines.',
      metric: '📈 2,500+ Active Accounts',
      tech: ['Django', 'Python', 'PostgreSQL', 'Chart.js'],
      link: '#'
    }
  ];

  return (
    <>
      {/* Cinematic Intro Overlay */}
      {loading && (
        <div className={`intro-overlay ${introFade ? 'fade-out' : ''}`} id="introOverlay">
          <div className="intro-content">
            <div className="intro-code">// Initializing ENQOPAZYON system...</div>
            <div className="intro-logo-container">
              <img src="/enqopazyon_logo.jpg" alt="ENQOPAZYON Logo" className="intro-logo-img" />
              <div className="intro-logo" id="introLogo">ENQOPAZYON</div>
            </div>
            <div className="intro-loader">
              <div className="intro-loader-progress"></div>
            </div>
          </div>
        </div>
      )}

      {/* Glow Orbs */}
      <div className="glow-orb glow-orb-cyan"></div>
      <div className="glow-orb glow-orb-purple"></div>

      {/* Header / Navbar */}
      <header>
        <div className="container nav-container">
          <a href="#" className="logo">
            <img src="/enqopazyon_logo.jpg" alt="ENQOPAZYON Logo" className="logo-img" />
            ENQOPAZYON <span>{`{ dev }`}</span>
          </a>
          
          <button 
            className={`nav-toggle ${navActive ? 'active' : ''}`} 
            id="navToggle" 
            aria-label="Toggle Navigation"
            onClick={() => setNavActive(!navActive)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${navActive ? 'active' : ''}`} id="navLinks">
            <li>
              <a 
                href="#home" 
                className={activeSection === 'home' ? 'active' : ''}
                onClick={() => setNavActive(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={activeSection === 'about' ? 'active' : ''}
                onClick={() => setNavActive(false)}
              >
                Roadmap
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={activeSection === 'skills' ? 'active' : ''}
                onClick={() => setNavActive(false)}
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={() => setNavActive(false)}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={() => setNavActive(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" ref={sectionRefs.home}>
          <div className="container hero-wrapper">
            <div className="hero-content">
              <div className="hero-tag">Active & Open for Projects</div>
              <h1 className="hero-name">Hi, I am <br /><span>ABEMELEK SOLOMON</span></h1>
              <h2 className="hero-role">Full-Stack, Bot & App Developer (Melek)</h2>
              <p className="hero-hook">
                I build next-generation web platforms, automated intelligent bots, and high-performance cross-platform mobile applications. I turn complex logic into clean, user-friendly digital products.
              </p>
              <div className="hero-ctas">
                <a href="#contact" className="btn btn-primary">
                  Get In Touch
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </a>
                <a href="#projects" className="btn btn-secondary">View Work</a>
              </div>
            </div>

            {/* Profile Image Widget */}
            <div className="hero-image-container">
              <div className="hero-image-glow"></div>
              <img 
                src="/mypic-removebg-preview.png" 
                alt="Abemelek Solomon Profile Image" 
                className="hero-profile-img" 
              />
            </div>
          </div>
        </section>

        {/* About & Roadmap Section */}
        <section id="about" ref={sectionRefs.about} className="reveal-on-scroll">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Who I Am</span>
              <h2 className="section-title">About <span>Me</span></h2>
            </div>

            <div className="about-grid">
              <div className="about-bio glass-card">
                <h3>My Story</h3>
                <p>
                  I am a passionate, self-taught Full-Stack Developer specializing in building high-performance applications and intelligent automation systems. My journey into programming began in <strong>2023</strong>. Powered by curiosity, I leveraged online resources like YouTube, interactive developer portals, and documentation to master the fundamentals of software engineering.
                </p>
                <p style={{ marginTop: '16px' }}>
                  I turn complex ideas into functional, clean, and interactive digital products. I believe in continuous learning and constant experimentation to stay ahead of the technology curve.
                </p>
              </div>

              <div className="about-focus glass-card">
                <h3>Core Focus & AI Automation</h3>
                <p>
                  What drives me most is building tools that save time and automate workflows. I specialize in <strong>AI Automation & Orchestration</strong>—integrating Large Language Models, crafting autonomous agents, and orchestrating scraping pipelines.
                </p>
                <div className="about-features">
                  <div className="about-feature">
                    <span className="feature-icon">🤖</span>
                    <div>
                      <h4>AI & Bot Automation</h4>
                      <p>Crafting automated workflows, Telegram/Discord chatbots, and integrating LLMs.</p>
                    </div>
                  </div>
                  <div className="about-feature">
                    <span className="feature-icon">⚡</span>
                    <div>
                      <h4>Self-Taught & Adaptable</h4>
                      <p>Able to learn new frameworks quickly through documentation and technical communities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Roadmap Subtitle */}
            <div className="roadmap-header">
              <h3 className="roadmap-subtitle">My Development Roadmap</h3>
            </div>

            <div className="roadmap-container">
              <div className="roadmap-line"></div>

              {/* Milestone 1: 2023 */}
              <div className={`roadmap-item ${roadmapVisible ? 'visible' : ''}`}>
                <div className="roadmap-dot"></div>
                <span className="roadmap-badge">2023</span>
                <div className="roadmap-card">
                  <h3>The Spark & Self-Learning</h3>
                  <p>Began my voyage using YouTube and developer websites. Learned HTML/CSS, JavaScript, and Python. Fell in love with automating simple routines and scripting helper bots.</p>
                </div>
              </div>

              {/* Milestone 2: 2024 */}
              <div className={`roadmap-item ${roadmapVisible ? 'visible' : ''}`}>
                <div className="roadmap-dot"></div>
                <span className="roadmap-badge">2024</span>
                <div className="roadmap-card">
                  <h3>Full-Stack & Bot Ecosystems</h3>
                  <p>Expanded into Node.js, Express, and databases (PostgreSQL, MongoDB). Built advanced Telegram bots featuring payment checks and user tracking dashboards.</p>
                </div>
              </div>

              {/* Milestone 3: 2025 */}
              <div className={`roadmap-item ${roadmapVisible ? 'visible' : ''}`}>
                <div className="roadmap-dot"></div>
                <span className="roadmap-badge">2025 - Present</span>
                <div className="roadmap-card">
                  <h3>AI Orchestration & Mobile Apps</h3>
                  <p>Focusing on AI automation workflows (LangChain, OpenAI API), web scraping at scale, and cross-platform mobile apps with Flutter.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={sectionRefs.skills} className="reveal-on-scroll">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Capabilities</span>
              <h2 className="section-title">My Technical <span>Stack</span></h2>
            </div>

            <div className="skills-grid glass-card">
              {/* Column 1 */}
              <div className="skills-category">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  Full-Stack Web
                </h3>
                <div className="skill-list">
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">Frontend (HTML5, CSS3, JS)</span><span className="skill-percentage">95%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '95%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">Node.js / Express</span><span className="skill-percentage">90%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '90%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">Python / Django</span><span className="skill-percentage">80%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '80%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">Databases (PostgreSQL, Mongo)</span><span className="skill-percentage">85%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '85%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="skills-category">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  Bot Development
                </h3>
                <div className="skill-list">
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">Telegram Bot API (Telegraf)</span><span className="skill-percentage">98%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '98%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">Discord.js & Bot APIs</span><span className="skill-percentage">85%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '85%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">Automation & Scraping</span><span className="skill-percentage">90%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '90%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">AI Orchestration (LangChain)</span><span className="skill-percentage">75%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '75%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3 */}
              <div className="skills-category">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                  App Development
                </h3>
                <div className="skill-list">
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">Flutter & Dart</span><span className="skill-percentage">90%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '90%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">React Native</span><span className="skill-percentage">80%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '80%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">Desktop (Electron / Tauri)</span><span className="skill-percentage">75%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '75%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info"><span className="skill-name">State Management</span><span className="skill-percentage">85%</span></div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skillsVisible ? '85%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={sectionRefs.projects} className="reveal-on-scroll">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Featured Works</span>
              <h2 className="section-title">Selected <span>Projects</span></h2>
            </div>

            <div className="projects-filter">
              <button 
                className={`filter-btn ${projectFilter === 'all' ? 'active' : ''}`}
                onClick={() => setProjectFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${projectFilter === 'fullstack' ? 'active' : ''}`}
                onClick={() => setProjectFilter('fullstack')}
              >
                Full-Stack
              </button>
              <button 
                className={`filter-btn ${projectFilter === 'bots' ? 'active' : ''}`}
                onClick={() => setProjectFilter('bots')}
              >
                Bots
              </button>
              <button 
                className={`filter-btn ${projectFilter === 'apps' ? 'active' : ''}`}
                onClick={() => setProjectFilter('apps')}
              >
                Apps
              </button>
            </div>

            <div className="projects-grid">
              {projects.map(project => {
                const isHidden = projectFilter !== 'all' && project.category !== projectFilter;
                return (
                  <div 
                    key={project.id} 
                    className={`project-card glass-card ${isHidden ? 'hidden' : ''}`}
                  >
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-content">
                      <span className="project-tag">{project.tag}</span>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-desc">{project.desc}</p>
                      <div className="project-metrics">{project.metric}</div>
                      <div className="project-tech">
                        {project.tech.map((t, idx) => (
                          <span key={idx} className="tech-badge">{t}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                          Open Link
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={sectionRefs.contact} className="reveal-on-scroll">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Let's Connect</span>
              <h2 className="section-title">Start a <span>Project</span></h2>
            </div>

            <div className="contact-wrapper">
              <div className="contact-info">
                <div>
                  <h3>Let's build something epic!</h3>
                  <p>Have an idea for a web app, a mobile app, or need a powerful automated bot system? Drop me a message and let's bring it to life.</p>
                </div>

                <div className="contact-methods">
                  {/* Telegram */}
                  <div className="contact-method">
                    <div className="contact-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.13 2.82a2.52 2.52 0 0 0-2.45-.14L2.83 9.87a1.64 1.64 0 0 0-.11 3l4.7 1.93 1.93 4.7a1.63 1.63 0 0 0 3-.11l7.19-15.85a2.52 2.52 0 0 0-.14-2.45z"></path></svg>
                    </div>
                    <div className="contact-detail">
                      <span>Telegram</span>
                      <a href="https://t.me/Enqopazyon9" target="_blank" rel="noopener noreferrer">@Enqopazyon9</a>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="contact-method">
                    <div className="contact-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div className="contact-detail">
                      <span>Email</span>
                      <a href="mailto:enqopazyon@gmail.com">enqopazyon@gmail.com</a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="contact-method">
                    <div className="contact-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div className="contact-detail">
                      <span>Location</span>
                      <p>Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                </div>

                <div className="social-links">
                  <a href="#" className="social-icon" aria-label="GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>
                  <a href="#" className="social-icon" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </div>
              </div>

              {/* Updated Contact Form */}
              <form className="contact-form glass-card" id="contactForm" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="form-input" 
                    placeholder="Enter your name" 
                    required 
                    value={formState.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="form-input" 
                    placeholder="Enter your phone number (e.g. +251...)" 
                    required 
                    value={formState.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telegram">Telegram Username</label>
                  <input 
                    type="text" 
                    id="telegram" 
                    className="form-input" 
                    placeholder="Enter your username (e.g. @username)" 
                    required 
                    value={formState.telegram}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Project Brief / Message</label>
                  <textarea 
                    id="message" 
                    className="form-input" 
                    placeholder="What are we building? (Optional)" 
                    value={formState.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={submitStatus.loading}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {submitStatus.loading ? 'Sending...' : 'Send to Telegram'}
                  {!submitStatus.loading && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus.success && (
                  <div style={{ marginTop: '16px', color: '#39ff14', fontSize: '14px', fontWeight: '500' }}>
                    {submitStatus.success}
                  </div>
                )}
                {submitStatus.error && (
                  <div style={{ marginTop: '16px', color: '#ff5f56', fontSize: '14px', fontWeight: '500' }}>
                    {submitStatus.error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <div className="footer-logo">
            <img src="/enqopazyon_logo.jpg" alt="ENQOPAZYON Logo" className="footer-logo-img" />
            ENQOPAZYON
          </div>
          <div className="footer-text">© 2026 ሜሌክ ENQOPAZYON. Handcrafted with precision in Addis Ababa.</div>
        </div>
      </footer>
    </>
  );
}
