import path from 'path'
import { defineConfig, loadEnv, type ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const portfolioAiApiUrl = env.PORTFOLIO_AI_API_URL?.trim().replace(/\/$/, '')

  if (command === 'serve' && !portfolioAiApiUrl) {
    throw new Error(
      'PORTFOLIO_AI_API_URL is required for the local API proxy. Set it in .env.'
    )
  }

  const proxy: Record<string, ProxyOptions> = {}

  if (portfolioAiApiUrl) {
    proxy['/api/v1'] = {
      target: portfolioAiApiUrl,
      changeOrigin: true,
    }
  }

  const experienceApiUrl = env.VITE_EXPERIENCE_API_BASE_URL?.trim().replace(/\/$/, '')
  if (experienceApiUrl && !experienceApiUrl.startsWith('/')) {
    const experienceUrl = new URL(experienceApiUrl)
    const experienceBasePath = experienceUrl.pathname.replace(/\/$/, '')
    proxy['/exp-api'] = {
      target: experienceUrl.origin,
      changeOrigin: true,
      rewrite: (requestPath) => requestPath.replace(/^\/exp-api/, experienceBasePath),
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy,
    },
    preview: {
      proxy,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three'
            }
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'motion'
            }
          },
        },
      },
    },
  }
})
