import type { CaseStudy, Profile, Project } from '@/types/experienceApi'

export function fullName(profile: Pick<Profile, 'firstName' | 'lastName'>) {
  return `${profile.firstName} ${profile.lastName}`.trim()
}

export function titleLines(title: string) {
  return title
    .split(/\s*·\s*/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export function parsePortfolioStat(stat: string) {
  const match = stat.trim().match(/^(\d+)(\+|%)?\s+(.+)$/)
  if (!match) return null

  const label = match[3]
  return {
    value: Number(match[1]),
    suffix: match[2] ?? '',
    label: label.charAt(0).toUpperCase() + label.slice(1),
  }
}

export function parseCertification(certification: string) {
  const match = certification.match(/^(.*), issued by (.*) in (\d{4})$/)
  if (!match) {
    return { title: certification, issuer: '', year: '' }
  }

  return {
    title: match[1],
    issuer: match[2],
    year: match[3],
  }
}

export function projectForEmployer(employer: string, projects: Project[]) {
  const name = employer.trim().toLowerCase()
  if (!name) return undefined

  return projects.find((project) => {
    const sources = [project.description, ...(project.keyContributions ?? [])]
    return sources.some((source) => source.toLowerCase().includes(name))
  })
}

export function caseStudyForProject(
  projectId: string,
  company: string,
  caseStudies: CaseStudy[],
) {
  return (
    caseStudies.find((study) => study.company === company) ??
    caseStudies.find((study) => study.id === `case-${projectId}`)
  )
}

export function scaleEntries(scale: Record<string, string | number> | undefined) {
  if (!scale) return []

  return Object.entries(scale).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase()),
    value: String(value),
  }))
}
