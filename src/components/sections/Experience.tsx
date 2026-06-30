import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/data/portfolio'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Briefcase } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !timelineRef.current) return

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
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [reducedMotion])

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Experience"
          title="Professional Journey"
          description="A track record of delivering enterprise integration solutions across global organizations."
        />

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-px" />

          {experience.map((job, i) => (
            <div
              key={job.company}
              className={`timeline-item relative flex flex-col md:flex-row gap-8 mb-12 ${
                i % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="hidden md:block md:w-1/2" />

              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary glow-blue md:-translate-x-1.5 mt-2 z-10">
                {job.current && (
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                )}
              </div>

              <div className={`md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <ScrollReveal delay={i * 0.1}>
                  <div className="glass rounded-2xl p-6 hover:glow-blue transition-all duration-500 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="glass rounded-lg p-2 group-hover:glow-blue transition-all">
                          <Briefcase className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{job.company}</h3>
                          <p className="text-primary text-sm">{job.role}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground glass rounded-full px-3 py-1 shrink-0">
                        {job.current ? 'Current' : job.period}
                      </span>
                    </div>

                    {job.project && (
                      <p className="text-sm text-muted-foreground mb-3">
                        Project: <span className="text-foreground/80">{job.project}</span>
                      </p>
                    )}

                    <ul className="space-y-2">
                      {job.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
