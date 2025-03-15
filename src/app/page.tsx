import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Projects from "@/components/sections/projects"
import Skills from "@/components/sections/skills"
import Timeline from "@/components/sections/timeline"
import Testimonials from "@/components/sections/testimonials"
import Contact from "@/components/sections/contact"
import Marquee from "@/components/ui/marquee"
import { MacbookScroll } from "@/components/Laptop"

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
          <div className="absolute right-0 bottom-0 -z-10 m-auto h-[250px] w-[250px] rounded-full bg-cyan-400 opacity-20 blur-[100px]"></div>
        </div>
        
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 text-center">
              Featured Project
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
              Take a closer look at my work on the latest interface design project. 
              <span className="hidden sm:inline"> This project showcases clean design principles, responsive layouts, and attention to detail.</span>
            </p>
          </div>

          <div className="relative h-[120vh]">
            <MacbookScroll 
              src="/screen.png"
              title={null}
              showGradient={false}
              badge={
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg shadow-xl">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">UI/UX Design</span>
                    <span className="text-xs text-white/70">Next.js • Tailwind CSS</span>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>
      <Testimonials />
      <Contact />
    </main>
  )
}

