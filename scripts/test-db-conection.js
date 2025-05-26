const pool = require('../config/database');

async function testConnection() {
  try {
    console.log('Tentando conectar ao banco de dados...');
    const client = await pool.connect();
    console.log('Conexão estabelecida com sucesso!');
    
    console.log('Verificando se a tabela usuarios_lol existe...');
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'usuarios_lol'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('Tabela usuarios_lol existe! ✅');
      
      // Tente inserir um usuário de teste
      console.log('Tentando inserir um usuário de teste...');
      try {
        await client.query('BEGIN');
        const result = await client.query(`
          INSERT INTO usuarios_lol (username, email, password)
          VALUES ('teste_usuario', 'teste@example.com', 'senha_teste')
          RETURNING *
        `);
        console.log('Usuário teste inserido com sucesso!', result.rows[0]);
        await client.query('ROLLBACK'); // Desfaz a inserção para não deixar lixo no banco
      } catch (insertError) {
        console.error('Erro ao inserir usuário teste:', insertError.message);
      }
      
    } else {
      console.error('Tabela usuarios_lol NÃO existe! ❌');
      console.log('Tentando criar a tabela usuarios_lol...');
      
      try {
        await client.query(`
          CREATE TABLE usuarios_lol (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `);
        console.log('Tabela usuarios_lol criada com sucesso! ✅');
      } catch (createError) {
        console.error('Erro ao criar tabela:', createError.message);
      }
    }
    
    client.release();
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    console.error('Detalhes da conexão:', {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      ssl: { rejectUnauthorized: false }
    });
  } finally {
    await pool.end();
  }
}

testConnection();