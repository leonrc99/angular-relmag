# Etapa 1: Construção do aplicativo
FROM node:20.17.0 as build

WORKDIR /app

# Copiar arquivos para o contêiner
COPY package*.json ./
RUN npm install

COPY . .

# Build da aplicação Angular (ignorando testes unitários)
RUN npm run build -- --configuration=production --no-aot --no-progress

# Etapa 2: Servir a aplicação com um servidor web
FROM nginx:1.25-alpine

COPY --from=build /app/dist/angular-relmag /usr/share/nginx/html

# Expor a porta padrão do Nginx
EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
