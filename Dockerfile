# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client/ ./

ARG VITE_API_URL
ARG VITE_API_IMG
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_IMG=$VITE_API_IMG

RUN npm run build
RUN cp -r dist /build

# Stage 2: Nginx
FROM nginx:alpine

COPY --from=build /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
