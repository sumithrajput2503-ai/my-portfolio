import { Mail } from 'lucide-react'
import { LinkedInIcon } from '@/components/icons/SocialIcons'
import { Marquee } from '@/components/common/Marquee'
import { usePortfolioData } from '@/context/PortfolioProvider'
import { fullName } from '@/lib/portfolioView'

export function Footer() {
  const year = new Date().getFullYear()
  const { profile } = usePortfolioData()
  const name = profile ? fullName(profile) : ''
  const technologies = profile?.selectedTechnologyEcosystem ?? []

  return (
    <footer className="relative border-t border-white/5">
      {technologies.length > 0 && (
        <div className="py-8 border-b border-white/5">
          <Marquee items={technologies} speed={40} />
        </div>
      )}

      <div className="container-custom section-padding pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            {profile?.valueProposition && (
              <p className="text-lg font-medium text-gradient-blue mb-2">
                {profile.valueProposition}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              © {year}{name ? ` ${name}` : ''}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="glass p-3 rounded-full hover:glow-blue transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
            )}
            {profile?.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-full hover:glow-blue transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
