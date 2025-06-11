FROM node:22.14-alpine

# ✅ Installer les dépendances nécessaires à la compilation de bcrypt
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./

# ✅ Installer d'abord les dépendances
RUN npm install

# ✅ Installer nodemon globalement si nécessaire (optionnel)
RUN npm install -g nodemon

COPY . .

ENV NODE_ENV=development

EXPOSE 8080

CMD ["nodemon", "app.js"]
