import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Search, MoreHorizontal, Eye, Check, X } from 'lucide-react'

export default function CasesManagement() {
  const mockData = [
    {
      id: 1,
      type: 'Case',
      company: 'TechCorp',
      author: 'João Silva',
      status: 'Pendente',
      date: '22 Jun 2026',
    },
    {
      id: 2,
      type: 'Depoimento',
      company: 'InovaBR',
      author: 'Ana Costa',
      status: 'Aprovado',
      date: '21 Jun 2026',
    },
    {
      id: 3,
      type: 'Case',
      company: 'MegaStore',
      author: 'Carlos Santos',
      status: 'Rejeitado',
      date: '20 Jun 2026',
    },
    {
      id: 4,
      type: 'Depoimento',
      company: 'EducaDigital',
      author: 'Mariana Lima',
      status: 'Pendente',
      date: '19 Jun 2026',
    },
    {
      id: 5,
      type: 'Case',
      company: 'AgroTech',
      author: 'Roberto Alves',
      status: 'Aprovado',
      date: '18 Jun 2026',
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return (
          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200">
            Aprovado
          </Badge>
        )
      case 'Rejeitado':
        return (
          <Badge
            variant="destructive"
            className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-200"
          >
            Rejeitado
          </Badge>
        )
      default:
        return (
          <Badge
            variant="secondary"
            className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-200"
          >
            Pendente
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Cases e Depoimentos</h1>
          <p className="text-muted-foreground mt-1">
            Revise, aprove ou rejeite submissões dos clientes.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Submissões</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por empresa..." className="pl-8" />
            </div>
          </div>
          <CardDescription>Um total de {mockData.length} submissões encontradas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell className="text-muted-foreground">{item.date}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="Visualizar">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {item.status === 'Pendente' && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600"
                            title="Aprovar"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600"
                            title="Rejeitar"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
