FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --include=dev

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html