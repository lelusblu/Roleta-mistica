# ✅ CHECKLIST DEPLOY HOSTINGER - RULETA MÍSTICA

## 📋 ANTES DE COMEÇAR
- [ ] Contratei VPS Hostinger (VPS KVM 1 ou 2)
- [ ] Escolhi Ubuntu 20.04 como sistema
- [ ] Recebi email com dados de acesso (IP, usuário, senha)
- [ ] Tenho meu domínio configurado na Hostinger
- [ ] Código da Ruleta Mística está no GitHub

## 🏗️ FASE 1: PREPARAR SERVIDOR
- [ ] Acessei meu VPS via hPanel ou SSH
- [ ] Executei comandos de instalação:
  - [ ] Atualizei sistema (`sudo apt update && sudo apt upgrade -y`)
  - [ ] Instalei Node.js
  - [ ] Instalei Python 
  - [ ] Instalei MongoDB
  - [ ] Instalei Nginx
  - [ ] Instalei PM2
- [ ] Verifiquei que todos serviços estão rodando

## 📁 FASE 2: CÓDIGO NO SERVIDOR
- [ ] Clonei projeto do GitHub para `/home/ruleta-mistica/`
- [ ] OU fiz upload manual dos arquivos
- [ ] Verifiquei que pastas `/backend` e `/frontend` existem

## ⚙️ FASE 3: CONFIGURAR BACKEND
- [ ] Entrei na pasta `/home/ruleta-mistica/backend`
- [ ] Criei ambiente virtual Python (`python3 -m venv venv`)
- [ ] Ativei ambiente (`source venv/bin/activate`)
- [ ] Instalei dependências (`pip install -r requirements.txt`)
- [ ] Criei arquivo `.env` com:
  ```
  MONGO_URL=mongodb://localhost:27017/
  DB_NAME=ruleta_mistica
  ```
- [ ] Iniciei backend com PM2 (`pm2 start "uvicorn server:app --host 0.0.0.0 --port 8001" --name backend`)
- [ ] Testei API: `curl http://localhost:8001/api/health`

## 🌐 FASE 4: CONFIGURAR FRONTEND  
- [ ] Entrei na pasta `/home/ruleta-mistica/frontend`
- [ ] Instalei dependências (`npm install`)
- [ ] Criei `.env.production` com `REACT_APP_BACKEND_URL=http://meudominio.com`
- [ ] Fiz build (`npm run build`)
- [ ] Verifiquei que pasta `build/` foi criada

## 🌍 FASE 5: CONFIGURAR NGINX
- [ ] Criei arquivo `/etc/nginx/sites-available/ruleta-mistica`
- [ ] Colei configuração do Nginx (substituindo MEU_DOMINIO)
- [ ] Ativei site (`sudo ln -s /etc/nginx/sites-available/ruleta-mistica /etc/nginx/sites-enabled/`)
- [ ] Testei configuração (`sudo nginx -t`)
- [ ] Recarreguei Nginx (`sudo systemctl reload nginx`)

## 🎯 FASE 6: CONFIGURAR DOMÍNIO
- [ ] No hPanel, fui em Domínios → Gerenciar
- [ ] Adicionei registro A: `@` → IP_DO_VPS
- [ ] Adicionei registro A: `www` → IP_DO_VPS
- [ ] Aguardei propagação DNS (até 24h)

## 🔒 FASE 7: SSL GRÁTIS
- [ ] Instalei Certbot (`sudo apt install certbot python3-certbot-nginx -y`)
- [ ] Obtive certificado SSL (`sudo certbot --nginx -d meudominio.com -d www.meudominio.com`)
- [ ] Confirmei que site abre com HTTPS

## ✅ FASE 8: TESTES FINAIS
- [ ] Site carrega: `https://meudominio.com`
- [ ] Formulário funciona (dados salvam no banco)
- [ ] Ruleta gira e mostra interpretação
- [ ] Página promocional aparece
- [ ] Facebook Pixel está funcionando (verificar no F12 → Console)
- [ ] Versão mobile funciona bem

## 🔧 COMANDOS DE VERIFICAÇÃO
```bash
# Verificar serviços
pm2 status                    # Backend deve estar "online"
sudo systemctl status nginx  # Deve estar "active (running)"
sudo systemctl status mongod # Deve estar "active (running)"

# Ver logs se houver erro
pm2 logs backend
sudo tail -f /var/log/nginx/error.log
```

## 🆘 PROBLEMAS COMUNS

### Site não abre:
- [ ] Verifiquei se domínio aponta para IP correto
- [ ] Aguardei propagação DNS
- [ ] Testei `http://IP_DO_VPS` diretamente

### API não funciona:
- [ ] `pm2 restart backend`
- [ ] Verifiquei logs: `pm2 logs backend`
- [ ] Testei: `curl http://localhost:8001/api/health`

### Banco não conecta:
- [ ] `sudo systemctl restart mongod`
- [ ] Verifiquei: `sudo systemctl status mongod`

## 🎉 SUCESSO!
Quando todos os checkboxes estiverem marcados, sua Ruleta Mística estará:
- ✅ No ar com domínio próprio
- ✅ Salvando dados reais no banco
- ✅ Com SSL/HTTPS seguro  
- ✅ Facebook Pixel funcionando
- ✅ Pronta para converter leads em vendas!

**🚀 Seu negócio digital está OFICIALMENTE lançado!**