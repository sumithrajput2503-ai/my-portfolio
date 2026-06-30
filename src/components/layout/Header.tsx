import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/data/portfolio'
import { cn, scrollToSection } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href: string) => {
    scrollToSection(href.replace('#', ''))
    setMobileOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'glass-strong py-3' : 'py-5 bg-transparent'
      )}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('hero')}
          className="text-lg font-bold tracking-tight hover:text-primary transition-colors cursor-pointer"
          aria-label="Go to top"
        >
          SK<span className="text-primary">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group cursor-pointer"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNav('#contact')}
          >
            Let's Connect
          </Button>
        </div>

        <button
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/5 mt-3"
          >
            <nav className="flex flex-col p-4 gap-2" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="default"
                className="mt-2"
                onClick={() => handleNav('#contact')}
              >
                Let's Connect
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
