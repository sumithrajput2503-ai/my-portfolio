import { motion } from 'framer-motion'
import { skillCategories } from '@/data/portfolio'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { SkillProgress } from '@/components/common/SkillProgress'

const skillProgressMap: Record<string, number> = {
  MuleSoft: 95,
  'API Management': 92,
  DataWeave: 90,
  CloudHub: 88,
  'Runtime Fabric': 85,
  'Anypoint Platform': 93,
  AWS: 85,
  Azure: 82,
  Terraform: 78,
  Docker: 80,
  'GitHub Actions': 83,
  FastAPI: 83,
  LangChain: 80,
  React: 80,
  'Spring Boot': 84,
  RAG: 82,
  'Vector Search': 78,
  OpenAI: 88,
  'Prompt Engineering': 90,
  'Agentic AI': 85,
  MCP: 82,
}

export function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          label="Skills"
          title="Technical Expertise"
          description="A comprehensive toolkit spanning enterprise integration, cloud platforms, frameworks, and AI technologies."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal key={category.title} delay={catIndex * 0.1}>
              <motion.div
                className="glass rounded-2xl p-6 lg:p-8 hover:glow-blue transition-all duration-500"
                whileHover={{ y: -4 }}
              >
                <h3 className="text-lg font-semibold mb-6 text-gradient-blue">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {category.skills.map((skill, i) => (
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

                <div className="space-y-4 pt-4 border-t border-white/5">
                  {category.skills.slice(0, 4).map((skill, i) => (
                    <SkillProgress
                      key={skill}
                      skill={skill}
                      progress={skillProgressMap[skill] ?? 80}
                      delay={i * 0.1}
                    />
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
