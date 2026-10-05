interface SuggestedPromptsProps {
  prompts: readonly string[]
  disabled?: boolean
  onSelect: (prompt: string) => void
}

export function SuggestedPrompts({
  prompts,
  disabled = false,
  onSelect,
}: SuggestedPromptsProps) {
  if (prompts.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="glass rounded-full px-4 py-2 text-left text-sm text-foreground/90 hover:border-white/20 hover:glow-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 transition-all duration-300 cursor-pointer"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}
