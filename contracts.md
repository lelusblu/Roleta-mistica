# 🔮 Roleta Mística - Contratos de API Backend

## 📋 Resumo do Projeto
Sistema de captura de leads através de consulta mística de tarot com roleta interativa e página promocional.

## 🎯 Objetivos do Backend
1. **Capturar e armazenar leads** (nome, email, pergunta)
2. **Registrar leituras de tarot** realizadas
3. **Fornecer dados para análise** de conversão
4. **Persistir histórico** de consultas

## 🗄️ Modelos de Dados MongoDB

### 1. **Lead Model** (`leads`)
```javascript
{
  _id: ObjectId,
  name: String,           // Nome completo
  email: String,          // Email (único por sessão)
  question: String,       // Pergunta mística
  created_at: Date,       // Data de captura
  ip_address: String,     // IP para análise
  user_agent: String,     // Browser info
  session_id: String,     // Sessão única
  status: String          // "active", "converted", "abandoned"
}
```

### 2. **Reading Model** (`readings`)
```javascript
{
  _id: ObjectId,
  lead_id: ObjectId,      // Referência ao lead
  card_id: Number,        // ID da carta selecionada
  card_name: String,      // Nome da carta
  card_interpretation: String, // Interpretação
  question: String,       // Pergunta feita
  created_at: Date,       // Data da leitura
  session_id: String,     // Sessão
  proceeded_to_promo: Boolean, // Se clicou no CTA
  promo_clicked_at: Date  // Quando clicou na promoção
}
```

## 🔌 Endpoints da API

### 1. **POST /api/leads** - Capturar Lead
**Request:**
```javascript
{
  "name": "Ana Silva",
  "email": "ana@email.com", 
  "question": "Como atrair abundância?",
  "session_id": "uuid-session-id"
}
```
**Response:**
```javascript
{
  "success": true,
  "lead_id": "ObjectId",
  "message": "Lead capturado com sucesso"
}
```

### 2. **POST /api/readings** - Registrar Leitura
**Request:**
```javascript
{
  "lead_id": "ObjectId",
  "card_id": 1,
  "card_name": "O Louco",
  "card_interpretation": "...",
  "question": "Como atrair abundância?",
  "session_id": "uuid-session-id"
}
```
**Response:**
```javascript
{
  "success": true,
  "reading_id": "ObjectId"
}
```

### 3. **PUT /api/readings/:id/promo-click** - Registrar Clique na Promoção
**Request:**
```javascript
{
  "clicked_at": "2024-01-15T10:30:00Z"
}
```

### 4. **GET /api/stats** - Estatísticas (Opcional)
**Response:**
```javascript
{
  "total_leads": 150,
  "total_readings": 140, 
  "conversion_rate": 0.85,
  "recent_leads": [...],
  "top_questions": [...]
}
```

## 🔄 Integração Frontend → Backend

### **Dados Mockados que serão substituídos:**
1. **UserForm submission** → Salvar no MongoDB via `/api/leads`
2. **Card selection** → Salvar leitura via `/api/readings` 
3. **CTA promocional click** → Atualizar via `/api/readings/:id/promo-click`
4. **localStorage** → Manter para UX + sincronizar com backend

### **Fluxo de Integração:**
1. **Etapa 1 - Formulário:**
   - Frontend: Coleta nome, email, pergunta
   - Backend: Cria lead em `/api/leads`
   - Storage: Salva `lead_id` no localStorage

2. **Etapa 2 - Roleta:**
   - Frontend: Seleciona carta aleatória (mantém mock)
   - Backend: Registra leitura em `/api/readings`
   - Storage: Salva `reading_id` no localStorage

3. **Etapa 3 - Promoção:**
   - Frontend: Clique no CTA promocional
   - Backend: Atualiza reading com `proceeded_to_promo: true`

## 🛠️ Implementação Backend

### **Arquivos a criar/modificar:**
1. **`/app/backend/models/`** - Modelos Mongoose
2. **`/app/backend/routes/`** - Rotas da API
3. **`/app/backend/server.py`** - Adicionar novas rotas
4. **Frontend components** - Integrar chamadas da API

### **Validações:**
- Email único por sessão
- Session ID obrigatório
- Rate limiting para evitar spam
- Sanitização de dados de entrada

### **Tratamento de Erros:**
- Conexão com MongoDB
- Validação de dados
- Timeout de requests
- Logs de erro para debug

## 🔒 Segurança
- Validação de email
- Sanitização de inputs
- Rate limiting
- CORS configurado
- Não exposição de dados sensíveis

## 📊 Analytics Futuras
- Funil de conversão
- Cartas mais populares
- Perguntas mais comuns
- Taxa de clique na promoção
- Origem geográfica dos leads