FROM node:12-alpine 

WORKDIR /app

COPY package.json  /app/

EXPOSE 9000 

RUN npm install

COPY . /app

CMD ["npm","start"]

