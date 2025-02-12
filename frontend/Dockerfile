# build...
FROM node:20.10.0-alpine as build

RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . ./
RUN yarn run build

# production...
FROM nginx:1.25.0-bullseye

# Update packages and install gettext
RUN apt-get update && apt-get install -y gettext

# Copy project files...
COPY --from=build /app/build /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/env.js
COPY docker.env.js /usr/share/nginx/html/env.tmp.js
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080

# Copy entrypoint...
COPY entrypoint.sh /usr/share/nginx/html/entrypoint.sh
RUN sed -i 's/\r$//' /usr/share/nginx/html/entrypoint.sh
RUN chmod +x /usr/share/nginx/html/entrypoint.sh
ENTRYPOINT ["bash", "/usr/share/nginx/html/entrypoint.sh"]
