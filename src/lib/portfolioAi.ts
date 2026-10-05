const CONNECTION_ERROR =
  "Sorry, I couldn't connect to my AI assistant right now. Please try again."

const REQUEST_TIMEOUT_MS = 60_000

export interface ChatSource {
  title: string
  type: string
  url: string
}

export interface ChatResponse {
  conversationId: string
  answer: string
  sources: ChatSource[]
}

function apiBaseUrl(): string {
  const configured = import.meta.env.VITE_AI_API_BASE_URL?.trim() ?? ''
  return configured.replace(/\/$/, '')
}

function readSources(value: unknown): ChatSource[] {
  if (!Array.isArray(value)) return []

  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const source = item as Record<string, unknown>
    const title = typeof source.title === 'string' ? source.title.trim() : ''
    const type = typeof source.type === 'string' ? source.type : ''
    const url = typeof source.url === 'string' ? source.url : ''
    if (!title && !url) return []
    return [{ title, type, url }]
  })
}

function readChatResponse(value: unknown): ChatResponse | null {
  if (!value || typeof value !== 'object') return null
  const body = value as Record<string, unknown>
  const conversationId =
    typeof body.conversationId === 'string' ? body.conversationId.trim() : ''
  const answer = typeof body.answer === 'string' ? body.answer.trim() : ''
  if (!conversationId || !answer) return null
  return {
    conversationId,
    answer,
    sources: readSources(body.sources),
  }
}

export async function sendPortfolioQuestion(
  question: string,
  conversationId: string | null,
  signal?: AbortSignal
): Promise<ChatResponse> {
  const payload: { question: string; conversationId?: string } = { question }
  if (conversationId) payload.conversationId = conversationId

  const timeout = new AbortController()
  const timeoutId = window.setTimeout(() => timeout.abort(), REQUEST_TIMEOUT_MS)
  const onAbort = () => timeout.abort()
  signal?.addEventListener('abort', onAbort)

  try {
    const response = await fetch(`${apiBaseUrl()}/api/v1/chat`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: timeout.signal,
    })

    if (!response.ok) {
      throw new Error(CONNECTION_ERROR)
    }

    const data: unknown = await response.json().catch(() => null)
    const chat = readChatResponse(data)
    if (!chat) {
      throw new Error(CONNECTION_ERROR)
    }
    return chat
  } catch (error) {
    if (signal?.aborted) {
      throw error
    }
    throw new Error(CONNECTION_ERROR)
  } finally {
    window.clearTimeout(timeoutId)
    signal?.removeEventListener('abort', onAbort)
  }
}

export const PORTFOLIO_ASSISTANT_ERROR = CONNECTION_ERROR
