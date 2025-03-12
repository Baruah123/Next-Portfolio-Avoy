import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Projects from "@/components/sections/projects"
import Skills from "@/components/sections/skills"
import Timeline from "@/components/sections/timeline"
import Testimonials from "@/components/sections/testimonials"
import Contact from "@/components/sections/contact"
import Marquee from "@/components/ui/marquee"

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Testimonials />
      <Contact />
    </main>
  )
}

