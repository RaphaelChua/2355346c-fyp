FROM node AS builder

WORKDIR /source

COPY client/package.json /source/

RUN yarn install

COPY ./client /source

COPY .env /source

RUN yarn run publish

FROM nginx

COPY --from=builder /source/dist /usr/share/nginx/html

EXPOSE 8080
