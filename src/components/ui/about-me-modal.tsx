"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, User, Briefcase, GraduationCap, Award, Heart } from "lucide-react"
import Image from "next/image"

interface AboutMeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutMeModal({ isOpen, onClose }: AboutMeModalProps) {
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-card rounded-xl p-6 md:p-8 max-w-3xl w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">About Me</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <motion.div variants={contentVariants} initial="hidden" animate="visible" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    <Image src="/hello.jpg" alt="Your Name" fill className="object-cover" />
                  </div>
                </div>
                <div className="md:w-2/3 space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold">Avoy Baruah</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Creative developer with a passion for crafting immersive digital experiences. I blend technical
                    expertise with artistic vision to create websites and applications that not only function flawlessly
                    but also captivate and inspire users.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Experience</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">5+ years in web development and design</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Education</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">B.Tech in Computer Science, Assam Down Town University</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Skills</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">React, Next.js, TypeScript, UI/UX Design</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Interests</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">3D modeling, Photography, Hiking</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">My Journey</h4>
                <p className="text-sm text-muted-foreground">
                  I started my journey in web development 5 years ago, driven by a curiosity to understand how digital
                  experiences are created. Since then, I've worked on a variety of projects, from small business
                  websites to large-scale web applications, always striving to push the boundaries of what's possible on
                  the web. My goal is to continue growing as a developer and to create digital solutions that make a
                  positive impact on people's lives.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

