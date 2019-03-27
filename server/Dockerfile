FROM node:latest

WORKDIR /app

RUN  apt-get update \
  && apt-get install python \
  && rm -rf /var/lib/apt/lists/*

COPY server/package.json /app

RUN yarn install

COPY ./server /app

COPY .env /app

ENV NODE_ENV=production

EXPOSE 5000

ENTRYPOINT ["yarn", "prod"]