FROM node:22

ENV PORT=8080

WORKDIR /urs/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080 

CMD ["npm", "start"]