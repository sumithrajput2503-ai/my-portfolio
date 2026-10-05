import { Helmet } from 'react-helmet-async'
import { siteAssets } from '@/data/site'
import { usePortfolioData } from '@/context/PortfolioProvider'
import { fullName } from '@/lib/portfolioView'
import { resolveExperienceAsset } from '@/services/experienceApi'

export function SEO() {
  const { profile } = usePortfolioData()
  const name = profile ? fullName(profile) : ''
  const title = name ? `${name} | ${profile?.title}` : 'Portfolio'
  const description = profile?.headline ?? profile?.summary ?? 'Portfolio'
  const url = siteAssets.siteUrl
  const image = resolveExperienceAsset(profile?.photo)
  const keywords = profile?.specializations?.join(', ') ?? ''

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {name && <meta name="author" content={name} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="theme-color" content="#0A0A0A" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      {name && <meta property="og:site_name" content={name} />}
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {profile && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name,
            jobTitle: profile.title,
            description,
            url,
            image,
            sameAs: profile.linkedin ? [profile.linkedin] : [],
            knowsAbout: profile.specializations ?? [],
          })}
        </script>
      )}
    </Helmet>
  )
}
