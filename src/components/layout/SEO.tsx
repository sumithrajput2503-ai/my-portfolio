import { Helmet } from 'react-helmet-async'
import { personalInfo } from '@/data/portfolio'

export function SEO() {
  const title = `${personalInfo.name} | Integration Engineer & AI Product Engineer`
  const description = personalInfo.subtitle
  const url = 'https://sumithkumarsingh.dev'
  const image = `${url}${personalInfo.profilePhoto}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={personalInfo.name} />
      <meta name="keywords" content="Integration Engineer, MuleSoft, AI Product Engineer, Enterprise Integration, API Strategy, AWS, Azure, Agentic AI" />
      <meta name="theme-color" content="#0A0A0A" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={personalInfo.name} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: personalInfo.name,
          jobTitle: 'Integration Engineer',
          description,
          url,
          image,
          sameAs: [personalInfo.linkedin],
          knowsAbout: [
            'MuleSoft',
            'Enterprise Integration',
            'AI Product Development',
            'AWS',
            'Azure',
          ],
        })}
      </script>
    </Helmet>
  )
}
