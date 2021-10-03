FROM node:10-alpine

RUN mkdir -p /app/
WORKDIR /app/

COPY . .

RUN npm install

CMD ["npm", "start"]