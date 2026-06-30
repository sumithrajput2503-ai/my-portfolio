import { Brain, Network, Shield, Sparkles } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { TiltCard } from '@/components/common/TiltCard'

const iconMap = {
  brain: Brain,
  shield: Shield,
  network: Network,
  sparkles: Sparkles,
}

function ProjectIllustration({ type }: { type: string }) {
  const Icon = iconMap[type as keyof typeof iconMap] || Network

  return (
    <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary/5 to-transparent flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 400 200"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 25}
            x2="400"
            y2={i * 25}
            stroke="url(#grid-grad)"
            strokeWidth="0.5"
          />
        ))}
        {[...Array(16)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 25}
            y1="0"
            x2={i * 25}
            y2="200"
            stroke="url(#grid-grad)"
            strokeWidth="0.5"
          />
        ))}
        <circle cx="200" cy="100" r="60" stroke="#3B82F6" strokeWidth="0.5" opacity="0.4" />
        <circle cx="200" cy="100" r="90" stroke="#3B82F6" strokeWidth="0.3" opacity="0.2" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = 200 + 60 * Math.cos(rad)
          const y = 100 + 60 * Math.sin(rad)
          return (
            <g key={i}>
              <line x1="200" y1="100" x2={x} y2={y} stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
              <circle cx={x} cy={y} r="3" fill="#3B82F6" opacity="0.6" />
            </g>
          )
        })}
      </svg>
      <div className="relative z-10 glass rounded-2xl p-5 glow-blue">
        <Icon className="w-10 h-10 text-primary" />
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Featured Projects"
          title="Enterprise Impact"
          description="Selected projects showcasing integration architecture, AI innovation, and cloud-native solutions."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <TiltCard>
                <article
                  className={`glass rounded-2xl overflow-hidden group hover:glow-blue transition-all duration-500 bg-gradient-to-br ${project.gradient}`}
                >
                  <ProjectIllustration type={project.icon} />
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs glass rounded-full px-3 py-1 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
