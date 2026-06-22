CREATE TABLE IF NOT EXISTS public.cases (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  status text default 'draft' check (status in ('draft', 'transcribing', 'generating', 'ready_to_review', 'publishing', 'published', 'error')),
  titulo_case text not null,
  nome_empresa text not null,
  localizacao text not null,
  setor_empresa text not null,
  tamanho_empresa text not null,
  youtube_url text not null,
  error_message text,
  pequena_descricao text,
  logo_url text,
  thumb_url text,
  desafio text,
  resultado text,
  content text,
  framer_item_id text,
  published_url text
);

ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON public.cases
  FOR SELECT
  TO public
  USING (true);
