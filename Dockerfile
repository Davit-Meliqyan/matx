FROM node:20 AS build

WORKDIR /app
COPY client ./client
WORKDIR /app/client

ARG VITE_API_URL
ARG VITE_API_IMG

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_IMG=$VITE_API_IMG

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/client/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

CMD envsubst '$VITE_API_URL $VITE_API_IMG' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
