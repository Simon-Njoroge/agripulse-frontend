import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

const LandingPage = React.lazy(() => import('../components/LandingPage'))
export const Route = createFileRoute('/')({ component: LandingPage })


