import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  as?: 'button' | 'a'
  href?: string
  download?: string
  type?: 'button' | 'submit'
}

export function MagneticButton({
  children,
  className,
  onClick,
  as = 'button',
  href,
  download,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.2, y: y * 0.2 })
  }

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 })

  const Component = as === 'a' ? motion.a : motion.button

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="inline-block"
    >
      <Component
        className={cn(className)}
        onClick={onClick}
        href={href}
        download={download}
        type={as === 'button' ? type : undefined}
        target={as === 'a' && href?.startsWith('http') ? '_blank' : undefined}
        rel={as === 'a' && href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Component>
    </motion.div>
  )
}
