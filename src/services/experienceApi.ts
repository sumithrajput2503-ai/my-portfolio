import type {
  CaseStudiesResponse,
  DocumentsResponse,
  Profile,
  ProjectsResponse,
  SkillsResponse,
} from '@/types/experienceApi'

export const PORTFOLIO_UNAVAILABLE = 'Portfolio information is temporarily unavailable.'

/** Same-origin path proxied to the Experience API by Vite locally and Vercel in production. */
export const EXPERIENCE_API_PROXY_PATH = '/exp-api'

function configuredBaseUrl(): string {
  return (import.meta.env.VITE_EXPERIENCE_API_BASE_URL ?? '').trim().replace(/\/$/, '')
}

function baseUrl(): string {
  const configured = configuredBaseUrl()
  if (configured.startsWith('/')) return configured
  // The browser always calls the same-origin proxy. CloudHub only echoes
  // Access-Control-Allow-Origin for http://localhost:5173, so a direct call
  // from Vercel (or any other port) is blocked even when the API returns 200.
  if (typeof window !== 'undefined') return EXPERIENCE_API_PROXY_PATH
  return configured
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
