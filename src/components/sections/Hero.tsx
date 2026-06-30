import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { personalInfo } from '@/data/portfolio'
import { MagneticButton } from '@/components/common/MagneticButton'
import { Button } from '@/components/ui/button'
import { scrollToSection } from '@/lib/utils'
import { FloatingIcons } from '@/components/effects/FloatingIcons'

const NetworkGlobe = lazy(() =>
  import('@/components/effects/NetworkGlobe').then((m) => ({
    default: m.NetworkGlobe,
  }))
)

const headlines = [
  'Integration Engineer',
  'MuleSoft Specialist',
  'AI Product Engineer',
]

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden"
    >
      <FloatingIcons />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Available for new opportunities
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="sm:hidden mb-8 mx-auto max-w-[220px]"
            >
              <div className="glass rounded-2xl p-1.5 glow-blue overflow-hidden">
                <img
                  src={personalInfo.profilePhoto}
                  alt={personalInfo.profilePhotoAlt}
                  className="w-full aspect-[3/4] object-cover object-top rounded-xl"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              <span className="text-gradient">{personalInfo.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-2 mb-8"
            >
              {headlines.map((line, i) => (
                <p
                  key={line}
                  className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {line}
                </p>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
            >
              {personalInfo.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton>
                <Button size="lg" onClick={() => scrollToSection('projects')}>
                  View Projects
                </Button>
              </MagneticButton>
              <MagneticButton
                as="a"
                href={personalInfo.resumeUrl}
                download="Sumith_Singh_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 text-base rounded-full border border-white/10 bg-transparent hover:bg-white/5 hover:border-white/20 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </MagneticButton>
              <MagneticButton>
                <Button
                  variant="glass"
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                >
                  <Mail className="w-4 h-4" />
                  Let's Connect
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[420px] lg:h-[560px] hidden sm:block"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-30 pointer-events-none">
              <Suspense fallback={null}>
                <NetworkGlobe />
              </Suspense>
            </div>

            <div className="absolute inset-0 rounded-3xl glass glow-blue-strong overflow-hidden border border-white/10 p-1.5">
              <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden">
                <img
                  src={personalInfo.profilePhoto}
                  alt={personalInfo.profilePhotoAlt}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.25rem]" />
              </div>
            </div>

            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 pointer-events-none" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
