FROM node:10-alpine

WORKDIR /usr/src/app

RUN npm install

COPY package*.json /usr/src/app
RUN npm install

COPY . /usr/src/app

CMD ["npm", "start"]