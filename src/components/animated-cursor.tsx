"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    // Add event listeners for interactive elements
    const links = document.querySelectorAll("a, button")

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => setCursorVariant("hover"))
      link.addEventListener("mouseleave", () => setCursorVariant("default"))
    })

    // Add custom-cursor-active class to body
    document.body.classList.add("custom-cursor-active")

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      document.body.classList.remove("custom-cursor-active")

      links.forEach((link) => {
        link.removeEventListener("mouseenter", () => setCursorVariant("hover"))
        link.removeEventListener("mouseleave", () => setCursorVariant("default"))
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
  }

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
      variants={variants}
      animate={cursorVariant}
    />
  )
}

