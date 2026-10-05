export interface Profile {
  firstName: string
  lastName: string
  title: string
  headline: string
  summary: string
  location: string
  email: string
  phone?: string
  linkedin?: string
  photo?: string
  portfolioStats?: string[]
  specializations?: string[]
  currentRole: string
  currentCompany: string
  currentPeriod?: string
  currentProject?: string
  currentResponsibilities?: string[]
  experienceYears?: string
  primarySpecialization?: string
  professionalFocus?: string[]
  selectedTechnologyEcosystem?: string[]
  certifications?: string[]
  professionalPositioning?: string[]
  valueProposition?: string
  portfolioPurpose?: string
}

export interface KnowledgeDocument {
  id: string
  title: string
  type: string
  category: string
  sourceUrl: string
  text: string
  industry?: string
  technologies?: string[]
}

export interface DocumentsResponse {
  documents: KnowledgeDocument[]
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface SkillsResponse {
  skills: SkillCategory[]
  certifications: string[]
}

export interface Project {
  id: string
  name: string
  company: string
  companyWebsite?: string
  industry: string
  companyOverview?: string
  description: string
  keyContributions?: string[]
  technologies: string[]
}

export interface ProjectsResponse {
  projects: Project[]
}

export interface CaseStudyArchitecture {
  pattern?: string
  layers?: string[]
  keySystems?: string[]
  keyPlatforms?: string[]
}

export interface CaseStudy {
  id: string
  title: string
  company: string
  industry?: string
  website?: string
  summary: string
  businessContext?: string
  challenge?: string[]
  solution?: string[]
  scale?: Record<string, string | number>
  architecture?: CaseStudyArchitecture
  role?: string[]
  capabilitiesDemonstrated?: string[]
  technologies: string[]
}

export interface CaseStudiesResponse {
  caseStudies: CaseStudy[]
}
