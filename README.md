<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
<br>
<h1 align="center">Backend para Blog com NestJS 🚀</h1>
<br>
Este projeto é uma API RESTful robusta construída com **NestJS**, projetada para
servir como backend para uma aplicação de blog. Inclui funcionalidades
essenciais como autenticação de usuários, gerenciamento de posts, upload de
arquivos e muito mais.

![NestJS](https://img.shields.io/badge/NestJS-v11.0.1-red?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.7.3-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Ready-blue?style=for-the-badge&logo=postgresql)
![License](https://img.shields.io/badge/License-UNLICENSED-lightgrey?style=for-the-badge)

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

### 🌐 Endpoints da API

#### Autenticação (`/auth`)

- `POST /login` — Login e retorno de token JWT.

#### Usuários (`/user`)

- `POST /` — Cria um novo usuário.
- `GET /` — Lista todos os usuários.
- `GET /:id` — Busca um usuário por ID.
- `PATCH /:id` — Atualiza dados de um usuário.
- `DELETE /:id` — Remove um usuário.
- `PATCH /password` — Atualiza a senha do usuário autenticado.

#### Posts (`/post`)

- `POST /` — Cria um post (autenticado).
- `GET /` — Lista todos os posts.
- `GET /:id` — Busca um post por ID.
- `PATCH /:id` — Atualiza um post (autenticado + autor).
- `DELETE /:id` — Remove um post (autenticado + autor).

#### Upload (`/upload`)

- `POST /` — Upload de arquivos.

---

### 📄 Licença

Este projeto está sob a licença **UNLICENSED**.

---

Se quiser, posso converter isso em um README.md formatado e traduzido pt-en
usando seu padrão `{ pt, en }`. Só avisar.
