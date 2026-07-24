import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useOutletContext } from 'react-router-dom'
import fm from 'front-matter'

export default function Blogs() {
  const { setCursorHovering } = useOutletContext()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const loadBlogs = async () => {
      const modules = import.meta.glob('../blogs/*.md', { as: 'raw', eager: true })
      const blogList = Object.entries(modules).map(([path, content]) => {
        const { attributes, body } = fm(content)
        const id = path.split('/').pop().replace('.md', '')
        return { id, ...attributes, content: body }
      }).sort((a, b) => new Date(b.date) - new Date(a.date))
      
      setBlogs(blogList)
    }
    loadBlogs()
  }, [])

  return (
    <div className="blogs-page">
      <motion.section 
        className="blogs-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="section-title">Blogs</div>
        <motion.h1 
          className="hero-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Insights & &nbsp;<span className="name-text">Stories</span>
        </motion.h1>
      </motion.section>

      <div className="blogs-grid">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            className="project-card blog-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            onMouseEnter={() => setCursorHovering(true)}
            onMouseLeave={() => setCursorHovering(false)}
          >
            <Link to={`/blogs/${blog.id}`} className="blog-link">
              <div className="project-preview">
                <div className="project-preview-glow" />
                <img src={blog.image} alt={blog.title} className="project-image" />
              </div>
              <div className="project-info">
                <div className="blog-date">{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <h2 className="project-title">{blog.title}</h2>
                <p className="project-description">{blog.excerpt}</p>
                <div className="btn-neo">Read More <span className="icon">→</span></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
