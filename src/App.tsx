import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { SEO } from '@/components/layout/SEO'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { MouseFollower } from '@/components/effects/MouseFollower'
import { ParticleBackground } from '@/components/effects/ParticleBackground'
import { GradientBlobs } from '@/components/effects/GradientBlobs'

const About = lazy(() =>
  import('@/components/sections/About').then((m) => ({ default: m.About }))
)
const Experience = lazy(() =>
  import('@/components/sections/Experience').then((m) => ({ default: m.Experience }))
)
const Projects = lazy(() =>
  import('@/components/sections/Projects').then((m) => ({ default: m.Projects }))
)
const Skills = lazy(() =>
  import('@/components/sections/Skills').then((m) => ({ default: m.Skills }))
)
const Achievements = lazy(() =>
  import('@/components/sections/Achievements').then((m) => ({ default: m.Achievements }))
)
const Certifications = lazy(() =>
  import('@/components/sections/Certifications').then((m) => ({ default: m.Certifications }))
)
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact }))
)

function LazySection({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="section-padding flex justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <SEO />
      <div className="relative min-h-screen">
        <GradientBlobs />
        <ParticleBackground />
        <MouseFollower />
        <Header />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <LazySection>
            <About />
          </LazySection>
          <LazySection>
            <Experience />
          </LazySection>
          <LazySection>
            <Projects />
          </LazySection>
          <LazySection>
            <Skills />
          </LazySection>
          <LazySection>
            <Achievements />
          </LazySection>
          <LazySection>
            <Certifications />
          </LazySection>
          <LazySection>
            <Contact />
          </LazySection>
        </motion.main>

        <Footer />
      </div>
    </HelmetProvider>
  )
}
