FROM node:20 AS build

WORKDIR /app
COPY client ./client
WORKDIR /app/client

ARG VITE_API_URL
ARG VITE_API_IMG

# npm install
RUN npm install

# передаем переменные прямо в build
RUN VITE_API_URL=$VITE_API_URL VITE_API_IMG=$VITE_API_IMG npm run build

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
