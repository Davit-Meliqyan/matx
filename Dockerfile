FROM node:20 AS build

WORKDIR /app
COPY client ./client
WORKDIR /app/client

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/client/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
