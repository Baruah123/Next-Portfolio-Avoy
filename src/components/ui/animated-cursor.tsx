"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function AnimatedCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
    },
    [cursorX, cursorY],
  )

  const onMouseEnter = useCallback(() => setIsVisible(true), [])
  const onMouseLeave = useCallback(() => setIsVisible(false), [])

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    if (!isMobile) {
      document.documentElement.classList.add("custom-cursor")
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
    }

    return () => {
      document.documentElement.classList.remove("custom-cursor")
      window.removeEventListener("resize", checkDevice)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [isMobile, onMouseMove, onMouseEnter, onMouseLeave])

  if (isMobile) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        backgroundColor: "gold",
        opacity: isVisible ? 0.5 : 0,
      }}
    />
  )
}

