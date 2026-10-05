import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePortfolioData } from '@/context/PortfolioProvider'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SectionStatus } from '@/components/common/SectionStatus'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Briefcase } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { projectForEmployer } from '@/lib/portfolioView'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { loading, error, profile, experience, projects } = usePortfolioData()
  const roles = useMemo(
    () => experience.filter((job) => job.id !== 'career-timeline'),
    [experience],
  )

  useEffect(() => {
    if (reducedMotion || !timelineRef.current || roles.length === 0) return

    const items = timelineRef.current.querySelectorAll('.timeline-item')
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [reducedMotion, roles])

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Experience"
          title="Professional Journey"
          description="A track record of delivering enterprise integration solutions across global organizations."
        />

        <SectionStatus loading={loading} error={error} />

        {!loading && !error && (
          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-px" />

            {roles.map((job, i) => {
              const current = profile?.currentCompany === job.title
              const role = current ? profile?.currentRole : job.industry
              const technologies = job.technologies ?? []
              const project = projectForEmployer(job.title, projects)
              const responsibilities =
                project?.keyContributions ??
                (current ? profile?.currentResponsibilities : undefined) ??
                []

              return (
                <div
                  key={job.id}
                  className={`timeline-item relative flex flex-col md:flex-row gap-8 mb-12 ${
                    i % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />

                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary glow-blue md:-translate-x-1.5 mt-2 z-10">
                    {current && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                    )}
                  </div>

                  <div className={`md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <ScrollReveal delay={i * 0.1}>
                      <div className="glass rounded-2xl p-6 hover:glow-blue transition-all duration-500 group">
                        <div className="flex items-start justify-between mb-4 gap-3">
                          <div className="flex items-center gap-3">
                            <div className="glass rounded-lg p-2 group-hover:glow-blue transition-all">
                              <Briefcase className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                              {role && <p className="text-primary text-sm">{role}</p>}
                            </div>
                          </div>
                          {current && profile?.currentPeriod && (
                            <span className="text-xs text-muted-foreground glass rounded-full px-3 py-1 shrink-0">
                              {profile.currentPeriod}
                            </span>
                          )}
                        </div>

                        {current && profile?.currentProject && (
                          <p className="text-sm text-muted-foreground mb-3">
                            Project: <span className="text-foreground/80">{profile.currentProject}</span>
                          </p>
                        )}

                        <p className="text-sm text-muted-foreground leading-relaxed">{job.text}</p>

                        {technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {technologies.map((technology) => (
                              <span
                                key={technology}
                                className="text-xs glass rounded-full px-3 py-1 text-muted-foreground"
                              >
                                {technology}
                              </span>
                            ))}
                          </div>
                        )}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full mt-5">
                              View Responsibilities
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{job.title}</DialogTitle>
                              <DialogDescription>
                                {[role, project?.name].filter(Boolean).join(' · ')}
                              </DialogDescription>
                            </DialogHeader>
                            <ul className="space-y-2.5">
                              {responsibilities.map((item) => (
                                <li
                                  key={item}
                                  className="text-sm text-muted-foreground flex items-start gap-2.5"
                                >
                                  <span className="text-primary mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
                                  <span className="leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
