import { stats, aboutSpecializations } from '@/data/portfolio'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { GlassCard } from '@/components/common/GlassCard'
import { CheckCircle2 } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="About Me"
          title="Crafting Enterprise Solutions"
          description="Integration Engineer with 7 years of experience designing enterprise integration solutions using MuleSoft, API-led Connectivity, AWS, Azure and AI technologies across Retail, Insurance, Manufacturing and Travel domains."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">I specialize in:</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {aboutSpecializations.map((item, i) => (
                  <ScrollReveal key={item} delay={i * 0.05}>
                    <div className="flex items-center gap-3 glass rounded-xl px-4 py-3 hover:glow-blue transition-all duration-300">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground/90">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <GlassCard key={stat.label} className="text-center">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-3xl md:text-4xl font-bold text-gradient-blue block mb-2"
                  />
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </GlassCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
