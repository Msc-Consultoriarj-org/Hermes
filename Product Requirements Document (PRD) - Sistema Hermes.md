# Product Requirements Document (PRD) - Sistema Hermes

**Nome do Projeto:** Hermes
**Versão:** 1.0 (Protótipo - Hermes.PRD)
**Autor:** Manus AI
**Data:** 27 de Dezembro de 2025

## 1. Introdução

### 1.1. Propósito

O objetivo deste PRD é definir os requisitos, a arquitetura técnica e o plano de implantação para o **Sistema Hermes**, uma solução de software para a gestão centralizada do patrimônio do Departamento de Trânsito do Estado do Rio de Janeiro (Detran-RJ). O sistema visa substituir o processo atual, baseado em planilhas e pranchetas, garantindo maior controle, transparência e conformidade legal, com foco inicial no levantamento patrimonial de 2026.

### 1.2. Escopo do Projeto

O escopo inicial do Sistema Hermes é o controle de todo o **Patrimônio da DTIC (Diretoria de Tecnologia da Informação)**, com a capacidade de se conectar e integrar futuramente com o setor de Patrimônio e demais unidades do Detran-RJ.

**O sistema deve:**
*   Controlar o ciclo de vida completo dos bens móveis (aquisição, inventário, transferência, baixa).
*   Garantir a conformidade com a legislação estadual e federal pertinente.
*   Adotar uma arquitetura moderna e um fluxo de desenvolvimento (CI/CD) robusto.

### 1.3. Glossário

| Termo | Definição |
| :--- | :--- |
| **Hermes** | Nome do sistema de gestão patrimonial. |
| **DTIC** | Diretoria de Tecnologia da Informação do Detran-RJ, unidade piloto para a Fase 1. |
| **MCASP** | Manual de Contabilidade Aplicada ao Setor Público, que rege os procedimentos contábeis do setor público. |
| **RLS** | *Row-Level Security* (Segurança em Nível de Linha), mecanismo do Supabase/PostgreSQL para controle de acesso a dados. |
| **CI/CD** | *Continuous Integration/Continuous Delivery*, práticas de automação de *build*, teste e *deploy*. |

## 2. Visão Geral do Produto

### 2.1. Situação Atual e Desafios

Atualmente, o levantamento e a gestão patrimonial são realizados de forma descentralizada, utilizando **planilhas e pranchetas**. Este método apresenta desafios significativos, como:
*   Risco de inconsistência e erro humano nos dados.
*   Dificuldade na rastreabilidade e controle de transferências entre unidades.
*   Falta de acesso centralizado e em tempo real às informações.

### 2.2. Visão Futura (Sistema Centralizado)

O Sistema Hermes será a **plataforma centralizada** para a gestão de bens móveis do Detran-RJ. Ele permitirá que os usuários realizem o Levantamento Patrimonial de 2026 de forma digital, com rastreamento automático de movimentações e controle de responsabilidade.

### 2.3. Fases de Implantação (Roadmap)

O projeto será implementado em quatro fases sequenciais, conforme definido pelo usuário:

| Fase | Objetivo | Escopo |
| :--- | :--- | :--- |
| **Fase 1** | **Implantação Piloto na DTIC** | Controle completo do patrimônio da DTIC. Desenvolvimento e validação dos requisitos centrais (inventário, acesso, permissões). |
| **Fase 2** | **Integração com o Setor de Patrimônio** | Implementação da funcionalidade de **Transferência entre Unidades** (requisito chave). Conexão e sincronização de dados com o setor central de Patrimônio. |
| **Fase 3** | **Integração com Outros Setores da Sede** | Expansão do sistema para todos os setores administrativos da Sede do Detran-RJ. |
| **Fase 4** | **Integração com os Pontos** | Expansão final para todas as unidades descentralizadas (*Pontos*), consolidando o controle patrimonial em todo o estado. |

## 3. Requisitos Funcionais

### 3.1. Gestão do Ciclo de Vida do Bem

O sistema deve permitir o controle dos bens móveis em todas as suas etapas, conforme o Decreto Estadual 49.289/2024 [2]:

*   **Inventário:** Registro de novos bens com número de patrimônio, descrição, localização (unidade e setor), e responsável.
*   **Transferência:** Módulo dedicado para registrar a movimentação de bens entre unidades ou setores, com rastreamento histórico e necessidade de aprovação (Fase 2).
*   **Baixa/Desfazimento:** Registro de bens inservíveis ou obsoletos, com documentação de justificativa e processo de desfazimento.
*   **Consulta:** Interface de busca avançada por número de patrimônio, descrição, localização e responsável.

### 3.2. Controle de Permissões de Usuário (RBAC)

O sistema deve implementar um controle de acesso rigoroso baseado em papéis (*Role-Based Access Control* - RBAC) para garantir a segurança e a integridade dos dados:

*   **Papéis Mínimos:** Administrador (acesso total), Gestor Patrimonial (transferência, baixa), Responsável por Setor (inventário e consulta de seu setor), Usuário (consulta).
*   **Segurança em Nível de Linha (RLS):** Acesso aos dados deve ser restrito com RLS no Supabase, garantindo que um usuário só possa visualizar ou modificar dados pertinentes à sua unidade ou setor, conforme seu papel.

### 3.3. Acesso Remoto e Identidade Visual

*   **Acesso Remoto:** O sistema deve ser acessível via web, permitindo que os usuários realizem o inventário e consultas de qualquer local, com autenticação segura.
*   **Identidade Visual:** A interface do usuário (UI) deve seguir rigorosamente as diretrizes de design do Governo do Estado do Rio de Janeiro, conforme detalhado no documento "Diretrizes de Identidade Visual - Sistema Hermes". Isso inclui a adoção das cores oficiais (`#005A92` Azul Primário), a tipografia **Roboto** e a correta aplicação do logotipo do Detran-RJ.

### 3.4. Conformidade Legal e Legislação

O sistema deve atuar como um repositório de informações e um guia de procedimentos, integrando:

*   **Decreto Estadual 49.289/2024 [2]:** O sistema deve refletir os procedimentos e definições deste decreto para a gestão de bens móveis.
*   **Lei de Acesso à Informação (LAI) [1]:** O design do sistema deve prever a transparência e a facilidade de geração de relatórios para atender a pedidos de informação pública.
*   **MCASP [3]:** O sistema deve suportar a coleta de dados necessários para a correta contabilização e registro patrimonial, em conformidade com o Manual de Contabilidade Aplicada ao Setor Público.

## 4. Arquitetura e Fluxos

![Arquitetura do Sistema Hermes](https://private-us-east-1.manuscdn.com/sessionFile/1LvudrmjqGrevwsBkB5dRk/sandbox/K5fWHhJT2Jlm1oT1y4CS2q-images_1766866539332_na1fn_L2hvbWUvdWJ1bnR1L2hlcm1lc19hcmNoaXRlY3R1cmU.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMUx2dWRybWpxR3JldndzQmtCNWRSay9zYW5kYm94L0s1ZldIaEpUMkpsbTFvVDF5NENTMnEtaW1hZ2VzXzE3NjY4NjY1MzkzMzJfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyaGxjbTFsYzE5aGNtTm9hWFJsWTNSMWNtVS5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nOw7KGr7u6BNki5f~aoEeCcA3Sk0YcUaNg-4ak2ftPnWG7smplvJsJdvKStXl52gAOvna6PmltNxyOf4z98hpx89V30D-tG2Ipg5HicsEXZnWbAV~k0pWHy18EZg5lWRbRO9p6T0Z8CxOhVHwOBRObB74ICLnWV1OVE54OinFV19gGXW0DBqV784YBpgudTbSTXxxqVVAg~JagZx71EpecTIyHV2hICbJqycPX-mIH1z5iJSDzEJ9iO9vXjcD5tKnPQff1BW~GDjXOC3rZfNzx~Mtxzi6E9gUKYbORQy0yzSSpf8mFJwsllcj7nxuDT6nKoQuo0ers1zYuSleV860w__)
*Figura 1: Arquitetura técnica e fluxo de CI/CD do Sistema Hermes.*

![Fluxo de Transferência de Bens](https://private-us-east-1.manuscdn.com/sessionFile/1LvudrmjqGrevwsBkB5dRk/sandbox/K5fWHhJT2Jlm1oT1y4CS2q-images_1766866539333_na1fn_L2hvbWUvdWJ1bnR1L2hlcm1lc190cmFuc2Zlcl9mbG93.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMUx2dWRybWpxR3JldndzQmtCNWRSay9zYW5kYm94L0s1ZldIaEpUMkpsbTFvVDF5NENTMnEtaW1hZ2VzXzE3NjY4NjY1MzkzMzNfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyaGxjbTFsYzE5MGNtRnVjMlpsY2w5bWJHOTMucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=RYHf2dthjX8WULkMuhIYL2OqZpPeI8EMPnClztdD9k8mSFx~~4krevxj8f8OqG74qYkIbWqkusaJFPslkBZqq6ozCydeKiS8hbgFl~wVv5uYoMUXVKBURtiyMJXVEOuilD8IORu2afi2-PEw-xopnu-23nFno5P-Yw6owuLr9CocD7x7ou7Nh~nODIBSKHqI52FtXiLBPoyDZqVjS8kckg1FhKNG19N5YNedT4DOdLERheAtZKtdPMplxrW2s~H2CnQTswLmnPXXIncPIHS9aova5qBd0RdvbQy1XG~MRMCSNz5GUVDgO3CQkHk89Gdy8QbyOoRNAr9~hpquA3dnLw__)
*Figura 2: Fluxo de transferência de bens entre unidades (Fase 2).*

## 5. Requisitos Não-Funcionais

| Categoria | Requisito | Detalhe |
| :--- | :--- | :--- |
| **Segurança** | Autenticação e Autorização | Uso do Supabase Auth e implementação obrigatória de RLS em todas as tabelas de patrimônio. |
| **Desempenho** | Tempo de Resposta | Consultas de inventário e transferência devem ser concluídas em menos de 3 segundos. |
| **Manutenibilidade** | CI/CD e Testes | Adoção de práticas de CI/CD via GitHub Actions e cobertura de testes E2E com Playwright. |
| **Usabilidade** | Interface | Interface intuitiva e responsiva, otimizada para uso em dispositivos móveis (para o levantamento em campo). |

## 6. Arquitetura Técnica e Stack

O sistema Hermes será construído com uma arquitetura moderna e *serverless*, utilizando o seguinte *stack* tecnológico:

### 6.1. Stack Tecnológico

| Componente | Tecnologia | Função |
| :--- | :--- | :--- |
| **Backend/Banco de Dados** | **Supabase** (PostgreSQL) | Armazenamento de dados, Autenticação (Auth), Segurança em Nível de Linha (RLS), e APIs REST/GraphQL. |
| **Frontend** | **React/Next.js** (Sugestão) | Interface de usuário web responsiva. |
| **Controle de Versão** | **GitHub** | Repositório central de código. |
| **Testes E2E** | **Playwright** | Automação de testes de ponta a ponta no fluxo de desenvolvimento. |

### 6.2. Fluxo de Desenvolvimento (CI/CD)

O desenvolvimento adotará o **GitHub Flow** com um pipeline de CI/CD automatizado via **GitHub Actions**, garantindo a qualidade e a entrega contínua:

1.  **Desenvolvimento:** O código é desenvolvido em *feature branches*.
2.  **Integração Contínua (CI):**
    *   Ao abrir um *Pull Request* (PR), o GitHub Actions dispara a execução de testes unitários e de integração.
    *   **Playwright** é executado para testes E2E, validando fluxos críticos (ex: registro de bem, transferência).
3.  **Entrega Contínua (CD) - Migrações Supabase:**
    *   O Supabase CLI será usado para gerenciar migrações de banco de dados.
    *   Ao fazer *merge* para a *branch* `main` (Produção) ou `staging` (Homologação), o GitHub Actions executa as migrações no ambiente Supabase correspondente.
4.  **Ambientes:** Serão mantidos, no mínimo, dois ambientes: `staging` (Homologação) e `main` (Produção), cada um com sua respectiva instância Supabase.

## 7. Próximos Passos

O próximo passo é a **prototipação (Hermes.PRD)**, focada na implementação da Fase 1 (Patrimônio DTIC) e na validação da arquitetura técnica (Supabase + RLS + CI/CD).

**Ações Imediatas:**
1.  Criação dos diagramas de arquitetura e fluxos (Próxima Fase).
2.  Definição do modelo de dados inicial (tabelas de Bens, Unidades, Usuários, Transferências).
3.  Configuração do repositório GitHub e do pipeline inicial de CI/CD.

***

**Referências**

[1] Lei nº 12.527/2011 (Lei de Acesso à Informação - LAI). Disponível em: [https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm)
[2] Decreto Estadual RJ nº 49.289/2024. Regulamenta a gestão dos bens móveis no âmbito do Poder Executivo do Estado do Rio de Janeiro.
[3] Manual de Contabilidade Aplicada ao Setor Público (MCASP). Disponível em: [https://www.gov.br/tesouronacional/pt-br/contabilidade-e-custos/manuais/manual-de-contabilidade-aplicada-ao-setor-publico-mcasp-1](https://www.gov.br/tesouronacional/pt-br/contabilidade-e-custos/manuais/manual-de-contabilidade-aplicada-ao-setor-publico-mcasp-1)
[4] Supabase Docs: Managing Environments. Disponível em: [https://supabase.com/docs/guides/deployment/managing-environments](https://supabase.com/docs/guides/deployment/managing-environments)
[5] Supawright: A Playwright test harness for Supabase. Disponível em: [https://github.com/isaacharrisholt/supawright](https://github.com/isaacharrisholt/supawright)
[6] Supabase Docs: Custom Claims & Role-based Access Control (RBAC). Disponível em: [https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)
[7] Decreto nº 49.289, de 17 de setembro de 2024. Diário Oficial do Estado do Rio de Janeiro. (Referência visualizada no PDF)
