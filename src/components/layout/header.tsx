"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Moon, Sun, Code2, Briefcase, User2, Clock, Phone, Home, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"

// Simple transition type
type TransitionConfig = {
  type: "tween" | "spring";
  duration?: number;
  ease?: string;
  stiffness?: number;
  damping?: number;
}

export default function Header() {
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

  const navItems = [
    { title: "Home", icon: <Home className="w-full h-full" />, href: "#home" },
    { title: "About", icon: <User2 className="w-full h-full" />, href: "#about" },
    { title: "Projects", icon: <Briefcase className="w-full h-full" />, href: "#projects" },
    { title: "Skills", icon: <Code2 className="w-full h-full" />, href: "#skills" },
    { title: "Timeline", icon: <Clock className="w-full h-full" />, href: "#timeline" },
    { title: "Contact", icon: <Phone className="w-full h-full" />, href: "#contact" },
  ]

  // Fast, simple transition for UI elements
  const fastTransition: TransitionConfig = {
    type: "tween",
    duration: 0.2,
    ease: "easeOut"
  }
  
  // Quick spring for background movement
  const quickSpring: TransitionConfig = {
    type: "spring",
    stiffness: 500,
    damping: 30
  }

  return (
    <>
      {/* Logo and Theme Toggle - Fixed at Top */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled 
            ? "bg-background/90 backdrop-blur-sm border-b border-border py-2 shadow-sm" 
            : "bg-background/60 py-3"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-2xl font-bold text-primary"
            >
              Avoy.dev
            </Link>

            {/* Theme Toggle */}
            {mounted && (
              <div className="flex items-center gap-4">
                <AnimatePresence mode="wait">
                  <motion.button
                    key={theme}
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-md bg-secondary/20 hover:bg-secondary/30 transition-colors"
                    aria-label="Toggle theme"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={fastTransition}
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.button>
                </AnimatePresence>
                
                <a 
                  href="https://drive.google.com/file/d/1n3kPVtvYiv2Idnpc6BK1Zd9vx3dIFE3f/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 cursor-pointer"
                >
                  Resume
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navbar components */}
      <NavbarDesktop 
        items={navItems} 
        activeSection={activeSection}
        fastTransition={fastTransition}
        quickSpring={quickSpring}
      />
      <NavbarMobile 
        items={navItems} 
        activeSection={activeSection}
        fastTransition={fastTransition}
        quickSpring={quickSpring}
      />
    </>
  )
}

// Desktop Navbar - Clean horizontal bar at bottom of screen
const NavbarDesktop = ({
  items,
  activeSection,
  fastTransition,
  quickSpring
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  activeSection: string;
  fastTransition: TransitionConfig;
  quickSpring: TransitionConfig;
}) => {
  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={fastTransition}
    >
      <nav className="flex items-center justify-center gap-5 p-3 rounded-xl bg-card/95 backdrop-blur-sm border border-border shadow-md">
        <LayoutGroup id="desktop-nav">
          {items.map((item) => (
            <NavItemDesktop
              key={item.title}
              item={item}
              isActive={activeSection === item.href.replace('#', '')}
              fastTransition={fastTransition}
              quickSpring={quickSpring}
            />
          ))}
        </LayoutGroup>
      </nav>
    </motion.div>
  );
};

// Desktop Navigation Item
const NavItemDesktop = ({ 
  item, 
  isActive,
  fastTransition,
  quickSpring
}: { 
  item: { title: string; icon: React.ReactNode; href: string };
  isActive: boolean;
  fastTransition: TransitionConfig;
  quickSpring: TransitionConfig;
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(item.href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link href={item.href} onClick={handleNavClick} className="group flex flex-col items-center gap-2">
      <div className="relative w-12 h-12">
        {/* Background animation - simple and quick */}
        {isActive && (
          <motion.div
            layoutId="activeBackgroundDesktop"
            className="absolute inset-0 bg-primary rounded-xl shadow-md"
            transition={quickSpring}
          />
        )}
        
        <motion.div 
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center relative z-10",
            isActive
              ? "text-primary-foreground" 
              : "bg-secondary/10 text-foreground/80 hover:bg-secondary/20"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={fastTransition}
        >
          <div className="w-5 h-5">
            {item.icon}
          </div>
        </motion.div>
      </div>
      
      <span className={cn(
        "text-xs font-medium transition-colors duration-200", 
        isActive ? "text-primary" : "text-foreground/70"
      )}>
        {item.title}
      </span>
    </Link>
  );
};

// Mobile Navbar - Fixed at bottom
const NavbarMobile = ({
  items,
  activeSection,
  fastTransition,
  quickSpring
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  activeSection: string;
  fastTransition: TransitionConfig;
  quickSpring: TransitionConfig;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#mobile-navbar') && !target.closest('#mobile-navbar-toggle')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Main bottom nav */}
      <motion.nav 
        className="flex items-center justify-between px-8 py-4 bg-background border-t border-border shadow-sm"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={fastTransition}
      >
        <LayoutGroup id="mobile-nav-main">
          {items.slice(0, 4).map((item) => (
            <NavItemMobile
              key={item.title}
              item={item}
              isActive={activeSection === item.href.replace('#', '')}
              onClick={() => setIsOpen(false)}
              fastTransition={fastTransition}
              quickSpring={quickSpring}
            />
          ))}
        
          {/* Menu toggle button */}
          <button
            id="mobile-navbar-toggle"
            className="flex flex-col items-center justify-center gap-1.5 text-foreground/70 relative"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <motion.div 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/20 mb-0.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={fastTransition}
            >
              <Menu className="w-5 h-5" />
            </motion.div>
            <span className="text-xs font-medium">More</span>
            {/* Indicator dot for active sections in hidden menu */}
            {(activeSection === 'timeline' || activeSection === 'contact') && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full" />
            )}
          </button>
        </LayoutGroup>
      </motion.nav>

      {/* Expandable menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navbar"
            className="flex justify-evenly gap-5 p-5 bg-background border-t border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={fastTransition}
          >
            <LayoutGroup id="mobile-nav-expanded">
              {items.slice(4).map((item) => (
                <NavItemMobile
                  key={item.title}
                  item={item}
                  isActive={activeSection === item.href.replace('#', '')}
                  onClick={() => setIsOpen(false)}
                  fastTransition={fastTransition}
                  quickSpring={quickSpring}
                />
              ))}
            </LayoutGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Navigation Item
const NavItemMobile = ({ 
  item, 
  isActive,
  onClick,
  fastTransition,
  quickSpring
}: { 
  item: { title: string; icon: React.ReactNode; href: string };
  isActive: boolean;
  onClick: () => void;
  fastTransition: TransitionConfig;
  quickSpring: TransitionConfig;
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick();
    const target = document.querySelector(item.href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link href={item.href} onClick={handleNavClick} className="flex flex-col items-center gap-1.5">
      <div className="relative w-10 h-10">
        {/* Background animation */}
        {isActive && (
          <motion.div
            layoutId={`activeBackground${item.title}`}
            className="absolute inset-0 bg-primary rounded-xl shadow-md"
            transition={quickSpring}
          />
        )}
        
        <motion.div 
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center relative z-10",
            isActive
              ? "text-primary-foreground" 
              : "bg-secondary/10 text-foreground/80 hover:bg-secondary/20"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={fastTransition}
        >
          <div className="w-5 h-5">
            {item.icon}
          </div>
        </motion.div>
      </div>
      
      <span className={cn(
        "text-xs font-medium transition-colors duration-200", 
        isActive ? "text-primary" : "text-foreground/70"
      )}>
        {item.title}
      </span>
    </Link>
  );
};

