import { motion } from 'framer-motion'

interface SectionHeadingProps {
  label: string
  title: string
  description?: string
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="mb-16 md:mb-20"
    >
      <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
        {label}
      </span>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl">{description}</p>
      )}
    </motion.div>
  )
}
