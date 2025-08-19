#!/bin/sh
envsubst '$VITE_API_URL $VITE_API_IMG' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
