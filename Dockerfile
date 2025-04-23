FROM node:22.14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install -g nodemon

COPY . .

ENV NODE_ENV=development

EXPOSE 8080

CMD ["nodemon", "app.js"]
