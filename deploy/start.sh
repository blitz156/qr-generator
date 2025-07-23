#!/bin/bash

# Копируем всю текущую папку на сервер
rsync -avz --delete ./ root@46.62.142.197:/root/my_web_apps/qr-generator/

# Билд и запуск Docker на сервере
ssh root@46.62.142.197 '
    cd /root/my_web_apps/qr-generator/deploy &&
    docker compose -f ../docker-compose.production.yml build && \
    docker compose -f ../docker-compose.production.yml up -d && \
    docker compose -f ../docker-compose.production.yml run --rm qr-backend python manage.py migrate && \
    sleep 5 && \
    docker ps
'