FROM node:20 AS build

WORKDIR /app
COPY client ./client
WORKDIR /app/client

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/client/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]