import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (reducedMotion || prefix === 'Multiple') {
      setCount(value)
      return
    }

    let start = 0
    const end = value
    const increment = end / (duration * 60)
    let frame: number

    const animate = () => {
      start += increment
      if (start < end) {
        setCount(Math.floor(start))
        frame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value, duration, reducedMotion, prefix])

  if (prefix === 'Multiple') {
    return (
      <span ref={ref} className={className}>
        Multiple
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
