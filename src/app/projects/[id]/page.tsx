"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink, Calendar, Code, Tag } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Import project data from the projects component
import { projects } from "@/lib/projects-data"

export default function ProjectDetail() {
  const params = useParams()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the project with the matching ID
    const projectId = Number(params.id)
    const foundProject = projects.find((p) => p.id === projectId)
    
    if (foundProject) {
      setProject(foundProject)
    }
    
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
        <Link href="/#projects">
          <Button variant="default">Back to Projects</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      
      <div className="container mx-auto px-4 relative">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-2xl shadow-xl mb-8 bg-card/50 backdrop-blur-xl border border-border/30">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  style={{ 
                    objectPosition: 'center center',
                    objectFit: 'contain'
                  }}
                />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag: string, index: number) => (
                  <span 
                    key={index} 
                    className="text-sm font-medium bg-secondary/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/30 shadow-[inset_0_0_1px_1px] shadow-primary/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p className="text-muted-foreground/90 text-lg">
                  {project.description}
                </p>
                
                {/* This would ideally come from an extended project object with more details */}
                <p className="text-muted-foreground/90 text-lg mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. 
                  Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. 
                  Praesent et diam eget libero egestas mattis sit amet vitae augue.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Key Features</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground/90">
                  <li>Responsive design that works on all devices</li>
                  <li>Modern UI with smooth animations</li>
                  <li>Secure authentication and authorization</li>
                  <li>Fast performance and SEO optimization</li>
                  <li>Comprehensive error handling</li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Development Process</h2>
                <p className="text-muted-foreground/90 text-lg">
                  The development process involved several phases including research, design, implementation, testing, and deployment.
                  Each phase was carefully executed to ensure the highest quality of the final product.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Technical Challenges</h2>
                <p className="text-muted-foreground/90 text-lg">
                  During the development of this project, several technical challenges were encountered and overcome,
                  including performance optimization, cross-browser compatibility, and scalability concerns.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Lessons Learned</h2>
                <p className="text-muted-foreground/90 text-lg">
                  This project provided valuable insights into modern web development practices, team collaboration,
                  and the importance of user feedback in the development cycle.
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-card/50 backdrop-blur-xl rounded-xl p-6 border border-border/30 shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Project Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Completion Date</p>
                      <p className="text-muted-foreground">2023</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Tech Stack</p>
                      <p className="text-muted-foreground">{project.tags.join(', ')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-muted-foreground">Web Application</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button 
                    asChild
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    asChild
                    className="w-full gap-2"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={16} />
                      View Source
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="bg-card/50 backdrop-blur-xl rounded-xl p-6 border border-border/30 shadow-lg">
                <h3 className="text-xl font-bold mb-4">More Projects</h3>
                
                <div className="space-y-4">
                  {projects
                    .filter(p => p.id !== project.id)
                    .slice(0, 3)
                    .map((relatedProject) => (
                      <Link 
                        key={relatedProject.id} 
                        href={`/projects/${relatedProject.id}`}
                        className="block group"
                      >
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                          <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={relatedProject.image || "/placeholder.svg"}
                              alt={relatedProject.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                              {relatedProject.title}
                            </h4>
                            <p className="text-xs text-muted-foreground truncate">
                              {relatedProject.tags.slice(0, 2).join(', ')}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 