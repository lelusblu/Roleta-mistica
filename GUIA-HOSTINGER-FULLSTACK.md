# 🚀 GUIA COMPLETO: DEPLOY RULETA MÍSTICA NO HOSTINGER (FULL-STACK)

## 🎯 OVERVIEW - O QUE VAMOS FAZER
Vamos colocar sua Ruleta Mística completa no Hostinger com:
- ✅ Frontend (parte visual que usuário vê)
- ✅ Backend (servidor que processa dados) 
- ✅ Banco de dados (onde fica salvo tudo)
- ✅ Domínio próprio (www.seusite.com)

## 💰 PASSO 1: CONTRATAR HOSTINGER

### **Plano Recomendado: VPS**
- 🏷️ **Nome**: VPS KVM 1 ou VPS KVM 2
- 💰 **Preço**: ~$3.99-7.99/mês
- 🔧 **Por que VPS**: Permite instalar o que precisamos

### **Como Contratar:**
1. 🌐 Acesse: https://www.hostinger.com.br
2. 🖱️ Clique em "VPS" no menu
3. 📋 Escolha: "VPS KVM 1" (suficiente para começar)
4. 💳 Complete a compra
5. 📧 Aguarde email com dados de acesso

### **⚠️ IMPORTANTE:**
- Escolha **Ubuntu 20.04** como sistema operacional
- Marque "Painel de Controle hPanel" se disponível
- Anote bem usuário e senha que receberá

## 🖥️ PASSO 2: ACESSAR SEU SERVIDOR

### **Opção A: Pelo hPanel (Mais Fácil)**
1. 📧 Abra email da Hostinger
2. 🖱️ Clique no link do hPanel
3. 🔑 Faça login com seus dados
4. 🖥️ Vá em "VPS" → "Gerenciar"

### **Opção B: SSH (Se souber)**
- Usuário receberá IP, usuário e senha
- Use PuTTY (Windows) ou Terminal (Mac/Linux)

## 🔧 PASSO 3: PREPARAR O SERVIDOR

### **Comandos para Executar** (copie e cole um por vez):

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js (para o frontend)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar se instalou
node --version
npm --version

# Instalar Python (para o backend)
sudo apt install python3 python3-pip python3-venv -y

# Instalar MongoDB (banco de dados)
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Instalar Nginx (servidor web)
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Instalar PM2 (para manter app rodando)
sudo npm install -g pm2
```

## 📁 PASSO 4: ENVIAR ARQUIVOS DO PROJETO

### **Método 1: Git (Recomendado)**
```bash
# No servidor, execute:
cd /home
git clone SEU_REPOSITORIO_GITHUB ruleta-mistica
cd ruleta-mistica
```

### **Método 2: Upload Manual**
1. 📁 Comprima seu projeto em ZIP
2. 🌐 Use FileZilla ou hPanel File Manager
3. 📤 Faça upload para `/home/ruleta-mistica/`
4. 📦 Extraia os arquivos

## ⚙️ PASSO 5: CONFIGURAR BACKEND

```bash
# Entrar na pasta do backend
cd /home/ruleta-mistica/backend

# Criar ambiente virtual Python
python3 -m venv venv
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Criar arquivo de configuração
sudo nano .env
```

### **No arquivo .env, cole:**
```
MONGO_URL=mongodb://localhost:27017/
DB_NAME=ruleta_mistica
```
**💡 Para sair do editor:** Ctrl+X, depois Y, depois Enter

## 🌐 PASSO 6: CONFIGURAR FRONTEND

```bash
# Entrar na pasta do frontend
cd /home/ruleta-mistica/frontend

# Instalar dependências
npm install

# Criar arquivo de produção
sudo nano .env.production
```

### **No arquivo .env.production, cole:**
```
REACT_APP_BACKEND_URL=http://SEU_DOMINIO.com
```
**💡 Substitua "SEU_DOMINIO.com" pelo seu domínio real**

```bash
# Fazer build de produção
npm run build
```

## 🚀 PASSO 7: INICIAR APLICAÇÃO

### **Iniciar Backend:**
```bash
cd /home/ruleta-mistica/backend
source venv/bin/activate
pm2 start "uvicorn server:app --host 0.0.0.0 --port 8001" --name backend
```

### **Verificar se backend iniciou:**
```bash
pm2 status
curl http://localhost:8001/api/health
```
**Deve retornar:** `{"status":"healthy"}`

## 🌐 PASSO 8: CONFIGURAR NGINX

```bash
# Criar configuração do site
sudo nano /etc/nginx/sites-available/ruleta-mistica
```

### **Cole esta configuração:**
```nginx
server {
    listen 80;
    server_name SEU_DOMINIO.com www.SEU_DOMINIO.com;

    # Frontend (React)
    location / {
        root /home/ruleta-mistica/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend (API)
    location /api/ {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_request_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
**💡 Substitua "SEU_DOMINIO.com" pelo seu domínio**

### **Ativar configuração:**
```bash
sudo ln -s /etc/nginx/sites-available/ruleta-mistica /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🌍 PASSO 9: CONFIGURAR DOMÍNIO

### **Na Hostinger:**
1. 🌐 Vá no hPanel
2. 🎯 Clique em "Domínios"
3. ⚙️ Clique em "Gerenciar" no seu domínio
4. 📋 Vá em "DNS / Nameservers"
5. ➕ Adicione registro A:
   - **Nome**: @ (ou deixe vazio)
   - **Tipo**: A
   - **Valor**: IP_DO_SEU_VPS
6. ➕ Adicione outro registro A:
   - **Nome**: www
   - **Tipo**: A  
   - **Valor**: IP_DO_SEU_VPS

### **💡 Como descobrir IP do VPS:**
```bash
curl ifconfig.me
```

## 🔒 PASSO 10: INSTALAR SSL (HTTPS)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obter certificado SSL GRATUITO
sudo certbot --nginx -d SEU_DOMINIO.com -d www.SEU_DOMINIO.com
```

## ✅ PASSO 11: TESTAR TUDO

### **Verificações:**
1. 🌐 Acesse: `http://SEU_DOMINIO.com`
2. 📋 Preencha o formulário
3. 🎰 Gire a roleta
4. 🔮 Veja se interpretação aparece
5. 💎 Teste página promocional

### **Comandos de Verificação:**
```bash
# Ver se serviços estão rodando
pm2 status
sudo systemctl status nginx
sudo systemctl status mongod

# Ver logs se houver erro
pm2 logs backend
sudo tail -f /var/log/nginx/error.log
```

## 🔧 COMANDOS ÚTEIS PARA DEPOIS

### **Reiniciar Serviços:**
```bash
pm2 restart backend
sudo systemctl restart nginx
```

### **Ver Logs:**
```bash
pm2 logs backend
sudo journalctl -u nginx
```

### **Atualizar Código:**
```bash
cd /home/ruleta-mistica
git pull origin main
cd backend && pm2 restart backend
cd ../frontend && npm run build
```

## 🆘 RESOLUÇÃO DE PROBLEMAS

### **Site não carrega:**
- Verifique se domínio aponta para IP correto
- Aguarde até 24h para DNS propagar

### **API não funciona:**
```bash
pm2 status
pm2 restart backend
```

### **Banco não conecta:**
```bash
sudo systemctl status mongod
sudo systemctl start mongod
```

## 📞 SUPORTE

Se tiver dúvidas:
1. 💬 Hostinger tem chat 24/7
2. 📧 Suporte por email
3. 🆘 Use comandos de verificação acima

## 🎉 PARABÉNS!

Quando tudo funcionar, você terá:
- ✅ Site profissional no ar
- ✅ Dados sendo salvos no banco
- ✅ Facebook Pixel funcionando
- ✅ SSL/HTTPS seguro
- ✅ Sistema completo de conversão

**Seu negócio está pronto para escalar!** 🚀