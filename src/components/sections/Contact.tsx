import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
} from 'lucide-react'
import { LinkedInIcon } from '@/components/icons/SocialIcons'
import { personalInfo } from '@/data/portfolio'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { MagneticButton } from '@/components/common/MagneticButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const contactItems = [
  { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
  { icon: LinkedInIcon, label: 'LinkedIn', value: 'Connect on LinkedIn', href: personalInfo.linkedin },
  { icon: MapPin, label: 'Location', value: personalInfo.location, href: undefined },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(personalInfo.formspreeUrl, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      form.reset()
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Contact"
          title="Let's Build Together"
          description="Ready to discuss your next integration challenge or AI product initiative? Reach out."
        />

        <div className="grid lg:grid-cols-5 gap-12">
          <ScrollReveal className="lg:col-span-2">
            <div className="space-y-4">
              {contactItems.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 glass rounded-xl p-4 hover:glow-blue transition-all duration-300 group"
                    >
                      <div className="glass rounded-lg p-2.5 group-hover:glow-blue transition-all">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 glass rounded-xl p-4">
                      <div className="glass rounded-lg p-2.5">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:col-span-3">
            <div className="glass rounded-2xl p-6 lg:p-8 glow-blue">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Integration project inquiry"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-400" role="alert">
                      {error}
                    </p>
                  )}
                  <MagneticButton>
                    <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
