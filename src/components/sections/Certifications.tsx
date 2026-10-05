import { usePortfolioData } from '@/context/PortfolioProvider'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SectionStatus } from '@/components/common/SectionStatus'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Award, ExternalLink } from 'lucide-react'
import { parseCertification } from '@/lib/portfolioView'

export function Certifications() {
  const { loading, error, about, certifications } = usePortfolioData()
  const certificationsDocument = about.find((document) => document.category === 'certification')
  const credentials = certifications.map(parseCertification)

  return (
    <section id="certifications" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Certifications"
          title={certificationsDocument?.title ?? 'Professional Credentials'}
          description="Industry-recognized certifications validating expertise in integration and cloud technologies."
        />

        <SectionStatus loading={loading} error={error} />

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-6">
            {credentials.map((cert, i) => (
              <ScrollReveal key={cert.title} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 lg:p-8 hover:glow-blue transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="glass rounded-xl p-3 group-hover:glow-blue transition-all">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      {cert.year && (
                        <span className="text-xs text-muted-foreground">{cert.year}</span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-2 leading-snug">
                      {cert.title}
                    </h3>
                    {cert.issuer && <p className="text-sm text-primary mb-4">{cert.issuer}</p>}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      <ExternalLink className="w-3 h-3" />
                      <span>Verified Credential</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
