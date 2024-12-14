FROM node:22

WORKDIR /app

COPY . . 

RUN npm install

EXPOSE 4000 5000

ENV MYSQL_HOST=host.docker.internal

CMD ["npm", "run", "dev"]