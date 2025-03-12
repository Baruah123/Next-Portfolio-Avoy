"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import AboutMeModal from "@/components/ui/about-me-modal"

// Wrap Button with motion to enable Framer Motion props
const MotionButton = motion(Button)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      const elements = containerRef.current.querySelectorAll(".parallax-element")
      elements.forEach((el) => {
        const speed = Number.parseFloat(el.getAttribute("data-speed") || "0")
        const xOffset = x * speed
        const yOffset = y * speed
        ;(el as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`
      })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: "easeOut" } },
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl opacity-60 parallax-element animated-bg"
          data-speed="20"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl opacity-50 parallax-element animated-bg"
          data-speed="-15"
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-purple-500/20 blur-3xl opacity-40 parallax-element animated-bg"
          data-speed="10"
        />
      </div>

      <motion.div className="container mx-auto text-center z-10 max-w-4xl" style={{ y, opacity }}>
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          Crafting <span className="gradient-text">Digital Experiences</span> That Inspire
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
        >
          Creative developer specializing in interactive websites and immersive digital experiences
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
        >
          <MotionButton
            size="lg"
            variant="gradient"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-medium"
            onClick={() => setIsAboutModalOpen(true)}
          >
            About Me
          </MotionButton>
          <MotionButton
            size="lg"
            variant="outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-medium"
          >
            Contact Me
          </MotionButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <ArrowDown className="w-6 h-6 text-foreground/70" />
      </motion.div>

      <AboutMeModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </section>
  )
}
