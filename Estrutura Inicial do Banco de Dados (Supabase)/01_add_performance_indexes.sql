-- BOLT: ⚡ Proactive Performance Optimization
-- This migration adds indexes to columns that are expected to be frequently used
-- in `WHERE` clauses for search and filtering operations. By creating these
-- indexes upfront, we prevent common performance bottlenecks before they arise,
-- ensuring the application remains fast as the data grows.

-- Tabela: bens_patrimoniais
-- Objetivo: Acelerar a busca de bens por número de patrimônio, localização e status.
-- Impacto: Melhora significativa na performance da consulta principal de inventário.

-- Índice para busca rápida por número de patrimônio, uma operação de consulta primária.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bens_numero_patrimonio ON public.bens_patrimoniais(numero_patrimonio);

-- Índice composto para filtrar bens por unidade e responsável, otimizando a carga de inventários por setor.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bens_unidade_responsavel ON public.bens_patrimoniais(unidade_atual_id, responsavel_atual_id);

-- Índice para filtrar bens por status, útil para relatórios e dashboards.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bens_status ON public.bens_patrimoniais(status);

-- Tabela: movimentacoes
-- Objetivo: Acelerar a consulta do histórico de um bem específico.
-- Impacto: Garante que a rastreabilidade de um ativo seja uma operação rápida.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_movimentacoes_bem_id ON public.movimentacoes(bem_id);

-- Tabela: perfis
-- Objetivo: Acelerar a busca de usuários por unidade.
-- Impacto: Melhora a performance ao listar todos os servidores de um determinado setor.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_perfis_unidade_id ON public.perfis(unidade_id);
