FROM nginx:alpine

COPY build /usr/share/nginx/html

COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

CMD envsubst '$VITE_API_URL $VITE_API_IMG' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
