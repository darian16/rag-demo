#!/usr/bin/env bash
envsubst < /usr/share/nginx/html/env.tmp.js > /usr/share/nginx/html/env.js \

checksum="$(printenv | grep BUILD_NUMBER)"

export WORKBOX_ID="$(echo -n "$checksum" | md5sum )"

envsubst < /usr/share/nginx/html/service-worker.js > /usr/share/nginx/html/service-worker-tmp.js \

rm -f /usr/share/nginx/html/service-worker.js
mv /usr/share/nginx/html/service-worker-tmp.js /usr/share/nginx/html/service-worker.js
rm -f /usr/share/nginx/html/service-worker-tmp.js

nginx -g 'daemon off;'
