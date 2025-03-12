"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileText, User, Mail, Calendar, MapPin } from "lucide-react"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const handleDownloadCV = () => {
    // Open the Google Drive link in a new tab
    window.open('https://drive.google.com/file/d/1n3kPVtvYiv2Idnpc6BK1Zd9vx3dIFE3f/view?usp=sharing', '_blank')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
  }

  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "30+", label: "Happy Clients" },
    { value: "10+", label: "Awards" },
  ]

  const personalInfo = [
    { icon: <User className="w-4 h-4" />, label: "Name", value: "Avoy Baruah" },
    { icon: <Mail className="w-4 h-4" />, label: "Email", value: "avoycoc123@gamil.com" },
    { icon: <Calendar className="w-4 h-4" />, label: "Date of Birth", value: "Feb 5, 2002" },
    { icon: <MapPin className="w-4 h-4" />, label: "Location", value: "India, Assam, Guwahati" },
  ]

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/90 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-medium text-primary mb-3 tracking-wider">ABOUT ME</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Creative Developer & Designer
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image Section */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl" />
                <div className="absolute inset-0 rounded-2xl border border-primary/10" />
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image 
                    src="/hello.jpg"  
                    alt="Portrait" 
                    fill 
                    className="object-cover transition-transform duration-500 hover:scale-105" 
                    priority
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m a passionate developer and designer with a focus on creating immersive digital experiences. With over
                  5 years of experience, I specialize in building interactive websites, applications, and digital products
                  that combine aesthetic appeal with functional excellence.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My approach blends technical expertise with creative vision, allowing me to deliver solutions that not
                  only meet client requirements but exceed expectations in terms of user experience and visual impact.
                </p>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personalInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{info.label}</p>
                      <p className="text-sm font-medium">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button 
                  variant="gradient" 
                  size="lg" 
                  onClick={handleDownloadCV}
                  className="w-full sm:w-auto gap-2 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download CV
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

