import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, FileText, RefreshCw } from 'lucide-react'

export type CaseStatus =
  | 'draft'
  | 'transcribing'
  | 'generating'
  | 'ready_to_review'
  | 'publishing'
  | 'published'
  | 'error'

export interface CaseData {
  id: string
  created_at: string
  status: CaseStatus
  titulo_case: string
  nome_empresa: string
  setor_empresa: string
}

const mockDatabase: CaseData[] = [
  {
    id: '1',
    created_at: new Date(Date.now() - 100000000).toISOString(),
    titulo_case: 'Como a Construtora Ipe dobrou as vendas',
    nome_empresa: 'Construtora Ipe',
    setor_empresa: 'Construcao Civil',
    status: 'ready_to_review',
  },
  {
    id: '2',
    created_at: new Date(Date.now() - 200000000).toISOString(),
    titulo_case: 'Clinica Vida Nova reduziu faltas em 40 por cento',
    nome_empresa: 'Clinica Vida Nova',
    setor_empresa: 'Saude',
    status: 'published',
  },
  {
    id: '3',
    created_at: new Date(Date.now() - 300000000).toISOString(),
    titulo_case: 'Mercado Bom Preco automatizou o estoque',
    nome_empresa: 'Mercado Bom Preco',
    setor_empresa: 'Varejo',
    status: 'generating',
  },
  {
    id: '4',
    created_at: new Date(Date.now() - 400000000).toISOString(),
    titulo_case: 'Escola Futuro Brilhante triplicou matriculas',
    nome_empresa: 'Escola Futuro Brilhante',
    setor_empresa: 'Educacao',
    status: 'draft',
  },
]

export default function CasesManagement() {
  const [data, setData] = useState<CaseData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      if (supabaseUrl && supabaseKey) {
        const response = await fetch(
          `${supabaseUrl}/rest/v1/cases?select=*&order=created_at.desc`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          },
        )

        if (!response.ok) throw new Error('Falha ao buscar os dados')

        const result = await response.json()
        setData(result)
      } else {
        // Fallback to mock data if env vars are missing
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setData(mockDatabase)
      }
    } catch (error) {
      console.error('Error fetching cases:', error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getStatusBadge = (status: CaseStatus) => {
    switch (status) {
      case 'published':
        return (
          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200">
            Publicado
          </Badge>
        )
      case 'ready_to_review':
        return (
          <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-200">
            Pronto p/ Revisão
          </Badge>
        )
      case 'error':
        return (
          <Badge
            variant="destructive"
            className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-200"
          >
            Erro
          </Badge>
        )
      case 'draft':
        return (
          <Badge
            variant="secondary"
            className="bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 border-slate-200"
          >
            Rascunho
          </Badge>
        )
      case 'transcribing':
      case 'generating':
      case 'publishing':
        return (
          <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-200">
            {status === 'transcribing'
              ? 'Transcrevendo'
              : status === 'generating'
                ? 'Gerando'
                : 'Publicando'}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateStr))
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Cases</h1>
          <p className="text-muted-foreground mt-1">
            Revise, acompanhe e gerencie a geração de cases de clientes.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Submissões</CardTitle>
              <CardDescription className="mt-1">
                {isLoading
                  ? 'Carregando submissões...'
                  : `Um total de ${data.length} submissões encontradas.`}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={fetchData}
              disabled={isLoading}
              title="Atualizar"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Criação</TableHead>
                </TableRow>
              </TableHeader>

              {isLoading ? (
                <TableBody>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : isError ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
                        <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
                          Ocorreu um erro ao carregar os cases.
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Verifique sua conexão ou tente novamente.
                        </p>
                        <Button onClick={fetchData} variant="outline" className="mt-2">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Tentar novamente
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : data.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
                          Nenhum case encontrado.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Você ainda não possui cases cadastrados.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell
                        className="font-medium max-w-[250px] truncate"
                        title={item.titulo_case}
                      >
                        {item.titulo_case}
                      </TableCell>
                      <TableCell>{item.nome_empresa}</TableCell>
                      <TableCell>{item.setor_empresa}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(item.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
