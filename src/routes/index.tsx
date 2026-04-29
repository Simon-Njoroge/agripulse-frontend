import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/store/authStore'
import { Loader } from 'lucide-react'
import React from 'react'

const LandingPage = React.lazy(() => import('../components/LandingPage'))

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate({ to: '/admin/dashboard' })
      } else {
        navigate({ to: '/agent/dashboard' })
      }
    } else {
      // Show landing page (LandingPage component will be rendered)
    }
  }, [isAuthenticated, user, navigate])

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    )
  }

  return <LandingPage />
}


