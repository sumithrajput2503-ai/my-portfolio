interface SectionStatusProps {
  loading: boolean
  error: string | null
}

export function SectionStatus({ loading, error }: SectionStatusProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-16" role="status" aria-live="polite">
        <span className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="sr-only">Loading portfolio information</span>
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-center text-sm text-muted-foreground py-16" role="alert">
        {error}
      </p>
    )
  }

  return null
}
