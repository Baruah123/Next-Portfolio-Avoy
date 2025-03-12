"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Palette, Database, Lightbulb, Sparkles } from "lucide-react"

type Skill = {
  name: string
  level: number
  category: string
}

type SkillCategory = {
  name: string
  icon: React.ReactNode
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Development",
    icon: <Code className="w-6 h-6" />,
    skills: [
      { name: "HTML/CSS", level: 95, category: "Frontend" },
      { name: "JavaScript", level: 90, category: "Frontend" },
      { name: "React", level: 92, category: "Frontend" },
      { name: "Next.js", level: 88, category: "Frontend" },
      { name: "TypeScript", level: 85, category: "Frontend" },
    ],
  },
  {
    name: "Design",
    icon: <Palette className="w-6 h-6" />,
    skills: [
      { name: "UI/UX Design", level: 90, category: "Design" },
      { name: "Figma", level: 92, category: "Design" },
      { name: "Adobe XD", level: 85, category: "Design" },
      { name: "Photoshop", level: 80, category: "Design" },
      { name: "Illustrator", level: 75, category: "Design" },
    ],
  },
  {
    name: "Backend Development",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "Node.js", level: 85, category: "Backend" },
      { name: "Express", level: 82, category: "Backend" },
      { name: "MongoDB", level: 80, category: "Backend" },
      { name: "PostgreSQL", level: 75, category: "Backend" },
      { name: "GraphQL", level: 78, category: "Backend" },
    ],
  },
  {
    name: "Other Skills",
    icon: <Lightbulb className="w-6 h-6" />,
    skills: [
      { name: "Git/GitHub", level: 90, category: "Tools" },
      { name: "Docker", level: 75, category: "Tools" },
      { name: "AWS", level: 70, category: "Tools" },
      { name: "SEO", level: 80, category: "Marketing" },
      { name: "Agile/Scrum", level: 85, category: "Management" },
    ],
  },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section id="skills" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/30 shadow-[inset_0_0_1px_1px] shadow-primary/5 mb-4">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm uppercase tracking-wider text-primary/80 font-semibold">Professional Skills</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Technical Expertise
          </h3>
          <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical proficiency and expertise across various domains.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="group relative bg-card/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-primary/5"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl" />
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid opacity-50" />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-2 ring-primary/20 shadow-xl shadow-primary/5">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group/skill">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-foreground/90 group-hover/skill:text-primary transition-colors duration-300">
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground group-hover/skill:text-primary/80 transition-colors duration-300">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2.5 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm ring-1 ring-white/10">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center"
        >
          {["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Framer Motion"].map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-card/50 backdrop-blur-xl p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl" />
              <p className="font-medium text-foreground/90 group-hover:text-primary transition-colors duration-300">{tech}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

