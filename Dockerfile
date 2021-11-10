FROM node:lts as build
WORKDIR /build

COPY ./ /build

RUN npm install -g npm@8.1.3 && npm install --loglevel verbose --no-audit && npm install -g @angular/cli --no-audit && npm run build && rm -rf node_modules/

FROM nginx:latest

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /build/dist/Reverse-Angular /app

EXPOSE 80
