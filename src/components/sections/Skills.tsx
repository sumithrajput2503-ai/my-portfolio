import { motion } from 'framer-motion'
import { usePortfolioData } from '@/context/PortfolioProvider'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SectionStatus } from '@/components/common/SectionStatus'
import { ScrollReveal } from '@/components/common/ScrollReveal'

export function Skills() {
  const { loading, error, skills } = usePortfolioData()

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          label="Skills"
          title="Technical Expertise"
          description="A comprehensive toolkit spanning enterprise integration, cloud platforms, frameworks, and AI technologies."
        />

        <SectionStatus loading={loading} error={error} />

        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {skills.map((category, catIndex) => (
              <ScrollReveal key={category.category} delay={catIndex * 0.1}>
                <motion.div
                  className="glass rounded-2xl p-6 lg:p-8 hover:glow-blue transition-all duration-500"
                  whileHover={{ y: -4 }}
                >
                  <h3 className="text-lg font-semibold mb-6 text-gradient-blue">
                    {category.category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="text-sm glass rounded-full px-4 py-2 cursor-default hover:glow-blue transition-all duration-300"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
