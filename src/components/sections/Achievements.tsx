import { achievements } from '@/data/portfolio'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { TrendingUp, Users, Zap, Award } from 'lucide-react'

const icons = [Zap, TrendingUp, Award, Users]

export function Achievements() {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Achievements"
          title="Measurable Impact"
          description="Delivering quantifiable results across enterprise integration programs."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, i) => {
            const Icon = icons[i]
            return (
              <ScrollReveal key={item.label} delay={i * 0.1}>
                <div className="glass rounded-2xl p-8 text-center hover:glow-blue-strong transition-all duration-500 group">
                  <div className="inline-flex glass rounded-xl p-3 mb-6 group-hover:glow-blue transition-all">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <AnimatedCounter
                    value={item.value}
                    suffix={item.suffix}
                    prefix={item.prefix}
                    className="text-4xl md:text-5xl font-bold text-gradient-blue block mb-3"
                  />
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
