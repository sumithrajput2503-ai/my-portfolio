import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChatMessage } from '@/components/ai-chat/ChatMessage'
import { SuggestedPrompts } from '@/components/ai-chat/SuggestedPrompts'
import {
  advancePromptIndexes,
  initialPromptIndexes,
  visiblePrompts,
} from '@/components/ai-chat/promptLanes'
import {
  PORTFOLIO_ASSISTANT_ERROR,
  sendPortfolioQuestion,
  type ChatSource,
} from '@/lib/portfolioAi'

interface ConversationMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: ChatSource[]
}

export function AIChat() {
  const inputId = useId()
  const headingId = useId()
  const descriptionId = useId()
  const transcriptRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const pendingRef = useRef(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [promptIndexes, setPromptIndexes] = useState(initialPromptIndexes)
  const prompts = visiblePrompts(promptIndexes)

  const hasConversation = messages.length > 0 || loading

  useEffect(() => {
    const transcript = transcriptRef.current
    if (!transcript) return
    transcript.scrollTo({ top: transcript.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, error])

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const resetConversation = () => {
    abortRef.current?.abort()
    abortRef.current = null
    pendingRef.current = false
    setMessages([])
    setConversationId(null)
    setQuestion('')
    setError('')
    setLoading(false)
    setPromptIndexes(initialPromptIndexes())
  }

  const ask = async (rawQuestion: string) => {
    const nextQuestion = rawQuestion.trim()
    if (!nextQuestion || pendingRef.current) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    pendingRef.current = true

    setQuestion('')
    setError('')
    setLoading(true)
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', content: nextQuestion },
    ])

    try {
      const response = await sendPortfolioQuestion(
        nextQuestion,
        conversationId,
        controller.signal
      )
      if (controller.signal.aborted) return
      setConversationId(response.conversationId)
      setPromptIndexes((current) => advancePromptIndexes(current, nextQuestion))
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.answer,
          sources: response.sources,
        },
      ])
    } catch {
      if (controller.signal.aborted) return
      setError(PORTFOLIO_ASSISTANT_ERROR)
    } finally {
      if (abortRef.current === controller && !controller.signal.aborted) {
        pendingRef.current = false
        setLoading(false)
      }
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void ask(question)
  }

  return (
    <section
      id="ask"
      aria-labelledby={headingId}
      className="relative px-4 sm:px-6 lg:px-8 pt-4 pb-24 md:pb-32"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="glass glow-blue rounded-2xl p-6 sm:p-8"
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
                AI Portfolio Assistant
              </p>
              <h2
                id={headingId}
                className="mb-3 text-3xl font-bold tracking-tight text-gradient md:text-4xl"
              >
                Ask Anything About Me
              </h2>
              <p id={descriptionId} className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                Explore my experience, skills, projects, and architecture work through an
                AI-powered conversation.
              </p>
            </div>
            {hasConversation && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetConversation}
                className="self-start sm:self-auto"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                New conversation
              </Button>
            )}
          </div>

          {hasConversation && (
            <div
              ref={transcriptRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              aria-busy={loading}
              aria-label="Conversation with the AI portfolio assistant"
              className="mb-6 max-h-80 space-y-3 overflow-y-auto pr-1 sm:max-h-96"
            >
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  sources={message.sources}
                />
              ))}
              {loading && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                  Thinking...
                </p>
              )}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-describedby={descriptionId}
          >
            <div className="space-y-2">
              <Label htmlFor={inputId}>Your question</Label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  id={inputId}
                  name="question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Ask me about my experience, projects, skills..."
                  autoComplete="off"
                  disabled={loading}
                  maxLength={2000}
                  className="min-w-0 flex-1"
                />
                <Button
                  type="submit"
                  disabled={loading || question.trim().length === 0}
                  className="w-full shrink-0 sm:w-auto"
                  aria-label="Send question"
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send
                </Button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            <SuggestedPrompts
              prompts={prompts}
              disabled={loading}
              onSelect={(prompt) => void ask(prompt)}
            />
          </form>
        </motion.div>
      </div>
    </section>
  )
}
