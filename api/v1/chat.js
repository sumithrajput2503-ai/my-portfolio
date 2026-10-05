const PROCESS_API_CHAT_URL =
  'https://portfolio-ai-process-api-np3l5c.5sc6y6-3.usa-e2.cloudhub.io/api/v1/chat'

export const config = {
  maxDuration: 60,
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Method is not allowed.' },
    })
    return
  }

  let payload = req.body
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload)
    } catch {
      payload = null
    }
  }

  if (!payload || typeof payload !== 'object' || typeof payload.question !== 'string') {
    res.status(400).json({
      error: { code: 'INVALID_REQUEST', message: 'The request is not valid.' },
    })
    return
  }

  const body = { question: payload.question }
  if (typeof payload.conversationId === 'string' && payload.conversationId.trim()) {
    body.conversationId = payload.conversationId.trim()
  }

  try {
    const upstream = await fetch(PROCESS_API_CHAT_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const text = await upstream.text()
    const contentType = upstream.headers.get('content-type')
    if (contentType) res.setHeader('Content-Type', contentType)
    res.status(upstream.status).send(text)
  } catch {
    res.status(503).json({
      error: {
        code: 'AI_SERVICE_UNAVAILABLE',
        message: 'The portfolio assistant is temporarily unavailable.',
      },
    })
  }
}
