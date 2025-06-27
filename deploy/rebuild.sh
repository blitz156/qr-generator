docker exec -t $(docker inspect -f "{{.Id}}" qr-generator-postgres-1) pg_dump -U postgres -d postgres -F p > /root/my_web_apps/dumps/qr-generator/$(date +"%Y-%m-%d_%H:%M:%S").sql

git pull origin master

docker compose -f ../docker-compose.production.yml build
docker compose -f ../docker-compose.production.yml stop
docker compose -f ../docker-compose.production.yml up -d

docker compose -f ../docker-compose.production.yml run --rm qr-backend python manage.py migrate

sleep 5
docker ps
