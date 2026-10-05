import { cn } from '@/lib/utils'
import type { ChatSource } from '@/lib/portfolioAi'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  sources?: ChatSource[]
}

export function ChatMessage({ role, content, sources = [] }: ChatMessageProps) {
  const isUser = role === 'user'
  const visibleSources = sources.filter((source) => source.title)

  return (
    <article
      className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
      aria-label={isUser ? 'You' : 'AI Portfolio Assistant'}
    >
      <div
        className={cn(
          'max-w-[92%] sm:max-w-[80%] rounded-2xl px-4 py-3',
          isUser ? 'bg-primary/15 border border-primary/25' : 'glass'
        )}
      >
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">
          {isUser ? 'You' : 'Assistant'}
        </p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{content}</p>
        {!isUser && visibleSources.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Sources">
            {visibleSources.map((source) => (
              <li
                key={`${source.url}|${source.title}`}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground"
              >
                {source.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
