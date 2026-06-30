import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<LoadingSkeleton />}>
      <App />
    </Suspense>
  </StrictMode>
)
