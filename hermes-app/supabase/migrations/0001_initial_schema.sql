-- Tabela `unidades`
CREATE TABLE unidades (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nome text NOT NULL,
    sigla text UNIQUE NOT NULL,
    localizacao_fisica text,
    is_dtic boolean DEFAULT FALSE
);

-- Tabela `perfis`
CREATE TABLE perfis (
    id uuid PRIMARY KEY NOT NULL REFERENCES auth.users(id),
    nome_completo text NOT NULL,
    matricula text UNIQUE NOT NULL,
    unidade_id uuid NOT NULL REFERENCES unidades(id),
    papel text NOT NULL
);

-- Tabela `bens_patrimoniais`
CREATE TABLE bens_patrimoniais (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    numero_patrimonio text UNIQUE NOT NULL,
    descricao text NOT NULL,
    categoria text,
    valor_aquisicao numeric,
    data_aquisicao date,
    unidade_atual_id uuid NOT NULL REFERENCES unidades(id),
    responsavel_atual_id uuid NOT NULL REFERENCES perfis(id),
    status text DEFAULT 'Ativo'
);

-- Tabela `movimentacoes`
CREATE TABLE movimentacoes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    bem_id uuid NOT NULL REFERENCES bens_patrimoniais(id),
    tipo_movimentacao text NOT NULL,
    unidade_origem_id uuid NOT NULL REFERENCES unidades(id),
    unidade_destino_id uuid REFERENCES unidades(id),
    data_movimentacao timestamp with time zone DEFAULT now(),
    usuario_responsavel_id uuid NOT NULL REFERENCES perfis(id)
);

-- Ativar RLS nas tabelas
ALTER TABLE unidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE bens_patrimoniais ENABLE ROW LEVEL SECURITY;
ALTER TABLE movimentacoes ENABLE ROW LEVEL SECURITY;

-- Funcao auxiliar para obter o papel do usuario logado
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT papel FROM public.perfis WHERE id = auth.uid();
$$;

-- Politicas de RLS para `bens_patrimoniais`
CREATE POLICY "Usuários podem ler bens de sua unidade ou se forem Administradores/Gestores"
ON bens_patrimoniais FOR SELECT
USING (
    (get_user_role() IN ('Administrador', 'Gestor Patrimonial'))
    OR
    (unidade_atual_id = (SELECT unidade_id FROM public.perfis WHERE id = auth.uid()))
);

CREATE POLICY "Apenas Administradores e Responsáveis por Setor podem criar bens em sua unidade"
ON bens_patrimoniais FOR INSERT
WITH CHECK (
    (get_user_role() = 'Administrador')
    OR
    (get_user_role() = 'Responsável por Setor' AND unidade_atual_id = (SELECT unidade_id FROM public.perfis WHERE id = auth.uid()))
);

CREATE POLICY "Apenas Administradores e Responsáveis por Setor podem atualizar bens em sua unidade"
ON bens_patrimoniais FOR UPDATE
USING (
    (get_user_role() IN ('Administrador', 'Gestor Patrimonial'))
    OR
    (unidade_atual_id = (SELECT unidade_id FROM public.perfis WHERE id = auth.uid()))
)
WITH CHECK (
    (get_user_role() = 'Administrador')
    OR
    (get_user_role() = 'Responsável por Setor' AND unidade_atual_id = (SELECT unidade_id FROM public.perfis WHERE id = auth.uid()))
);
