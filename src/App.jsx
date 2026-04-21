import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import './App.css'

const skillsData = {
  core: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS'],
  frameworks: ['Angular', 'React', 'Node.js', 'Express'],
  css: ['Tailwind CSS', 'SCSS', 'Material UI', 'Bootstrap'],
  databases: ['PostgreSQL', 'MongoDB', 'MySQL'],
  backend: ['REST APIs', 'GraphQL', 'Authentication', 'JWT'],
  versionControl: ['Git', 'GitHub', 'GitLab'],
  specialized: ['WebGL', 'Three.js', 'AI/ML Integration']
}

const projectsData = [
  {
    title: 'Agentic AI Admin',
    description: 'AI-powered admin dashboard with intelligent automation',
    tech: ['Angular', 'Tailwind', 'Python'],
    image: 'https://waglesathwik.onrender.com/assets/card8.avif',
    visitUrl: 'https://conversation-admin-dev.buckleconsult.com/',
    sourceUrl: null
  },
  {
    title: 'Realtime AI Interview',
    description: 'Real-time AI-driven interview platform with live feedback',
    tech: ['React', 'Tailwind', 'Livekit', 'Python'],
    image: 'https://waglesathwik.onrender.com/assets/card0.avif',
    visitUrl: 'https://authenx.pangaeax.com/',
    sourceUrl: null
  },
  {
    title: 'Business Dashboard',
    description: 'Comprehensive business analytics dashboard',
    tech: ['Angular', 'Tailwind', 'Python'],
    image: 'https://waglesathwik.onrender.com/assets/card5.avif',
    visitUrl: 'https://conversation.buckleconsult.com/',
    sourceUrl: null
  },
  {
    title: 'Amazon CTDI',
    description: 'Amazon CTDI project with EJS templates',
    tech: ['Angular', 'EJS'],
    image: 'https://waglesathwik.onrender.com/assets/card4.avif',
    visitUrl: 'https://amazonoow.ctdi.co.in/',
    sourceUrl: null
  },
  {
    title: 'Voice AI Playground',
    description: 'Interactive voice AI experimentation platform',
    tech: ['Angular', 'Tailwind', 'Python'],
    image: 'https://waglesathwik.onrender.com/assets/card7.avif',
    visitUrl: 'https://playground.heykoala.ai/',
    sourceUrl: null
  },
  {
    title: 'KnowYourCgpa',
    description: 'CGPA calculation and tracking system',
    tech: ['Node', 'EJS', 'Express'],
    image: 'https://waglesathwik.onrender.com/assets/card1.avif',
    visitUrl: 'https://knowyourcgpa.onrender.com',
    sourceUrl: 'https://github.com/sathwik-14/KNOW_YOUR_CGPA'
  },
  {
    title: 'Product Landing Page',
    description: 'Apple Watch Ultra landing page clone',
    tech: ['HTML', 'CSS', 'JS'],
    image: 'https://waglesathwik.onrender.com/assets/card6.avif',
    visitUrl: 'https://waglesathwik-applewatchultra.onrender.com/',
    sourceUrl: 'https://github.com/sathwik-14/apple-watch-website-clone'
  },
  {
    title: 'Netflix Landing Page Clone',
    description: 'Netflix landing page clone using TMDB API',
    image: 'https://waglesathwik.onrender.com/assets/card2.avif',
    tech: ['React', 'TMDB'],
    visitUrl: 'https://netflixky.netlify.app/',
    sourceUrl: 'https://github.com/sathwik-14/netflix-clone'
  }
]

const floatingShapes = [
  { size: 120, x: '10%', y: '20%', delay: 0, duration: 20 },
  { size: 80, x: '85%', y: '30%', delay: 2, duration: 25 },
  { size: 200, x: '75%', y: '70%', delay: 1, duration: 30 },
  { size: 60, x: '20%', y: '80%', delay: 3, duration: 22 },
  { size: 150, x: '5%', y: '50%', delay: 4, duration: 28 },
]

function Particle({ index }) {
  const randomX = Math.random() * 100
  const randomDelay = Math.random() * 5
  const randomDuration = 15 + Math.random() * 10
  
  return (
    <motion.div
      className="particle"
      initial={{ opacity: 0, y: '100vh' }}
      animate={{
        opacity: [0, 0.6, 0],
        y: ['100vh', '-100px'],
        x: [`${randomX}vw`, `${randomX + (Math.random() - 0.5) * 20}vw`]
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{
        left: `${randomX}%`,
        width: Math.random() * 3 + 1,
        height: Math.random() * 3 + 1,
      }}
    />
  )
}

function FloatingShape({ size, x, y, delay, duration }) {
  return (
    <motion.div
      className="floating-shape"
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [email, setEmail] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursorHovering, setCursorHovering] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert(`Thanks for subscribing with: ${email}`)
    setEmail('')
  }

  return (
    <div className="app" ref={containerRef}>
      <div className="custom-cursor">
        <motion.div 
          className="cursor-dot"
          animate={{ left: cursorPos.x, top: cursorPos.y }}
          transition={{ type: "tween", duration: 0 }}
        />
        <motion.div 
          className="cursor-ring"
          animate={{ 
            left: cursorPos.x, 
            top: cursorPos.y,
            scale: cursorHovering ? 2.5 : 1,
            backgroundColor: cursorHovering ? 'rgba(169, 112, 255, 0.1)' : 'transparent'
          }}
          transition={{ type: "tween", duration: 0.15 }}
        />
        <motion.div 
          className="cursor-text"
          animate={{ 
            left: cursorPos.x, 
            top: cursorPos.y,
            opacity: cursorHovering ? 1 : 0
          }}
          transition={{ type: "tween", duration: 0.1 }}
        >
          <span>VIEW</span>
        </motion.div>
      </div>

      <div className="particles">
        {[...Array(20)].map((_, i) => <Particle key={i} index={i} />)}
      </div>

      <div className="floating-shapes">
        {floatingShapes.map((shape, i) => (
          <FloatingShape key={i} {...shape} />
        ))}
      </div>

      <motion.nav 
        className="nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.1 }}
          onClick={() => scrollToSection('home')}
        >
          <span className="logo-text">SW</span>
        </motion.div>
        
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <motion.span 
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
          />
          <motion.span 
            animate={{ opacity: menuOpen ? 0 : 1 }}
          />
          <motion.span 
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
          />
        </button>

        <AnimatePresence>
          {(menuOpen || window.innerWidth > 768) && (
            <motion.div 
              className="nav-links"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {['Home', 'Skills', 'Projects', 'Contact'].map((item, i) => (
                <motion.button
                  key={item}
                  className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  onMouseEnter={() => setCursorHovering(true)}
                  onMouseLeave={() => setCursorHovering(false)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <motion.div 
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      <section id="home" className="hero">
        <motion.div 
          className="hero-bg"
          style={{ y: heroY }}
        />
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="hero-title">
               <span className="name-text">Sathwik Wagle</span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="typing-text">Full Stack Web Developer</span>
            <span className="separator">•</span>
            <span>Angular</span>
            <span className="separator">•</span>
            <span>React</span>
            <span className="separator">•</span>
            <span>Node</span>
            <span className="separator">•</span>
            <span>Postgres</span>
            <span className="separator">•</span>
            <span>Tailwind</span>
          </motion.p>
          
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.button 
              className="btn-primary" 
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(169, 112, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Work
            </motion.button>
            <motion.button 
              className="btn-secondary" 
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          className="scroll-indicator"
          style={{ opacity }}
        >
          <span>Scroll</span>
          <motion.div 
            className="scroll-line"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      <motion.section 
        id="skills" 
        className="skills"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="section-title"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>
        
        <div className="skills-grid">
          {Object.entries(skillsData).map(([category, skills], catIndex) => (
            <motion.div 
              key={category}
              className="skill-category"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <h3 className="category-title">
                {category.replace(/([A-Z])/g, ' $1').trim().charAt(0).toUpperCase() + category.replace(/([A-Z])/g, ' $1').trim().slice(1)}
              </h3>
              <div className="skill-tags">
                {skills.map((skill, index) => (
                  <motion.span 
                    key={index}
                    className="skill-tag"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(169, 112, 255, 0.2)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        id="projects" 
        className="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="section-title"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <motion.div 
              key={index}
              className="project-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onMouseEnter={() => setCursorHovering(true)}
              onMouseLeave={() => setCursorHovering(false)}
            >
              <motion.div 
                className="project-preview"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="project-preview-glow" />
                <img 
                  src={project.image} 
                  alt={`${project.title} Project Preview`} 
                  className="project-image"
                  loading="lazy"
                />
              </motion.div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <motion.span 
                      key={i} 
                      className="tech-tag"
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="project-links">
                  {project.sourceUrl && (
                    <a 
                      href={project.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-ghost"
                    >
                      Source <span className="icon">⧉</span>
                    </a>
                  )}
                  <a 
                    href={project.visitUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-neo"
                  >
                    Visit <span className="icon">↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        id="contact" 
        className="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="section-title"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h2>
        
        <div className="contact-content">
          <motion.p 
            className="contact-text"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            If you have any questions or would like to discuss potential opportunities, please reach out. 
            You can email me at <motion.a 
              href="mailto:kywagle@gmail.com" 
              className="contact-email"
              whileHover={{ scale: 1.05, color: '#b87fff' }}
            >
              kywagle@gmail.com
            </motion.a>. 
            I'm open to collaborations and new ideas.
          </motion.p>
          
          <motion.form 
            className="subscribe-form" 
            onSubmit={handleSubscribe}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.input
              type="email"
              placeholder="Enter email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              required
              whileFocus={{ borderColor: '#a970ff', boxShadow: '0 0 20px rgba(169, 112, 255, 0.2)' }}
            />
            <motion.button 
              type="submit" 
              className="submit-btn"
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(169, 112, 255, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
          
          <motion.p 
            className="designed-with"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Designed with <span className="heart">❤</span>
          </motion.p>
        </div>
      </motion.section>

      <motion.div 
        className="progress-bar"
        style={{ opacity: window.innerWidth > 768 ? 1 : 0 }}
      >
        {['home', 'skills', 'projects', 'contact'].map((section, i) => (
          <motion.div
            key={section}
            className={`progress-dot ${activeSection === section ? 'active' : ''}`}
            onClick={() => scrollToSection(section)}
            whileHover={{ scale: 1.3 }}
            animate={{
              backgroundColor: activeSection === section ? '#a970ff' : '#333'
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default App