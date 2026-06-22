import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquareQuote, FileText } from 'lucide-react'

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12 animate-fade-in-up">
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          Compartilhe sua história com a <span className="text-primary">Adapta</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Ajude-nos a inspirar outras empresas compartilhando como nossas soluções transformaram seu
          negócio. Escolha o formato que melhor se adapta à sua experiência.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center">
        <Button
          size="lg"
          className="h-16 text-lg px-8 hover:scale-105 transition-transform duration-200 group"
          asChild
        >
          <Link to="/depoimentos/novo">
            <MessageSquareQuote className="mr-2 h-5 w-5" />
            Enviar depoimento
            <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-16 text-lg px-8 hover:scale-105 transition-transform duration-200 group"
          asChild
        >
          <Link to="/cases/novo">
            <FileText className="mr-2 h-5 w-5" />
            Enviar case
            <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Index
