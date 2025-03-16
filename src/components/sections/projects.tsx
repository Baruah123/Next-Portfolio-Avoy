"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/projects-data"

export default function Projects() {
  const ref = useRef(null)
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

  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="py-20 md:py-32 bg-background relative overflow-hidden">
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
            <span className="text-sm uppercase tracking-wider text-primary/80 font-semibold">Featured Work</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            My Projects
          </h3>
          <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto">
            A curated selection of my work, showcasing innovative web applications and creative solutions.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-20" ref={ref}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={projectVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-card/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-primary/5"
              >
                <div className="relative h-[250px] md:h-[300px] w-full overflow-hidden bg-secondary/20">
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-contain md:object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={project.id === 1}
                    quality={100}
                    style={{ 
                      objectPosition: 'center center',
                      objectFit: project.id <= 2 ? 'cover' : 'contain'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary/90 hover:bg-primary text-primary-foreground p-4 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
                    >
                      <ExternalLink size={22} />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary/90 hover:bg-primary text-primary-foreground p-4 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
                    >
                      <Github size={22} />
                    </motion.a>
                  </div>
                </div>

                <div className="relative p-8 bg-gradient-to-b from-transparent via-card/50 to-card/50">
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid opacity-50" />
                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground/90 text-base mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-xs font-medium bg-secondary/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/30 shadow-[inset_0_0_1px_1px] shadow-primary/5 hover:bg-secondary/50 transition-all duration-300 hover:border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/projects/${project.id}`} 
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 group/link"
                    >
                      View Details
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
            More Projects
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {otherProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover={{ y: -5 }}
              className="group relative bg-card/50 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl" />
              <div className="relative">
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground/80 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs font-medium bg-secondary/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/30 shadow-[inset_0_0_1px_1px] shadow-primary/5 hover:bg-secondary/50 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs font-medium bg-secondary/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/30 shadow-[inset_0_0_1px_1px] shadow-primary/5">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 group/link"
                  >
                    View Project 
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/projects">
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 bg-secondary/30 backdrop-blur-sm border-border/30 shadow-[inset_0_0_1px_1px] shadow-primary/5 hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 px-8"
            >
              View All Projects 
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

