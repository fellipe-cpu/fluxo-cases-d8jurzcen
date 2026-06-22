import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/hooks/use-auth'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import { ProtectedRoute } from './components/ProtectedRoute'
import { lazy, Suspense } from 'react'

// Lazy loading pages
const Index = lazy(() => import('./pages/Index'))
const NewTestimonial = lazy(() => import('./pages/public/NewTestimonial'))
const NewCase = lazy(() => import('./pages/public/NewCase'))
const Login = lazy(() => import('./pages/auth/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const CasesManagement = lazy(() => import('./pages/admin/CasesManagement'))

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-[50vh] w-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
)

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="fluxo-cases-theme">
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense
            fallback={
              <Layout>
                <LoadingScreen />
              </Layout>
            }
          >
            <Routes>
              <Route element={<Layout />}>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/depoimentos/novo" element={<NewTestimonial />} />
                <Route path="/cases/novo" element={<NewCase />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/cases" element={<CasesManagement />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
)

export default App
