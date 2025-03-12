"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

type TimelineItem = {
  year: string
  title: string
  company: string
  description: string
}

const timelineItems: TimelineItem[] = [
  {
    year: "2023 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    description:
      "Leading the development of cutting-edge web applications using React, Next.js, and TypeScript. Implementing advanced animations and optimizing performance for enterprise clients.",
  },
  {
    year: "2021 - 2023",
    title: "UI/UX Designer & Developer",
    company: "Creative Solutions Agency",
    description:
      "Created design systems and interactive prototypes for various clients, focusing on user experience and accessibility. Developed responsive websites with modern frameworks.",
  },
  {
    year: "2019 - 2021",
    title: "Frontend Developer",
    company: "Digital Products Ltd.",
    description:
      "Worked on multiple web applications using React, Vue.js, and various animation libraries to create engaging user interfaces. Collaborated with design and backend teams.",
  },
  {
    year: "2017 - 2019",
    title: "Web Designer",
    company: "StartUp Studio",
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
    <section id="timeline" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-5 py-2 rounded-full border border-primary/20 mb-6 shadow-lg shadow-primary/5">
            <div className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium">Professional Journey</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6 leading-tight">
            My Career Timeline
          </h2>
          <p className="text-muted-foreground/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Explore the key milestones and experiences that have shaped my professional journey in technology and design.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-secondary">
            <motion.div className="absolute top-0 left-0 w-full bg-primary" style={{ height: lineHeight }} />
          </div>

          {/* Timeline items */}
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className={`relative mb-16 ${
                index % 2 === 0 ? "md:pr-12 md:text-right md:ml-0 md:mr-auto" : "md:pl-12 md:ml-auto md:mr-0"
              } md:w-1/2 p-6`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-6 ${
                  index % 2 === 0 ? "md:-right-4" : "md:-left-4"
                } w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10`}
              >
                <div className="w-4 h-4 rounded-full bg-background" />
              </div>

              {/* Content card */}
              <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:border-primary/50 transition-all duration-300">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-primary/80 text-sm mb-3">{item.company}</p>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

