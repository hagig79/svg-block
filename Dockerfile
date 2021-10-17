FROM nginx:latest
COPY js /usr/share/nginx/html/js
COPY index.html /usr/share/nginx/html/index.html
