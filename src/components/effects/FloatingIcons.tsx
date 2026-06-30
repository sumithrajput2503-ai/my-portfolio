import { motion } from 'framer-motion'
import {
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Server,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const icons = [
  { Icon: Cloud, x: '10%', y: '20%', delay: 0 },
  { Icon: Code2, x: '85%', y: '15%', delay: 0.5 },
  { Icon: Database, x: '75%', y: '70%', delay: 1 },
  { Icon: GitBranch, x: '15%', y: '75%', delay: 1.5 },
  { Icon: Layers, x: '90%', y: '45%', delay: 0.8 },
  { Icon: Server, x: '5%', y: '50%', delay: 1.2 },
  { Icon: Sparkles, x: '50%', y: '10%', delay: 0.3 },
  { Icon: Workflow, x: '60%', y: '85%', delay: 1.8 },
]

export function FloatingIcons() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {icons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute glass rounded-xl p-3 glow-blue"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            reducedMotion
              ? { opacity: 0.3, scale: 1 }
              : {
                  opacity: [0.2, 0.5, 0.2],
                  y: [0, -15, 0],
                  scale: 1,
                }
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }
          }
        >
          <Icon className="w-5 h-5 text-primary/60" />
        </motion.div>
      ))}
    </div>
  )
}
