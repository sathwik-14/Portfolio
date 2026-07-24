import { useState, useEffect } from 'react'
import { useParams, Link, useOutletContext } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import fm from 'front-matter'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

export default function BlogDetail() {
  const { id } = useParams()
  const { setCursorHovering } = useOutletContext()
  const [blog, setBlog] = useState(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const loadBlog = async () => {
      const modules = import.meta.glob('../blogs/*.md?raw', { eager: true })
      const path = `../blogs/${id}.md?raw`
      if (modules[path]) {
        const { attributes, body } = fm(modules[path])
        setBlog({ ...attributes, content: body })
      }
    }
    loadBlog()
    window.scrollTo(0, 0)
  }, [id])

  if (!blog) return <div className="loading">Loading...</div>

  return (
    <div className="blog-detail-page">
      <motion.div className="reading-progress" style={{ scaleX }} />
      
      <div className="blog-detail-header">
        <Link 
          to="/blogs" 
          className="back-link"
          onMouseEnter={() => setCursorHovering(true)}
          onMouseLeave={() => setCursorHovering(false)}
        >
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
        
        <motion.div 
          className="blog-meta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="blog-meta-item"><Calendar size={14} /> {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="blog-meta-item"><Clock size={14} /> {Math.ceil(blog.content.split(' ').length / 200)} min read</span>
        </motion.div>

        <motion.h1 
          className="blog-detail-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {blog.title}
        </motion.h1>

        {blog.image && (
          <motion.div 
            className="blog-detail-image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <img src={blog.image} alt={blog.title} className="blog-detail-image" />
          </motion.div>
        )}
      </div>

      <motion.div 
        className="blog-content-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="blog-content">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </motion.div>

      <footer className="blog-footer">
        <div className="separator" />
        <p>Thanks for reading! If you enjoyed this post, feel free to share it.</p>
        <Link to="/blogs" className="btn-secondary">View More Posts</Link>
      </footer>
    </div>
  )
}
