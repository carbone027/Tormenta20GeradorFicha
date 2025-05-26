// Esse arquivo é responsável por configurar a conexão com o banco de dados PostgreSQL usando o pacote 'pg'.
// Ele utiliza variáveis de ambiente para armazenar informações sensíveis, como usuário, senha e nome do banco de dados.
// O arquivo também configura o SSL para a conexão, garantindo que a comunicação com o banco de dados seja segura.
// Resumidamente, configura a conexão com o banco de dados PostgreSQL.

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
