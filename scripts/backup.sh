#!/bin/bash
set -e

# CloudOpsHub Local Backup Script for PostgreSQL
# This script creates a backup of the local PostgreSQL container database.

DB_USER="cloudops"
DB_NAME="cloudopshub"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/cloudopshub_backup_${TIMESTAMP}.sql"

mkdir -p ${BACKUP_DIR}

echo "Starting backup of ${DB_NAME} database..."

# Dump the database from the running docker container
docker exec cloudopshub-db-1 pg_dump -U ${DB_USER} -d ${DB_NAME} -F p -f /tmp/backup.sql
docker cp cloudopshub-db-1:/tmp/backup.sql ${BACKUP_FILE}
docker exec cloudopshub-db-1 rm /tmp/backup.sql

echo "Backup completed successfully: ${BACKUP_FILE}"
echo ""
echo "To restore this backup, run:"
echo "cat ${BACKUP_FILE} | docker exec -i cloudopshub-db-1 psql -U ${DB_USER} -d ${DB_NAME}"
