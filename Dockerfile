FROM node:lts as build
WORKDIR /build

COPY ./ /build

RUN npm install
RUN npm install -g @angular/cli
RUN npm run build

FROM nginx:latest

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /build/dist/Reverse-Angular /app

EXPOSE 80
