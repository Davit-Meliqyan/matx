FROM node:20 AS build

WORKDIR /app
COPY client ./client
WORKDIR /app/client

# КРИТИЧНО: Установить ENV перед npm run build
ARG VITE_API_URL=http://62.169.23.81:8080/
ARG VITE_API_IMG=http://62.169.23.81:9000/
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_IMG=$VITE_API_IMG

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/client/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri /index.html;
    }
}
EOF

CMD ["nginx", "-g", "daemon off;"]