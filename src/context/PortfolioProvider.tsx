import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadPortfolio, PORTFOLIO_UNAVAILABLE } from '@/services/experienceApi'
import type {
  CaseStudy,
  KnowledgeDocument,
  Profile,
  Project,
  SkillCategory,
} from '@/types/experienceApi'

export interface PortfolioData {
  loading: boolean
  error: string | null
  profile: Profile | null
  about: KnowledgeDocument[]
  experience: KnowledgeDocument[]
  skills: SkillCategory[]
  certifications: string[]
  projects: Project[]
  caseStudies: CaseStudy[]
}

const empty: PortfolioData = {
  loading: true,
  error: null,
  profile: null,
  about: [],
  experience: [],
  skills: [],
  certifications: [],
  projects: [],
  caseStudies: [],
}

const PortfolioContext = createContext<PortfolioData>(empty)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(empty)

  useEffect(() => {
    let cancelled = false

    loadPortfolio()
      .then((portfolio) => {
        if (cancelled) return
        setData({
          loading: false,
          error: null,
          ...portfolio,
        })
      })
      .catch(() => {
        if (cancelled) return
        setData({
          ...empty,
          loading: false,
          error: PORTFOLIO_UNAVAILABLE,
        })
      })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => data, [data])

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolioData() {
  return useContext(PortfolioContext)
}
