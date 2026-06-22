import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NewTestimonial() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      <Button variant="ghost" asChild className="-ml-4 mb-2">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o início
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Enviar novo depoimento</CardTitle>
          <CardDescription>
            Compartilhe sua experiência em poucas palavras. Seu depoimento poderá ser destacado em
            nossas páginas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" placeholder="Ex: Maria Silva" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" placeholder="Ex: Acme Corp" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Cargo</Label>
            <Input id="role" placeholder="Ex: Diretora de Inovação" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial">Seu depoimento</Label>
            <Textarea
              id="testimonial"
              placeholder="Conte-nos como a Adapta ajudou você..."
              className="min-h-[150px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Enviar Depoimento</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
