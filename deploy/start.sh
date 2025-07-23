#!/bin/bash

# Создать директорию на сервере, если её нет
ssh root@46.62.142.197 'mkdir -p /root/my_web_apps/qr-generator'
ssh root@46.62.142.197 'mkdir -p /root/my_web_apps/dumps/qr-generator/'
ssh root@46.62.142.197 'ssh-keygen -t rsa -b 4096'
ssh root@46.62.142.197 'echo ============================='
ssh root@46.62.142.197 'cat /root/.ssh/id_rsa.pub'
ssh root@46.62.142.197 'echo ============================='

# Копируем всю текущую папку на сервер
rsync -avz --delete ./ root@46.62.142.197:/root/my_web_apps/qr-generator/

# Установить docker и docker compose, если не установлены
ssh root@46.62.142.197 '
    if ! command -v docker &>/dev/null; then
        apt-get update && \
        apt-get install -y ca-certificates curl gnupg && \
        install -m 0755 -d /etc/apt/keyrings && \
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
        chmod a+r /etc/apt/keyrings/docker.gpg && \
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null && \
        apt-get update && \
        apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    fi
    if ! docker compose version &>/dev/null; then
        apt-get install -y docker-compose-plugin
    fi
'

# Билд и запуск Docker на сервере
ssh root@46.62.142.197 '
    cd /root/my_web_apps/qr-generator/deploy &&
    docker compose -f ../docker-compose.production.yml build && \
    docker compose -f ../docker-compose.production.yml up -d && \
    docker compose -f ../docker-compose.production.yml run --rm qr-backend python manage.py migrate && \
    sleep 5 && \
    docker ps
'