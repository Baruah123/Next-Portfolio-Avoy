"use client"

import { motion } from "framer-motion"
import { Code2, Palette, Laptop, Layers } from "lucide-react"

export default function Marquee() {
  const skills = [
    { text: "React", icon: <Code2 className="w-4 h-4" /> },
    { text: "Next.js", icon: <Code2 className="w-4 h-4" /> },
    { text: "TypeScript", icon: <Code2 className="w-4 h-4" /> },
    { text: "Framer Motion", icon: <Layers className="w-4 h-4" /> },
    { text: "Tailwind CSS", icon: <Palette className="w-4 h-4" /> },
    { text: "UI/UX Design", icon: <Laptop className="w-4 h-4" /> },
    { text: "3D Animation", icon: <Layers className="w-4 h-4" /> },
    { text: "WebGL", icon: <Layers className="w-4 h-4" /> },
    { text: "Node.js", icon: <Code2 className="w-4 h-4" /> },
    { text: "GraphQL", icon: <Code2 className="w-4 h-4" /> },
    { text: "Figma", icon: <Palette className="w-4 h-4" /> },
    { text: "Creative Development", icon: <Laptop className="w-4 h-4" /> },
  ]

  return (
    <div className="relative py-16 bg-background/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent z-20" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent z-20" />
      
      <div className="relative flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex items-center gap-6 md:gap-8"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <div 
              key={index} 
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
            >
              <span className="text-primary/70 group-hover:text-primary transition-colors">
                {skill.icon}
              </span>
              <span className="text-base md:text-lg font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                {skill.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Duplicate for seamless loop */}
        <motion.div
          className="flex items-center gap-6 md:gap-8 absolute top-0 left-[100%]"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <div 
              key={index} 
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
            >
              <span className="text-primary/70 group-hover:text-primary transition-colors">
                {skill.icon}
              </span>
              <span className="text-base md:text-lg font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                {skill.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

