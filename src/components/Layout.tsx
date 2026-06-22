import { Link, Outlet } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { useAuth } from '@/hooks/use-auth'

export default function Layout() {
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, logout } = useAuth()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-[1100px] flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary tracking-tight">Fluxo Cases</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                to="/depoimentos/novo"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Depoimentos
              </Link>
              <Link
                to="/cases/novo"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cases
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4 text-sm font-medium">
                <Link
                  to="/admin"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Painel
                </Link>
                <Link
                  to="/admin/cases"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Gerenciar
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Sair
                </Button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 transition-all" />
              ) : (
                <Moon className="h-5 w-5 transition-all" />
              )}
              <span className="sr-only">Alternar tema</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-[1100px] py-8 md:py-12">
        <Outlet />
      </main>

      <footer className="border-t py-6">
        <div className="container max-w-[1100px] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Adapta. Todos os direitos reservados.</p>
          <p className="flex gap-4">
            <Link to="/login" className="hover:text-foreground transition-colors">
              Área Administrativa
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
