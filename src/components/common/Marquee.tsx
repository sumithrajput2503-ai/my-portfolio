import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  speed?: number
  className?: string
}

export function Marquee({ items, speed = 30, className }: MarqueeProps) {
  const duplicated = [...items, ...items]

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
      <div
        className="flex gap-8 animate-marquee whitespace-nowrap"
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-sm font-medium text-muted-foreground/60 tracking-wide uppercase px-4"
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  )
}
