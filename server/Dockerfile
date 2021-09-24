FROM node:10-alpine

RUN npm install -g nodemon
RUN npm install cors --save
RUN npm install express --save
RUN npm install mysql --save

RUN mkdir -p /app
WORKDIR /app

#COPY app/package.json app/package2.json
COPY package*.json /app
RUN npm install

COPY . /app

CMD ["npm", "start"]