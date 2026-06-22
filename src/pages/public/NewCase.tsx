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

export default function NewCase() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      <Button variant="ghost" asChild className="-ml-4 mb-2">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o início
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Enviar novo case</CardTitle>
          <CardDescription>
            Detalhe os desafios, soluções e resultados alcançados com a Adapta. Um case estruturado
            tem grande impacto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_name">Nome do Contato</Label>
              <Input id="contact_name" placeholder="Seu nome" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_name">Nome da Empresa</Label>
              <Input id="company_name" placeholder="Sua empresa" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenge">O Desafio</Label>
            <Textarea
              id="challenge"
              placeholder="Qual problema vocês estavam tentando resolver?"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution">A Solução</Label>
            <Textarea
              id="solution"
              placeholder="Como as ferramentas da Adapta foram utilizadas?"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="results">Resultados Obtidos</Label>
            <Textarea
              id="results"
              placeholder="Quais foram as métricas ou melhorias qualitativas alcançadas?"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Enviar Case para Revisão</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
