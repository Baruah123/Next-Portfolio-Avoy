"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform built with Next.js and Tailwind CSS, featuring product filtering, cart functionality, and checkout process.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "3D Portfolio Experience",
    description:
      "An immersive 3D portfolio experience built with Three.js and React, showcasing interactive 3D models and animations.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Three.js", "GSAP", "WebGL"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "AI Content Generator",
    description:
      "A content generation tool powered by AI, allowing users to create blog posts, social media content, and more with a few clicks.",
    image: "/Ai.png",
    tags: ["Next.js", "OpenAI", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://ai-content-generator-seven-delta.vercel.app/",
    githubUrl: "https://github.com/Baruah123/Next-Portfolio-Avoy",
  },
  {
    id: 4,
    title: "Dashboard UI Kit",
    description:
      "A comprehensive dashboard UI kit with over 50 components, dark mode support, and responsive design for building admin interfaces.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Tailwind CSS", "Storybook", "Figma"],
    demoUrl: "#",
    githubUrl: "#",
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            A selection of my recent work, showcasing web applications, interactive experiences, and design systems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              className={`group relative bg-card rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 ${
                activeProject === project.id ? 'ring-2 ring-primary shadow-xl' : ''
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-primary-foreground p-3 rounded-full"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-primary-foreground p-3 rounded-full"
                  >
                    <Github size={20} />
                  </motion.a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-foreground/80 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-secondary px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

