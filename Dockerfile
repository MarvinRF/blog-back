# Estágio 1: Build da aplicação (Renomeado para "builder" para clareza)
FROM node:18-alpine AS builder

# ATUALIZAÇÃO DE PACOTES: Feito uma única vez no início para aproveitar o cache do Docker.
RUN apk update && apk upgrade

WORKDIR /usr/src/app

# CÓPIA DAS DEPENDÊNCIAS: Copia apenas o necessário para instalar os pacotes.
# Isso otimiza o cache. A instalação só roda de novo se o package.json mudar.
COPY package*.json ./

# INSTALAÇÃO DAS DEPENDÊNCIAS: Instala tudo (incluindo devDependencies) para o build.
RUN npm install

# CÓPIA DO CÓDIGO-FONTE: Agora copiamos o resto do código.
COPY . .

# BUILD DA APLICAÇÃO: O passo CRÍTICO que estava faltando.
# Isso executa o script "build" do seu package.json e cria a pasta /dist.
RUN npm run build

# ------------------------------------------------------------------------------

# Estágio 2: Produção (Imagem Final)
FROM node:18-alpine AS production

# Por segurança, também atualizamos os pacotes da imagem final.
RUN apk update && apk upgrade

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copia os package.json e instala APENAS as dependências de produção.
COPY package*.json ./
RUN npm install --only=production

# Copia a pasta 'dist' (com a aplicação compilada) gerada no estágio anterior.
COPY --from=builder /usr/src/app/dist ./dist

# [BOA PRÁTICA] Expõe a porta que a aplicação vai usar dentro do contêiner.
EXPOSE 3001

# Comando final para iniciar a aplicação.
CMD ["node", "dist/main"]