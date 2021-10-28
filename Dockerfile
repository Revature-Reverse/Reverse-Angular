FROM node:latest as build
WORKDIR /build

COPY ./ /build

RUN npm install
RUN npm run build

FROM nginx:latest

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /build/dist/Reverse-Angular /app

EXPOSE 80
