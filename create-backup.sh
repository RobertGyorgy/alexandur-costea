#!/bin/bash

# Script pentru crearea unei arhive de backup fără node_modules

PROJECT_NAME="alex-costea-landing"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="${PROJECT_NAME}_backup_${TIMESTAMP}"

echo "📦 Creând backup pentru $PROJECT_NAME..."
echo ""

# Creează arhiva tar.gz
tar -czf "${BACKUP_NAME}.tar.gz" \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='out' \
  --exclude='*.log' \
  --exclude='.DS_Store' \
  --exclude='tsconfig.tsbuildinfo' \
  --exclude='.pnpm-store' \
  --exclude='.vercel' \
  --exclude='*.zip' \
  --exclude='*.tar.gz' \
  --exclude='site-export.zip' \
  .

if [ $? -eq 0 ]; then
  SIZE=$(du -h "${BACKUP_NAME}.tar.gz" | cut -f1)
  echo "✅ Backup creat cu succes!"
  echo "📁 Fișier: ${BACKUP_NAME}.tar.gz"
  echo "📊 Dimensiune: $SIZE"
  echo ""
  echo "💡 Pentru a extrage: tar -xzf ${BACKUP_NAME}.tar.gz"
else
  echo "❌ Eroare la crearea backup-ului"
  exit 1
fi


