# Hermes - Sistema de Gestão Patrimonial do Detran-RJ

O **Hermes** é um sistema de gestão de bens móveis desenvolvido para o Detran-RJ, com o objetivo de centralizar o controle patrimonial, atualmente disperso em planilhas e processos manuais. O projeto visa modernizar o processo de inventário, controle de transferências entre unidades e baixa de bens, em conformidade com a legislação estadual (Decreto 49.289/2024).

## Fases do Projeto

1.  **Fase 1 (DTIC):** Implantação piloto na Diretoria de Tecnologia da Informação e Comunicação (DTIC).
2.  **Fase 2 (Patrimônio):** Implantação no setor de Patrimônio, incluindo a funcionalidade de Transferência entre Unidades.
3.  **Fase 3 (Sede):** Integração com outros setores da Sede do Detran-RJ.
4.  **Fase 4 (Pontos):** Integração com os pontos de atendimento e unidades descentralizadas.

## Stack Tecnológico

| Componente | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Backend/Database** | Supabase (PostgreSQL) | Banco de dados relacional, autenticação (Auth) e segurança em nível de linha (RLS). |
| **Frontend** | A definir (Recomendado: React/Next.js) | Interface de usuário web e responsiva. |
| **Desenvolvimento** | GitHub | Controle de versão e colaboração. |
| **CI/CD** | GitHub Actions | Integração e entrega contínua. |
| **Testes** | Playwright | Testes de ponta a ponta (E2E) automatizados. |

## Documentação

A documentação completa do projeto pode ser encontrada no diretório `docs/`:

*   [Product Requirements Document (PRD)](/docs/PRD_Hermes.md)
*   [Estrutura do Banco de Dados (DB Schema)](/docs/DB_Schema_Supabase.md)
*   [Diretrizes de Design (Identidade Visual)](/docs/Design_System_Hermes.md)
*   [Diagrama de Arquitetura](/docs/Architecture_Diagram.png)
*   [Fluxo de Transferência de Bens](/docs/Transfer_Flow_Diagram.png)

## Contribuição

Consulte o [PRD](/docs/PRD_Hermes.md) para os requisitos e o [Workflow de CI/CD](/.github/workflows/main.yml) para as regras de contribuição.
