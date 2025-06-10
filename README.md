<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
<br>
<h1 align="center">Backend para Blog com NestJS 🚀</h1>
<br>
Este projeto é uma API RESTful robusta construída com NestJS, projetada para
servir como backend para uma aplicação de blog. Inclui funcionalidades
essenciais como autenticação de usuários, gerenciamento de posts, upload de
arquivos e mais.
<br><br>

<div align="center">
<img src="https://img.shields.io/badge/NestJS-v11.0.1-red?style=for-the-badge&logo=nestjs" />
<img src="https://img.shields.io/badge/TypeScript-v5.7.3-blue?style=for-the-badge&logo=typescript" />
<img src="https://img.shields.io/badge/PostgreSQL-Ready-blue?style=for-the-badge&logo=postgresql" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

</div>

## ✨ Features

- **🔐 Autenticação e Autorização:** Sistema completo de login com JSON Web
  Tokens (JWT).
- **👤 Gerenciamento de Usuários:** Operações CRUD para usuários, com hash de
  senhas.
- **✍️ Gerenciamento de Posts:** Operações CRUD completas para os posts do blog.
- **⬆️ Upload de Arquivos:** Módulo dedicado para upload de mídias (ex: imagens
  de capa para posts).
- **🛡️ Segurança:**
  - **Helmet:** Para proteção contra vulnerabilidades web comuns.
  - **CORS:** Configuração de whitelist para permitir requisições de frontends
    autorizados.
  - **Rate Limiting (Throttler):** Proteção contra ataques de força bruta.
- **✔️ Validação de Dados:** Uso de `class-validator` e `ValidationPipe` para
  garantir a integridade dos dados de entrada.
- **🔧 Configuração Centralizada:** Gerenciamento de variáveis de ambiente com
  `@nestjs/config`.
- **🐘 Banco de Dados:** Suporte para **PostgreSQL** e **SQLite** via TypeORM.

---

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Um cliente de banco de dados (como [DBeaver](https://dbeaver.io/)) e uma
  instância de **PostgreSQL** ou **SQLite**.

---

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar e rodar o projeto localmente.

---

### 🚀 Clonando o repositório e acessando o diretório

```bash
git clone https://seu-repositorio/nestjs-for-blog.git
cd nestjs-for-blog
```

---

### 📦 Instalando dependências

```bash
npm install
```

---

### ⚙️ Configurando variáveis de ambiente

```bash
cp .env-example .env
```

Agora edite o arquivo `.env` com os valores conforme seu ambiente local:

#### `.env` – Variáveis disponíveis

| Variável         | Descrição                                 | Exemplo                         |
| ---------------- | ----------------------------------------- | ------------------------------- |
| `DB_TYPE`        | Tipo do banco de dados                    | `postgres` ou `better-sqlite3`  |
| `DB_HOST`        | Host do banco de dados                    | `localhost`                     |
| `DB_PORT`        | Porta do banco de dados                   | `5432`                          |
| `DB_USERNAME`    | Nome de usuário do banco                  | `meuuser`                       |
| `DB_PASSWORD`    | Senha do banco                            | `senhasecreta`                  |
| `DB_NAME`        | Nome do banco de dados                    | `meubanco`                      |
| `JWT_SECRET`     | Chave secreta para assinar tokens JWT     | `minha-chave-super-secreta-123` |
| `JWT_EXPIRATION` | Tempo de expiração do token               | `1d`, `7h`                      |
| `APP_PORT`       | Porta em que a aplicação irá rodar        | `3001`                          |
| `CORS_WHITELIST` | Origens permitidas (separadas por espaço) | `"http://localhost:3000"`       |

---

### 🚀 Rodando a aplicação

Modo desenvolvimento (com hot-reload):

```bash
npm run start:dev
```

Modo produção (requer build prévio):

```bash
npm run build
npm run start:prod
```

Modo debug:

```bash
npm run start:debug
```

A aplicação estará disponível em: [http://localhost:3001](http://localhost:3001)
(ou a porta definida em `APP_PORT`).

---

### 🧪 Rodando os testes

Testes unitários:

```bash
npm run test
```

Testes com watch:

```bash
npm run test:watch
```

Cobertura de testes:

```bash
npm run test:cov
```

Testes end-to-end (e2e):

```bash
npm run test:e2e
```

---

### 📂 Estrutura do Projeto

```
src/
├───auth/         # Autenticação (login, guards, strategy)
├───user/         # Gerenciamento de usuários
├───post/         # Gerenciamento de posts
├───upload/       # Lógica para upload de arquivos
├───common/       # Módulos, filtros e utilitários compartilhados
├───app.module.ts # Módulo raiz da aplicação
└───main.ts       # Ponto de entrada da aplicação
```

---

Perfeito. Abaixo está a seção `🌐 Endpoints da API` **totalmente atualizada**
com base nas novas rotas e estrutura que você forneceu. Os métodos HTTP e rotas
estão descritos de forma profissional, seguindo a ordem correta e respeitando o
escopo de autenticação (`Aberta` ou `JWT`).

---

### 🌐 Endpoints da API

> Base URL: `http://localhost:3000/` Porta padrão: `80` (HTTP) ou `443` (HTTPS)

---

#### Autenticação (`/auth`)

| Método | Rota          | Descrição           | Acesso |
| ------ | ------------- | ------------------- | ------ |
| POST   | `/auth/login` | Autentica o usuário | Aberta |

---

#### Usuários (`/user`)

| Método | Rota                | Descrição            | Acesso |
| ------ | ------------------- | -------------------- | ------ |
| POST   | `/user/`            | Cria um novo usuário | Aberta |
| GET    | `/user/me`          | Ver dados do usuário | JWT    |
| PATCH  | `/user/me`          | Atualiza o usuário   | JWT    |
| DELETE | `/user/me`          | Apaga o usuário      | JWT    |
| PATCH  | `/user/me/password` | Atualiza a senha     | JWT    |

---

#### Posts (`/post`)

| Método | Rota             | Descrição                          | Acesso |
| ------ | ---------------- | ---------------------------------- | ------ |
| GET    | `/post/`         | Lista todos os posts               | Aberta |
| GET    | `/post/:slug`    | Visualiza um post específico       | Aberta |
| GET    | `/post/me`       | Lista posts do usuário autenticado | JWT    |
| POST   | `/post/me`       | Cria um novo post                  | JWT    |
| GET    | `/post/me/:uuid` | Visualiza um post do usuário       | JWT    |
| PATCH  | `/post/me/:uuid` | Atualiza um post do usuário        | JWT    |
| DELETE | `/post/me/:uuid` | Apaga um post do usuário           | JWT    |

---

#### Upload de Arquivos (`/upload`)

| Método | Rota                 | Descrição                    | Acesso |
| ------ | -------------------- | ---------------------------- | ------ |
| POST   | `/upload`            | Envia imagem                 | JWT    |
| GET    | `/uploads/:filename` | Visualiza imagem (via NGINX) | Aberta |

---

Se quiser, posso gerar uma tabela Swagger-like em JSON ou YAML também.

### 📄 Licença

Este projeto está licenciado sob os termos da [MIT License](./LICENSE).

---
