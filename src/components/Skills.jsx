import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaGitAlt, 
  FaDocker, 
  FaAws 
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiMongodb, 
  SiPostgresql, 
  SiFirebase, 
  SiTailwindcss,
  SiRedux,
  SiGraphql,
  SiKubernetes,
  SiVuedotjs,
  SiAngular,
  SiExpress
} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React', icon: FaReact, level: 95, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, level: 90, color: '#000000' },
        { name: 'TypeScript', icon: SiTypescript, level: 88, color: '#3178C6' },
        { name: 'JavaScript', icon: FaJs, level: 95, color: '#F7DF1E' },
        { name: 'Vue.js', icon: SiVuedotjs, level: 80, color: '#4FC08D' },
        { name: 'Angular', icon: SiAngular, level: 75, color: '#DD0031' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92, color: '#06B6D4' },
        { name: 'HTML5', icon: FaHtml5, level: 95, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, level: 90, color: '#1572B6' },
        { name: 'Redux', icon: SiRedux, level: 85, color: '#764ABC' },
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, level: 90, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, level: 88, color: '#000000' },
        { name: 'Python', icon: FaPython, level: 85, color: '#3776AB' },
        { name: 'GraphQL', icon: SiGraphql, level: 80, color: '#E10098' },
      ]
    },
    {
      title: 'Database & Cloud',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, level: 85, color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 82, color: '#336791' },
        { name: 'Firebase', icon: SiFirebase, level: 88, color: '#FFCA28' },
        { name: 'AWS', icon: FaAws, level: 75, color: '#FF9900' },
      ]
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 90, color: '#F05032' },
        { name: 'Docker', icon: FaDocker, level: 80, color: '#2496ED' },
        { name: 'Kubernetes', icon: SiKubernetes, level: 70, color: '#326CE5' },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="section-padding bg-dark-card/30">
      <div className="container-max-width">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text-light mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-dark-text text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-dark-text-light mb-6 text-center">
                {category.title}
              </h3>
              
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="group"
                    variants={itemVariants}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="p-2 bg-dark-bg rounded-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <skill.icon 
                            className="text-2xl"
                            style={{ color: skill.color }}
                          />
                        </motion.div>
                        <span className="text-dark-text-light font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-dark-text text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-dark-bg rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ 
                          duration: 1.5, 
                          delay: skillIndex * 0.1,
                          ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Skill Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-dark-text-light mb-4">
              Always Learning, Always Growing
            </h3>
            <p className="text-dark-text leading-relaxed">
              Technology evolves rapidly, and I'm committed to staying at the forefront. 
              I regularly explore new frameworks, attend tech conferences, and contribute to 
              open-source projects. My goal is to leverage the best tools and practices to 
              create exceptional digital experiences.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {['Responsive Design', 'Performance Optimization', 'SEO', 'Accessibility', 'Testing'].map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-dark-primary/20 text-dark-primary rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
