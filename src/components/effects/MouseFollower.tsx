import { motion } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function MouseFollower() {
  const { x, y } = useMousePosition()
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none z-0 opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          x: x - 192,
          y: y - 192,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-screen hidden md:block"
        style={{
          background: 'rgba(59,130,246,0.6)',
          boxShadow: '0 0 20px rgba(59,130,246,0.4)',
          x: x - 8,
          y: y - 8,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </>
  )
}
