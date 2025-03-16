"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, Moon, Sun, Sparkles, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Move the throttle function outside the component
const throttle = <T extends (...args: unknown[]) => void>(callback: T, delay: number) => {
  let lastCall = 0
  return function (...args: Parameters<T>) {
    const now = new Date().getTime()
    if (now - lastCall >= delay) {
      lastCall = now
      callback(...args)
    }
  }
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const lastScrollY = useRef(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Replace the useCallback with an inline function implementation
  const updateActiveSection = () => {
    const sections = document.querySelectorAll("section[id]")
    const scrollPosition = window.scrollY + 100 // Offset for header height
    
    let currentActive = "home" // Default to home if no section is active
    
    sections.forEach((section) => {
      const sectionId = section.getAttribute("id") || ""
      const sectionTop = (section as HTMLElement).offsetTop
      const sectionHeight = section.clientHeight
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActive = sectionId
      }
    })
    
    setActiveSection(currentActive)
  }

  const handleScroll = useCallback(() => {
    throttle(() => {
      const currentScrollY = window.scrollY
      
      // Determine if scrolled past threshold
      setScrolled(currentScrollY > 50)
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150 && !isOpen) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      
      // Update active section
      updateActiveSection()
      
      lastScrollY.current = currentScrollY
    }, 100)()
  }, [isOpen])

  useEffect(() => {
    setMounted(true)
    
    // Initial check for scroll position (in case page is loaded scrolled down)
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setHidden(false) // Ensure header is visible when menu is open
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const menuItemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  }

  // Icons for each section to enhance visual appeal
  const navLinks = [
    { href: "#home", label: "Home", icon: <Sparkles className="w-4 h-4" /> },
    { href: "#projects", label: "Projects", icon: <Sparkles className="w-4 h-4" /> },
    { href: "#testimonials", label: "Testimonials", icon: <Sparkles className="w-4 h-4" /> },
    { href: "#timeline", label: "Timeline", icon: <Sparkles className="w-4 h-4" /> },
    { href: "#contact", label: "Contact", icon: <Sparkles className="w-4 h-4" /> },
  ]
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) {
        const headerHeight = headerRef.current?.offsetHeight || 0
        const targetPosition = (target as HTMLElement).offsetTop - headerHeight
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        })
      }
    }, 10)
  }

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-md py-4 shadow-md" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold group relative">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Portfolio</span>
            <span className="absolute -top-1 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            </span>
          </Link>
        </motion.div>

        <div className="flex items-center gap-4">
          {mounted && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: theme === "dark" ? 15 : -15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          )}

          {/* Resume button */}
          <motion.a
            href="https://drive.google.com/file/d/1n3kPVtvYiv2Idnpc6BK1Zd9vx3dIFE3f/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-1 px-4 py-2 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground transition-colors text-sm font-medium"
          >
            Resume <ChevronDown className="w-4 h-4 ml-1" />
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <a 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "text-foreground/80 hover:text-foreground transition-colors relative flex items-center gap-1.5",
                    activeSection === link.href.substring(1) && "text-primary font-medium"
                  )}
                >
                  {link.icon}
                  {link.label}
                  {activeSection === link.href.substring(1) && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" 
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>

      {/* Full-screen menu for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <motion.button
              className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close menu"
            >
              <X size={24} />
            </motion.button>
            
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href={link.href} 
                    className={cn(
                      "text-3xl font-bold transition-colors flex items-center gap-2",
                      activeSection === link.href.substring(1) 
                        ? "text-primary" 
                        : "text-foreground/80 hover:text-foreground"
                    )}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                </motion.div>
              ))}
              
              {/* Resume button in mobile menu */}
              <motion.a
                variants={menuItemVariants}
                href="https://drive.google.com/file/d/1n3kPVtvYiv2Idnpc6BK1Zd9vx3dIFE3f/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-3 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground transition-colors text-xl font-medium flex items-center gap-2"
                onClick={() => {
                  // Close the mobile menu after clicking
                  setIsOpen(false);
                }}
              >
                Resume <ChevronDown className="w-5 h-5 ml-1" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

