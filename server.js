const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
require('dotenv').config();

// Configurar sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'tormenta20_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 dia
}));

// Middleware para processar JSON e dados de formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura o mecanismo de views para EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Define a pasta pública com CSS e outros arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Middleware para debug de formulários
app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('POST body:', req.body);
  }
  next();
});

// Rotas
const routes = require('./routes/index');
app.use('/', routes);

// Tratamento de erros
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Página não encontrada',
    error: { status: 404 },
    user: req.session.user
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).render('error', {
    message: err.message || 'Erro interno do servidor',
    error: err,
    user: req.session.user
  });
});

// Inicializa o servidor
const PORT = process.env.PORT || 3100;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🎲 Servidor Tormenta20 rodando na porta http://localhost:${PORT}`);
  });
}

module.exports = app;