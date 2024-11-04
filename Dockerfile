# Stage 1: NGINX stage for serving Angular app
FROM nginx:alpine

# Copy the built Angular files from GitHub Action
COPY dist/network-impairment-gateway/browser /usr/share/nginx/html

# Copy the NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 4200 and start NGINX
EXPOSE 4200
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js && nginx -g 'daemon off;'"]