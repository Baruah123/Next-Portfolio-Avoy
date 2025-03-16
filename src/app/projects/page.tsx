import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Github, ExternalLink, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { projects } from "@/lib/projects-data"

export const metadata = {
  title: "Projects | My Portfolio",
  description: "Browse all my projects and case studies",
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      
      <div className="container mx-auto px-4 relative">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            All Projects
          </h1>
          <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto">
            Browse my complete portfolio of projects, from web applications to UI design systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-card/50 backdrop-blur-xl rounded-xl overflow-hidden shadow-lg border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
              
              <div className="p-6">
                {project.featured && (
                  <span className="inline-block bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full mb-3">
                    Featured
                  </span>
                )}
                
                <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
                  {project.title}
                </h2>
                
                <p className="text-muted-foreground/80 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs font-medium bg-secondary/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs font-medium bg-secondary/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/30">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 group/link"
                  >
                    View Details
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                  
                  <div className="flex items-center gap-2">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}