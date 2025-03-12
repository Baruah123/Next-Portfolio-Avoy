"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, Moon, Sun, ChevronDown, Code2, Briefcase, User2, Sparkles, Clock, Phone } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]")
      const scrollY = window.scrollY

      sections.forEach((section) => {
        const sectionId = section.getAttribute("id") || ""
        const sectionHeight = section.clientHeight
        const sectionTop = (section as HTMLElement).offsetTop - 100

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  }

  const navLinks = [
    { href: "#home", label: "Home", icon: <User2 className="w-4 h-4" /> },
    { href: "#about", label: "About", icon: <User2 className="w-4 h-4" /> },
    { href: "#projects", label: "Projects", icon: <Briefcase className="w-4 h-4" /> },
    { href: "#skills", label: "Skills", icon: <Code2 className="w-4 h-4" /> },
    { href: "#timeline", label: "Timeline", icon: <Clock className="w-4 h-4" /> },
    { href: "#contact", label: "Contact", icon: <Phone className="w-4 h-4" /> },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled 
          ? "bg-background/70 backdrop-blur-xl border-b border-border/40 py-3 shadow-lg" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Link 
              href="/" 
              className="relative group"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Avoy.dev
              </span>
              <span className="absolute -top-1 -right-3">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </span>
            </Link>
          </motion.div>

          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1 bg-secondary/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className="relative"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 relative group hover:bg-secondary/50",
                        activeSection === link.href.replace("#", "")
                          ? "text-primary bg-secondary"
                          : "text-foreground/70 hover:text-foreground"
                      )}
                    >
                      {link.icon}
                      {link.label}
                      {activeSection === link.href.replace("#", "") && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute inset-0 rounded-full bg-secondary ring-1 ring-border -z-10"
                          initial={false}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex items-center gap-3 ml-2">
                {mounted && (
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: theme === "dark" ? 15 : -15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2.5 rounded-full bg-secondary/30 hover:bg-secondary/50 text-foreground/70 hover:text-foreground backdrop-blur-sm border border-border/50 transition-all duration-300"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.button>
                )}
                
                <Button 
                  size="sm" 
                  variant="gradient"
                  className="px-4 py-5 font-medium rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  onClick={() => {
                    window.open('https://drive.google.com/file/d/1n3kPVtvYiv2Idnpc6BK1Zd9vx3dIFE3f/view?usp=sharing', '_blank')
                  }}
                >
                  Resume
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              {mounted && (
                <motion.button
                  whileHover={{ scale: 1.1, rotate: theme === "dark" ? 15 : -15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2.5 rounded-full bg-secondary/30 hover:bg-secondary/50 text-foreground/70 hover:text-foreground backdrop-blur-sm border border-border/50 transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
                className="p-2.5 rounded-full bg-secondary/30 hover:bg-secondary/50 text-foreground/70 hover:text-foreground backdrop-blur-sm border border-border/50 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "text-2xl font-medium transition-all duration-300 flex items-center gap-3",
                      activeSection === link.href.replace("#", "")
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants} className="mt-4">
                <Button 
                  size="lg" 
                  variant="gradient"
                  className="px-6 py-6 font-medium rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  onClick={() => {
                    window.open('https://drive.google.com/file/d/1n3kPVtvYiv2Idnpc6BK1Zd9vx3dIFE3f/view?usp=sharing', '_blank')
                  }}
                >
                  Resume
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

