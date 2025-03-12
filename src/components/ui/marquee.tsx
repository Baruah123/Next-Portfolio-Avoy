"use client"

import { motion } from "framer-motion"

export default function Marquee() {
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Framer Motion",
    "Tailwind CSS",
    "UI/UX Design",
    "3D Animation",
    "WebGL",
    "Node.js",
    "GraphQL",
    "Figma",
    "Creative Development",
  ]

  return (
    <div className="relative py-8 bg-secondary/30 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex items-center gap-8 text-lg md:text-xl font-medium text-foreground/80"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {skills.map((skill, index) => (
            <span key={index} className="px-4">
              {skill}
              <span className="ml-8 text-primary">•</span>
            </span>
          ))}
          {skills.map((skill, index) => (
            <span key={`repeat-${index}`} className="px-4">
              {skill}
              <span className="ml-8 text-primary">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

