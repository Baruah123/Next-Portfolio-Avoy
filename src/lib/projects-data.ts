export type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Examination Platform",
    description:
      " A secure, responsive platform for online exams with real-time feedback, timers, and result tracking.",
    image: "/NewExam.jpg",
    tags: ["React", "Cloudinary ", "Express", "MongoDB","Node.js"],
    demoUrl: "https://exam-master-pearl.vercel.app/",
    githubUrl: "https://github.com/Baruah123/Exam-Master",
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with product filtering, cart functionality, and checkout process.",
    image: "/ecommerce.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "AI Content Generator",
    description:
      "A content generation tool powered by AI, allowing users to create blog posts, social media content, and more.",
    image: "/Ai.png",
    tags: ["Next.js", "OpenAI", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://ai-content-generator-seven-delta.vercel.app/",
    githubUrl: "https://github.com/Baruah123/Next-Portfolio-Avoy",
    featured: false,
  },
  {
    id: 4,
    title: "Dashboard UI Kit",
    description: "A comprehensive dashboard UI kit with over 50 components, dark mode support, and responsive design.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Tailwind CSS", "Storybook", "Figma"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Music Streaming App",
    description:
      "A Spotify-like music streaming application with playlist creation, user authentication, and audio visualization.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Travel Blog Platform",
    description:
      "A platform for travel enthusiasts to share their experiences, with location tagging and interactive maps.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "GraphQL", "Mapbox", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
] 