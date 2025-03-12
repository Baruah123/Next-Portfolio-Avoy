"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react"
import Image from "next/image"

type Testimonial = {
  id: number
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "Working with this developer was an absolute pleasure. They delivered a stunning website that exceeded our expectations, with animations that truly brought our brand to life.",
    avatar: "/testimonials/avatar3.jpg",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "CEO",
    company: "CreativeStudio",
    content:
      "The attention to detail and creativity shown in our project was exceptional. The interactive elements and smooth animations have significantly improved user engagement.",
    avatar: "/testimonials/avatar2.jpg",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Marketing Director",
    company: "InnovateX",
    content:
      "Our website redesign has received countless compliments since launch. The animations are subtle yet effective, creating a memorable experience for our visitors.",
    avatar: "/testimonials/avatar1.jpg",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useRef(false)

  const nextTestimonial = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting
      },
      { threshold: 0.5 }
    )

    const currentContainer = containerRef.current
    if (currentContainer) {
      observer.observe(currentContainer)
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer)
      }
    }
  }, [])

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      if (isInView.current) {
        nextTestimonial()
      }
    }, 5000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current, nextTestimonial, isInView])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background relative overflow-hidden will-change-transform">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 opacity-30" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      
      <div className="container mx-auto px-4 relative" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/30 shadow-[inset_0_0_1px_1px] shadow-primary/5 mb-4">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm uppercase tracking-wider text-primary/80 font-semibold">Client Testimonials</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            What Clients Say
          </h3>
          <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto">
            Discover what clients have to say about their experience working with me on their projects.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 400, damping: 40 },
                opacity: { duration: 0.15 },
              }}
              className="group relative bg-card/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl border border-border/30 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid opacity-50" />
              
              <div className="relative flex flex-col md:flex-row gap-8 items-center">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden relative ring-2 ring-primary/20 shadow-xl shadow-primary/5">
                    <Image
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      width={128}
                      height={128}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>
                  <motion.div
                    className="absolute -top-3 -left-3 bg-primary/90 text-primary-foreground p-3 rounded-xl shadow-lg backdrop-blur-sm"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Quote size={20} />
                  </motion.div>
                </div>
                <div className="flex-1">
                  <motion.p
                    className="text-lg md:text-xl mb-6 italic text-foreground/90 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    &ldquo;{testimonials[current].content}&rdquo;
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <h4 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                      {testimonials[current].name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground/90 text-base font-medium">
                        {testimonials[current].role}
                      </span>
                      <span className="text-primary/50">•</span>
                      <span className="text-muted-foreground/90 text-base">
                        {testimonials[current].company}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-12 gap-6">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-xl bg-secondary/30 backdrop-blur-sm border border-border/30 shadow-[inset_0_0_1px_1px] shadow-primary/5 hover:bg-secondary/50 hover:border-primary/30 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="text-primary group-hover:text-primary/80 transition-colors" />
            </motion.button>
            <div className="flex gap-3 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1)
                    setCurrent(index)
                  }}
                  className="p-1 group"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-transform duration-200 ${
                      index === current 
                        ? "bg-primary scale-110" 
                        : "bg-secondary/50 hover:bg-secondary"
                    }`}
                  />
                </button>
              ))}
            </div>
            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-xl bg-secondary/30 backdrop-blur-sm border border-border/30 shadow-[inset_0_0_1px_1px] shadow-primary/5 hover:bg-secondary/50 hover:border-primary/30 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="text-primary group-hover:text-primary/80 transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

