import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useOutletContext, useLocation } from 'react-router-dom'

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

export default function Home() {
  const { setCursorHovering } = useOutletContext()
  const [email, setEmail] = useState('')
  const location = useLocation()
  
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location.state])

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert(`Thanks for subscribing with: ${email}`)
    setEmail('')
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main>
      <section id="home" className="hero">
        <motion.div className="hero-bg" style={{ y: heroY }} />
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

        <motion.div className="scroll-indicator" style={{ opacity }}>
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
    </main>
  )
}
