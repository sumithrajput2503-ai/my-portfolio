import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkillProgressProps {
  skill: string
  progress: number
  delay?: number
}

export function SkillProgress({ skill, progress, delay = 0 }: SkillProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-foreground/80">{skill}</span>
        <span className="text-primary font-medium">{progress}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full bg-gradient-to-r from-primary/80 to-primary')}
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>
    </div>
  )
}
