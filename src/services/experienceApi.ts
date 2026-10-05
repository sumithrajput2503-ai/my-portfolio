import type {
  CaseStudiesResponse,
  DocumentsResponse,
  Profile,
  ProjectsResponse,
  SkillsResponse,
} from '@/types/experienceApi'

export const PORTFOLIO_UNAVAILABLE = 'Portfolio information is temporarily unavailable.'

function baseUrl(): string {
  return (import.meta.env.VITE_EXPERIENCE_API_BASE_URL ?? '').trim().replace(/\/$/, '')
}

export function resolveExperienceAsset(path: string | undefined) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) return path

  const root = baseUrl()
  if (!root) return ''
  return `${root}${path.startsWith('/') ? path : `/${path}`}`
}

async function getJson<T>(path: string): Promise<T> {
  const root = baseUrl()
  if (!root) {
    throw new Error(PORTFOLIO_UNAVAILABLE)
  }

  let response: Response
  try {
    response = await fetch(`${root}${path}`, {
      headers: { Accept: 'application/json' },
    })
  } catch {
    throw new Error(PORTFOLIO_UNAVAILABLE)
  }

  if (!response.ok) {
    throw new Error(PORTFOLIO_UNAVAILABLE)
  }

  return response.json() as Promise<T>
}

export const experienceApi = {
  getProfile: () => getJson<Profile>('/profile'),
  getAbout: () => getJson<DocumentsResponse>('/about'),
  getExperience: () => getJson<DocumentsResponse>('/experience'),
  getSkills: () => getJson<SkillsResponse>('/skills'),
  getProjects: () => getJson<ProjectsResponse>('/projects'),
  getCaseStudies: () => getJson<CaseStudiesResponse>('/case-studies'),
}

export async function loadPortfolio() {
  const [profile, about, experience, skills, projects, caseStudies] = await Promise.all([
    experienceApi.getProfile(),
    experienceApi.getAbout(),
    experienceApi.getExperience(),
    experienceApi.getSkills(),
    experienceApi.getProjects(),
    experienceApi.getCaseStudies(),
  ])

  return {
    profile,
    about: about.documents ?? [],
    experience: experience.documents ?? [],
    skills: skills.skills ?? [],
    certifications: skills.certifications ?? profile.certifications ?? [],
    projects: projects.projects ?? [],
    caseStudies: caseStudies.caseStudies ?? [],
  }
}
