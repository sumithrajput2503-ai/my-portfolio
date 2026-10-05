import {
  Brain,
  Building2,
  Car,
  HardHat,
  Network,
  Plane,
  Shield,
  Sparkles,
} from 'lucide-react'
import { usePortfolioData } from '@/context/PortfolioProvider'
import type { CaseStudy, Project } from '@/types/experienceApi'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SectionStatus } from '@/components/common/SectionStatus'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { TiltCard } from '@/components/common/TiltCard'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { caseStudyForProject, scaleEntries } from '@/lib/portfolioView'

const iconMap = {
  brain: Brain,
  building: Building2,
  car: Car,
  hardhat: HardHat,
  network: Network,
  plane: Plane,
  shield: Shield,
  sparkles: Sparkles,
}

const cardGradients = [
  'from-slate-600/20 via-blue-500/10 to-zinc-500/20',
  'from-emerald-600/20 via-blue-500/10 to-teal-500/20',
  'from-violet-600/20 via-blue-500/10 to-purple-500/20',
  'from-sky-600/20 via-blue-500/10 to-indigo-500/20',
  'from-red-600/20 via-rose-500/10 to-orange-500/20',
]

const cardIcons = ['car', 'hardhat', 'shield', 'plane', 'building']

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

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="text-sm text-muted-foreground flex items-start gap-2.5">
          <span className="text-primary mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function DetailBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null

  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
      <DetailList items={items} />
    </div>
  )
}

function ProjectDetails({ project, caseStudy }: { project: Project; caseStudy?: CaseStudy }) {
  const architecture = [
    ...(caseStudy?.architecture?.layers ?? []),
    ...(caseStudy?.architecture?.keySystems ?? []),
    ...(caseStudy?.architecture?.keyPlatforms ?? []),
  ]
  const scale = scaleEntries(caseStudy?.scale)

  return (
    <div className="space-y-5">
      {project.companyOverview && (
        <p className="text-sm text-muted-foreground leading-relaxed">{project.companyOverview}</p>
      )}

      <DetailBlock title="Key contributions" items={project.keyContributions} />

      {caseStudy && (
        <>
          {caseStudy.summary && (
            <p className="text-sm text-muted-foreground leading-relaxed">{caseStudy.summary}</p>
          )}
          {caseStudy.businessContext && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Business context</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{caseStudy.businessContext}</p>
            </div>
          )}
          <DetailBlock title="Challenge" items={caseStudy.challenge} />
          <DetailBlock title="Solution" items={caseStudy.solution} />
          {caseStudy.architecture?.pattern && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Architecture</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{caseStudy.architecture.pattern}</p>
            </div>
          )}
          <DetailBlock title="Architecture detail" items={architecture} />
          <DetailBlock title="Role" items={caseStudy.role} />
          <DetailBlock title="Capabilities" items={caseStudy.capabilitiesDemonstrated} />
          {scale.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Scale</h4>
              <DetailList items={scale.map((entry) => `${entry.label}: ${entry.value}`)} />
            </div>
          )}
          {caseStudy.website && (
            <a
              href={caseStudy.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {caseStudy.website}
            </a>
          )}
        </>
      )}

      {project.companyWebsite && project.companyWebsite !== caseStudy?.website && (
        <a
          href={project.companyWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          {project.companyWebsite}
        </a>
      )}
    </div>
  )
}

export function Projects() {
  const { loading, error, projects, caseStudies } = usePortfolioData()
  const matchedIds = new Set<string>()

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Featured Projects"
          title="Enterprise Impact"
          description="Client engagements showcasing enterprise integration architecture, secure API delivery, and platform modernization."
        />

        <SectionStatus loading={loading} error={error} />

        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, i) => {
              const caseStudy = caseStudyForProject(project.id, project.company, caseStudies)
              if (caseStudy) matchedIds.add(caseStudy.id)
              const gradient = cardGradients[i % cardGradients.length]
              const icon = cardIcons[i % cardIcons.length]

              return (
                <ScrollReveal key={project.id} delay={i * 0.1}>
                  <TiltCard>
                    <article
                      className={`glass rounded-2xl overflow-hidden group hover:glow-blue transition-all duration-500 bg-gradient-to-br ${gradient} h-full flex flex-col`}
                    >
                      <ProjectIllustration type={icon} />
                      <div className="p-6 lg:p-8 flex flex-col flex-1">
                        <div className="mb-3">
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-sm text-primary mt-1">{project.industry}</p>
                          <p className="text-xs text-muted-foreground mt-1">{project.company}</p>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs glass rounded-full px-3 py-1 text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                              View Responsibilities
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{project.name}</DialogTitle>
                              <DialogDescription>
                                {project.industry} · {project.company}
                              </DialogDescription>
                            </DialogHeader>
                            <ProjectDetails project={project} caseStudy={caseStudy} />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </article>
                  </TiltCard>
                </ScrollReveal>
              )
            })}

            {caseStudies
              .filter((study) => !matchedIds.has(study.id))
              .map((study, i) => {
                const index = projects.length + i
                const gradient = cardGradients[index % cardGradients.length]
                const icon = cardIcons[index % cardIcons.length]

                return (
                  <ScrollReveal key={study.id} delay={index * 0.1}>
                    <TiltCard>
                      <article
                        className={`glass rounded-2xl overflow-hidden group hover:glow-blue transition-all duration-500 bg-gradient-to-br ${gradient} h-full flex flex-col`}
                      >
                        <ProjectIllustration type={icon} />
                        <div className="p-6 lg:p-8 flex flex-col flex-1">
                          <div className="mb-3">
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                              {study.title}
                            </h3>
                            {study.industry && (
                              <p className="text-sm text-primary mt-1">{study.industry}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">{study.company}</p>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                            {study.summary}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {study.technologies.map((tech) => (
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
                )
              })}
          </div>
        )}
      </div>
    </section>
  )
}
