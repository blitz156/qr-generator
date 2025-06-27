run_back:
	docker compose run --rm --service-ports --use-aliases qr-backend

run_celery:
	docker compose run --rm --service-ports --use-aliases qr-backend-celery

run_front:
	docker compose run --rm --service-ports --use-aliases qr-frontend

run_bash:
	docker compose run --rm -it qr-backend bash

run_deploy:
	sh ./deploy/deploy.sh

run_ssh:
	ssh root@65.109.4.187

restore_db_from_local:
	# Create backup of local database
	docker compose exec postgres pg_dumpall -U postgres > backup.sql
	# Copy backup to remote server
	scp backup.sql root@65.109.4.187:/root/my_web_apps/qr-generator/
	# Stop remote postgres, remove container, start fresh instance and restore backup
	ssh root@65.109.4.187 'cd /root/my_web_apps/qr-generator && \
		docker stop qr-generator-postgres-1 && \
		docker rm qr-generator-postgres-1 && \
		docker compose up -d postgres && \
		sleep 5 && \
		docker cp /root/my_web_apps/qr-generator/backup.sql qr-generator-postgres-1:/backup.sql && \
		docker compose exec postgres psql -U postgres -f /backup.sql && \
		docker compose up -d'
	# Remove local backup file
	rm backup.sql

restore_db_from_remote:
	# Create backup from remote database
	ssh root@65.109.4.187 'cd /root/my_web_apps/qr-generator && \
		docker compose exec postgres pg_dump -U postgres postgres' > backup_$$(date +%Y%m%d).sql
	# Stop local postgres to avoid connection issues
	docker compose stop postgres
	# Start fresh postgres instance
	docker compose up -d postgres
	# Wait for postgres to be ready
	sleep 5
	# Restore the backup
	docker compose exec -T postgres psql -U postgres postgres < backup_$$(date +%Y%m%d).sql