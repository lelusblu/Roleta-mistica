#!/bin/bash

echo "🚀 Construyendo Ruleta Mística para producción estática..."

cd /app/frontend

echo "📦 Instalando dependencias..."
yarn install

echo "🔨 Creando build de producción..."
REACT_APP_MODE=static yarn build

echo "📁 Listando archivos del build..."
ls -la build/

echo "✅ Build completado!"
echo ""
echo "📋 INSTRUCCIONES PARA ATOMICAT:"
echo "1. Comprimir la carpeta 'build' en un archivo ZIP"
echo "2. Subir el ZIP al Atomicat"
echo "3. Configurar el index.html como página principal"
echo ""
echo "🎯 El app funcionará en modo estático (sin backend)"
echo "📊 Facebook Pixel funcionará normalmente"
echo "💾 Datos se guardarán en localStorage del navegador"