# Estrutura Inicial do Banco de Dados (Supabase/PostgreSQL) - Sistema Hermes

A estrutura do banco de dados para o Sistema Hermes é projetada para ser robusta, escalável e, crucialmente, segura, utilizando os recursos nativos do PostgreSQL/Supabase, como o **Row-Level Security (RLS)**.

O foco da Fase 1 (DTIC) é validar o controle de acesso e o registro de bens.

## 1. Tabelas de Usuários e Organização

### 1.1. Tabela `unidades`

Armazena a estrutura organizacional do Detran-RJ. É a chave para a implementação do RLS, pois o acesso aos bens será filtrado pela unidade.

| Coluna | Tipo de Dado | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Identificador único da unidade/setor. | **PRIMARY KEY** |
| `nome` | `text` | Nome completo da unidade (ex: Diretoria de Tecnologia da Informação). | `NOT NULL` |
| `sigla` | `text` | Sigla da unidade (ex: DTIC). | `UNIQUE`, `NOT NULL` |
| `localizacao_fisica` | `text` | Endereço ou prédio onde a unidade está localizada. | |
| `is_dtic` | `boolean` | Flag para identificar a unidade piloto (Fase 1). | `DEFAULT FALSE` |

### 1.2. Tabela `perfis`

Estende a tabela de autenticação do Supabase (`auth.users`) para armazenar dados específicos do usuário e seu papel no sistema.

| Coluna | Tipo de Dado | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | ID do usuário, referenciando `auth.users.id`. | **PRIMARY KEY**, `NOT NULL` |
| `nome_completo` | `text` | Nome completo do servidor. | `NOT NULL` |
| `matricula` | `text` | Matrícula funcional do servidor. | `UNIQUE`, `NOT NULL` |
| `unidade_id` | `uuid` | Unidade/Setor ao qual o servidor está vinculado. | **FOREIGN KEY** (`unidades.id`), `NOT NULL` |
| `papel` | `text` | Papel do usuário no sistema (ex: 'Administrador', 'Gestor Patrimonial', 'Responsável por Setor', 'Usuário'). | `NOT NULL` |

## 2. Tabelas de Patrimônio

### 2.1. Tabela `bens_patrimoniais`

Tabela central para o registro de todos os bens móveis.

| Coluna | Tipo de Dado | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Identificador único do bem. | **PRIMARY KEY** |
| `numero_patrimonio` | `text` | Número de tombamento oficial (ex: 2025/DTIC/0001). | `UNIQUE`, `NOT NULL` |
| `descricao` | `text` | Descrição detalhada do bem (ex: Computador Dell OptiPlex 7090). | `NOT NULL` |
| `categoria` | `text` | Categoria do bem (ex: 'Hardware', 'Mobiliário', 'Software'). | |
| `valor_aquisicao` | `numeric` | Valor de aquisição do bem. | |
| `data_aquisicao` | `date` | Data de aquisição do bem. | |
| `unidade_atual_id` | `uuid` | **Localização atual** do bem (unidade/setor). | **FOREIGN KEY** (`unidades.id`), `NOT NULL` |
| `responsavel_atual_id` | `uuid` | Servidor responsável pela guarda do bem. | **FOREIGN KEY** (`perfis.id`), `NOT NULL` |
| `status` | `text` | Status do bem (ex: 'Ativo', 'Em Trânsito', 'Baixado'). | `DEFAULT 'Ativo'` |

### 2.2. Tabela `movimentacoes` (Histórico)

Registra todas as alterações de localização ou status do bem, essencial para a rastreabilidade e para a Fase 2 (Transferências).

| Coluna | Tipo de Dado | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Identificador único da movimentação. | **PRIMARY KEY** |
| `bem_id` | `uuid` | Bem que foi movimentado. | **FOREIGN KEY** (`bens_patrimoniais.id`), `NOT NULL` |
| `tipo_movimentacao` | `text` | Tipo (ex: 'Inventário Inicial', 'Transferência', 'Baixa'). | `NOT NULL` |
| `unidade_origem_id` | `uuid` | Unidade de onde o bem saiu. | **FOREIGN KEY** (`unidades.id`), `NOT NULL` |
| `unidade_destino_id` | `uuid` | Unidade para onde o bem foi (NULL para Baixa). | **FOREIGN KEY** (`unidades.id`) |
| `data_movimentacao` | `timestamp with time zone` | Data e hora da movimentação. | `DEFAULT now()` |
| `usuario_responsavel_id` | `uuid` | Servidor que registrou a movimentação. | **FOREIGN KEY** (`perfis.id`), `NOT NULL` |

## 3. Políticas de Segurança (RLS) e Roles

A segurança em nível de linha (RLS) é a espinha dorsal do controle de acesso no Hermes, garantindo que a regra de negócio seja aplicada diretamente no banco de dados.

### 3.1. Roles (Papéis) Definidos

Os papéis são armazenados na coluna `papel` da tabela `perfis` e são a base para as políticas de RLS.

| Papel | Nível de Acesso | Permissões Chave |
| :--- | :--- | :--- |
| **Administrador** | Global | CRUD (Create, Read, Update, Delete) em todas as tabelas. |
| **Gestor Patrimonial** | Global (Leitura) / Setorial (Escrita) | Leitura global de bens. Inserção/Atualização/Baixa de bens em qualquer unidade. |
| **Responsável por Setor** | Setorial | Inserção/Atualização/Leitura de bens apenas em sua unidade (`unidade_id`). |
| **Usuário** | Setorial (Leitura) | Leitura de bens apenas em sua unidade (`unidade_id`). |

### 3.2. Exemplo de Políticas RLS para `bens_patrimoniais`

As políticas devem ser ativadas em todas as tabelas de dados sensíveis (`unidades`, `perfis`, `bens_patrimoniais`, `movimentacoes`).

**SQL Sugerido para `bens_patrimoniais`:**

```sql
-- 1. Ativar RLS na tabela
ALTER TABLE bens_patrimoniais ENABLE ROW LEVEL SECURITY;

-- 2. Função auxiliar para obter o papel do usuário logado
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT papel FROM perfis WHERE id = auth.uid();
$$;

-- 3. Política de SELECT (Leitura)
CREATE POLICY "Usuários podem ler bens de sua unidade ou se forem Administradores/Gestores"
ON bens_patrimoniais FOR SELECT
USING (
    (get_user_role() IN ('Administrador', 'Gestor Patrimonial'))
    OR
    (unidade_atual_id = (SELECT unidade_id FROM perfis WHERE id = auth.uid()))
);

-- 4. Política de INSERT (Criação)
CREATE POLICY "Apenas Administradores e Responsáveis por Setor podem criar bens em sua unidade"
ON bens_patrimoniais FOR INSERT
WITH CHECK (
    (get_user_role() = 'Administrador')
    OR
    (get_user_role() = 'Responsável por Setor' AND unidade_atual_id = (SELECT unidade_id FROM perfis WHERE id = auth.uid()))
);

-- 5. Política de UPDATE (Atualização)
CREATE POLICY "Apenas Administradores e Responsáveis por Setor podem atualizar bens em sua unidade"
ON bens_patrimoniais FOR UPDATE
USING (
    (get_user_role() IN ('Administrador', 'Gestor Patrimonial'))
    OR
    (unidade_atual_id = (SELECT unidade_id FROM perfis WHERE id = auth.uid()))
)
WITH CHECK (
    (get_user_role() = 'Administrador')
    OR
    (get_user_role() = 'Responsável por Setor' AND unidade_atual_id = (SELECT unidade_id FROM perfis WHERE id = auth.uid()))
);
```

Este modelo garante que o sistema atenda aos requisitos de **Controle de Permissões de Usuário** e esteja pronto para a **Transferência entre Unidades** (Fase 2).
