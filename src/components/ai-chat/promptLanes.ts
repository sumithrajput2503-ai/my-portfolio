const PROMPT_LANES = [
  [
    'Where is Sumith working now?',
    'Tell me about the Contact and Consent project',
    'What are his responsibilities on the Volvo consent project?',
  ],
  [
    'Tell me about his MuleSoft experience',
    'What is his experience with API-led connectivity?',
    'Has he worked with CloudHub 2.0?',
  ],
  [
    'What projects has he worked on?',
    'Tell me about the ABC Supply project',
    'Has he worked on retail integration?',
  ],
  [
    'What is his experience with Azure and AI?',
    'What AI and agentic AI work has he done?',
    'What Salesforce integration experience does he have?',
  ],
] as const

export function initialPromptIndexes(): number[] {
  return PROMPT_LANES.map(() => 0)
}

export function visiblePrompts(indexes: readonly number[]): string[] {
  return PROMPT_LANES.flatMap((lane, laneIndex) => {
    const prompt = lane[indexes[laneIndex] ?? 0]
    return prompt ? [prompt] : []
  })
}

function normalizeQuestion(question: string): string {
  return question.trim().toLowerCase()
}

export function advancePromptIndexes(indexes: readonly number[], asked: string): number[] {
  const normalized = normalizeQuestion(asked)
  return indexes.map((index, laneIndex) => {
    const current = PROMPT_LANES[laneIndex]?.[index]
    if (current && normalizeQuestion(current) === normalized) return index + 1
    return index
  })
}
