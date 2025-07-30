import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiCode, FiStar } from 'react-icons/fi';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, admin dashboard, and real-time inventory management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true,
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      technologies: ['Vue.js', 'Firebase', 'Vuetify', 'Socket.io'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      title: 'AI-Powered Analytics Dashboard',
      description: 'An analytics dashboard that uses machine learning to provide insights and predictions for business data visualization.',
      technologies: ['Python', 'React', 'TensorFlow', 'D3.js', 'PostgreSQL'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true,
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Weather Forecast App',
      description: 'A responsive weather application with location-based forecasts, interactive maps, and weather alerts.',
      technologies: ['React Native', 'API Integration', 'Redux', 'Maps API'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Cryptocurrency Tracker',
      description: 'Real-time cryptocurrency tracking application with portfolio management, price alerts, and market analysis.',
      technologies: ['Angular', 'TypeScript', 'Chart.js', 'WebSocket'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Social Media Dashboard',
      description: 'A comprehensive social media management tool for scheduling posts, analyzing engagement, and managing multiple accounts.',
      technologies: ['Next.js', 'Prisma', 'NextAuth', 'Tailwind CSS'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true,
      image: '/api/placeholder/400/250'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="section-padding bg-dark-bg">
      <div className="container-max-width">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text-light mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-dark-text text-lg max-w-2xl mx-auto">
            A showcase of my recent work and personal projects that demonstrate my skills and passion for development
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`card group hover:border-dark-primary relative overflow-hidden ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <motion.div
                    className="bg-dark-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <FiStar size={12} />
                    <span>Featured</span>
                  </motion.div>
                </div>
              )}

              {/* Project Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-dark-primary/20 to-blue-600/20 rounded-lg mb-6 flex items-center justify-center group-hover:from-dark-primary/30 group-hover:to-blue-600/30 transition-all duration-300">
                <FiCode className="text-4xl text-dark-primary" />
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-dark-text-light group-hover:text-dark-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-dark-text text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="px-3 py-1 bg-dark-bg text-dark-primary text-xs rounded-full border border-dark-border"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex space-x-4 pt-4">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-dark-text hover:text-dark-primary transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub size={18} />
                    <span className="text-sm">Code</span>
                  </motion.a>
                  
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-dark-text hover:text-dark-primary transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink size={18} />
                    <span className="text-sm">Live Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Projects */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub size={20} />
            <span>View More on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
