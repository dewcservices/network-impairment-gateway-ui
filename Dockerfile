FROM nginxinc/nginx-unprivileged:1.27.2

#### copy nginx conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#### copy artifact build from the 'build environment'
COPY dist/network-impairment-gateway/browser /usr/share/nginx/html
USER root
RUN chown nginx:nginx /usr/share/nginx/html/env.js
USER nginx

CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js && nginx -g 'daemon off;'"]