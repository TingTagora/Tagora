import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiCoffee, FiTrendingUp } from 'react-icons/fi';

const About = () => {
  const stats = [
    { icon: FiAward, label: 'Years Experience', value: '5+' },
    { icon: FiUsers, label: 'Projects Completed', value: '50+' },
    { icon: FiCoffee, label: 'Cups of Coffee', value: '1000+' },
    { icon: FiTrendingUp, label: 'Client Satisfaction', value: '98%' },
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="section-padding bg-dark-bg">
      <div className="container-max-width">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text-light mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-dark-text text-lg max-w-2xl mx-auto">
            Get to know more about my background, skills, and passion for technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-dark-text-light mb-6">
              Passionate Developer & Problem Solver
            </h3>
            
            <div className="space-y-4 text-dark-text leading-relaxed">
              <p>
                I'm a dedicated full-stack developer with over 5 years of experience in creating 
                robust, scalable web applications. My journey in technology started with a curiosity 
                about how things work behind the scenes, and it has evolved into a passion for 
                building solutions that make a real difference.
              </p>
              
              <p>
                I specialize in modern JavaScript frameworks, cloud technologies, and creating 
                seamless user experiences. My approach combines technical expertise with creative 
                problem-solving, ensuring that every project I work on not only meets requirements 
                but exceeds expectations.
              </p>
              
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or mentoring aspiring developers. I believe in continuous 
                learning and staying updated with the latest industry trends.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="mt-8 space-y-3">
              <h4 className="text-xl font-semibold text-dark-text-light mb-4">Key Highlights:</h4>
              <ul className="space-y-2">
                {[
                  'Full-stack development with modern technologies',
                  'Cloud architecture and DevOps practices',
                  'UI/UX design with focus on user experience',
                  'Team leadership and project management',
                  'Open-source contributor and tech enthusiast'
                ].map((highlight, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-3 text-dark-text"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-dark-primary rounded-full"></div>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="card text-center group hover:border-dark-primary"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-16 h-16 bg-dark-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-dark-primary/30 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="text-dark-primary text-2xl" />
                </motion.div>
                <motion.h4
                  className="text-2xl md:text-3xl font-bold text-dark-text-light mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.h4>
                <p className="text-dark-text text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Personal Philosophy */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 max-w-4xl mx-auto">
            <blockquote className="text-xl md:text-2xl text-dark-text-light font-medium italic mb-4">
              "Code is like humor. When you have to explain it, it's bad."
            </blockquote>
            <p className="text-dark-text">
              I believe in writing clean, maintainable code that speaks for itself. 
              My goal is to create solutions that are not only functional but also elegant and scalable.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
