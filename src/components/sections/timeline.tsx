"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, Building2 } from "lucide-react"

type TimelineItem = {
  year: string
  title: string
  company: string
  description: string
}

const timelineItems: TimelineItem[] = [
  {
    year: "2023 - Present",
    title: "AI/ML Developer",
    company: "IIT Guwahati",
    description:
      "Developing AI/ML models and applications for various projects. working on projects like Image Segmentation, Object Detection, etc.",
  },
  {
    year: "2021 - 2023",
    title: "UI/UX Designer & Developer",
    company: "ICM",
    description:
      "Created design systems and interactive prototypes for various clients, focusing on user experience and accessibility. Developed responsive websites with modern frameworks.",
  },
  {
    year: "2019 - 2021",
    title: "Frontend Developer",
    company: "Freelancer",
    description:
      "Worked on multiple web applications using React, Vue.js, and various animation libraries to create engaging user interfaces. Collaborated with design and backend teams.",
  },
  {
    year: "2017 - 2019",
    title: "Web Designer",
    company: "Finovi",
    description:
      "Started my career designing websites and learning frontend development, with a focus on creative and interactive experiences. Gained experience with HTML, CSS, and JavaScript.",
  },
]

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="timeline" className="py-20 md:py-32 bg-background/50 relative">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background opacity-30" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 mb-4">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm uppercase tracking-wider text-primary font-medium">Professional Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4">
            My Career Timeline
          </h2>
          <p className="text-muted-foreground/90 text-lg max-w-2xl mx-auto">
            Explore the key milestones and experiences that have shaped my professional journey.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Simplified timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-primary"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items with optimized animations */}
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative mb-12 ${
                index % 2 === 0 
                  ? "md:pr-12 md:text-right md:ml-0 md:mr-auto" 
                  : "md:pl-12 md:ml-auto md:mr-0"
              } md:w-[calc(50%-20px)] p-4`}
            >
              {/* Simplified timeline node */}
              <div
                className={`absolute top-6 ${
                  index % 2 === 0 ? "md:-right-3" : "md:-left-3"
                } w-6 h-6 rounded-full bg-primary/90 flex items-center justify-center z-10 ring-4 ring-background`}
              />

              {/* Simplified content card */}
              <div className="bg-card/50 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-colors duration-200 group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {item.year}
                  </span>
                  <Building2 className="w-4 h-4 text-primary/70" />
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-primary/90 transition-colors duration-200">
                  {item.title}
                </h3>
                
                <p className="text-primary/80 text-sm font-medium mb-2">
                  {item.company}
                </p>
                
                <p className="text-muted-foreground/90 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

