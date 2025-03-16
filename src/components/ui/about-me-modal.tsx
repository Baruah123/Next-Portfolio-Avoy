"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, User, Briefcase, GraduationCap, Award, Heart } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface AboutMeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutMeModal({ isOpen, onClose }: AboutMeModalProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeIn" } },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.3 } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-card rounded-xl p-3 sm:p-4 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6 sticky top-0 bg-card/90 backdrop-blur-sm py-1 z-10">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">About Me</h2>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors touch-manipulation"
                aria-label="Close modal"
              >
                <X size={isMobile ? 16 : 18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            <motion.div variants={contentVariants} initial="hidden" animate="visible" className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6">
                <div className="md:w-1/3 mx-auto md:mx-0" style={{ maxWidth: isMobile ? "180px" : "none" }}>
                  <div className="relative w-full aspect-square rounded-lg sm:rounded-xl overflow-hidden">
                    <Image src="/hello.jpg" alt="Avoy Baruah" fill className="object-cover" />
                  </div>
                </div>
                <div className="md:w-2/3 space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold">Avoy Baruah</h3>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    Creative developer with a passion for crafting immersive digital experiences. I blend technical
                    expertise with artistic vision to create websites and applications that not only function flawlessly
                    but also captivate and inspire users.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="space-y-1 sm:space-y-2 border border-border/30 rounded-lg p-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary" />
                    <h4 className="font-semibold text-sm sm:text-base">Experience</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">5+ years in web development and design</p>
                </div>
                <div className="space-y-1 sm:space-y-2 border border-border/30 rounded-lg p-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary" />
                    <h4 className="font-semibold text-sm sm:text-base">Education</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">B.Tech in Computer Science, Assam Down Town University</p>
                </div>
                <div className="space-y-1 sm:space-y-2 border border-border/30 rounded-lg p-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary" />
                    <h4 className="font-semibold text-sm sm:text-base">Skills</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">React, Next.js, TypeScript, UI/UX Design</p>
                </div>
                <div className="space-y-1 sm:space-y-2 border border-border/30 rounded-lg p-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary" />
                    <h4 className="font-semibold text-sm sm:text-base">Interests</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">3D modeling, Photography, Hiking</p>
                </div>
              </div>

              <div className="border border-border/30 rounded-lg p-3">
                <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">My Journey</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  I started my journey in web development 5 years ago, driven by a curiosity to understand how digital
                  experiences are created. Since then, I&apos;ve worked on a variety of projects, from small business
                  websites to large-scale web applications, always striving to push the boundaries of what&apos;s possible on
                  the web. My goal is to continue growing as a developer and to create digital solutions that make a
                  positive impact on people&apos;s lives.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

