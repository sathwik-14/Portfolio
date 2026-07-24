import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import '../App.css'

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

export default function Layout() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursorHovering, setCursorHovering] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return

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
  }, [location.pathname])

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } })
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMenuOpen(false)
  }

  const handleNavClick = (item) => {
    if (item === 'Blogs') {
      navigate('/blogs')
      setMenuOpen(false)
    } else {
      scrollToSection(item.toLowerCase())
    }
  }

  return (
    <div className="app">
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
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} />
        </button>

        <AnimatePresence>
          {(menuOpen || window.innerWidth > 768) && (
            <motion.div 
              className="nav-links"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {['Home', 'Skills', 'Projects', 'Blogs', 'Contact'].map((item, i) => (
                <motion.button
                  key={item}
                  className={`nav-link ${
                    (item === 'Blogs' && location.pathname.startsWith('/blogs')) || 
                    (item !== 'Blogs' && location.pathname === '/' && activeSection === item.toLowerCase()) 
                    ? 'active' : ''
                  }`}
                  onClick={() => handleNavClick(item)}
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

      <Outlet context={{ setCursorHovering }} />

      {location.pathname === '/' && (
        <motion.div 
          className="progress-bar"
          style={{ opacity: window.innerWidth > 768 ? 1 : 0 }}
        >
          {['home', 'skills', 'projects', 'contact'].map((section) => (
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
      )}
    </div>
  )
}
