#!/bin/bash

echo "🚀 SCRIPT DE INSTALAÇÃO AUTOMÁTICA - RULETA MÍSTICA"
echo "=================================================="
echo ""
echo "⚠️  IMPORTANTE: Execute este script no seu VPS Hostinger"
echo "📋 Certifique-se que escolheu Ubuntu 20.04"
echo ""
read -p "Pressione ENTER para continuar..."

echo ""
echo "📦 1/8 - Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

echo ""
echo "📦 2/8 - Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "✅ Node.js instalado: $(node --version)"

echo ""
echo "📦 3/8 - Instalando Python..."
sudo apt install python3 python3-pip python3-venv -y
echo "✅ Python instalado: $(python3 --version)"

echo ""
echo "📦 4/8 - Instalando MongoDB..."
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

echo ""
echo "📦 5/8 - Iniciando MongoDB..."
sudo systemctl start mongod
sudo systemctl enable mongod
echo "✅ MongoDB iniciado"

echo ""
echo "📦 6/8 - Instalando Nginx..."
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
echo "✅ Nginx instalado e iniciado"

echo ""
echo "📦 7/8 - Instalando PM2..."
sudo npm install -g pm2
echo "✅ PM2 instalado"

echo ""
echo "📦 8/8 - Instalando Git..."
sudo apt install git -y
echo "✅ Git instalado"

echo ""
echo "🎉 INSTALAÇÃO BÁSICA COMPLETA!"
echo "================================"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. Clone seu repositório: git clone https://github.com/SEU_USUARIO/SEU_REPO.git"
echo "2. Configure os arquivos .env"
echo "3. Instale dependências do projeto"
echo "4. Configure Nginx"
echo "5. Configure seu domínio"
echo ""
echo "✅ Servidor está pronto para receber sua Ruleta Mística!"