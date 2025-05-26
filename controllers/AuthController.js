const User = require('../models/User');

exports.loginForm = (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    activePage: 'login',
    user: req.session.user
  });
};

exports.login = async (req, res) => {
  try {
    console.log('Login: Dados recebidos', req.body);
    const { username, password } = req.body;
    
    // Verificar se recebemos os dados do formulário
    if (!username || !password) {
      console.error('Dados de login incompletos');
      return res.render('auth/login', {
        title: 'Login',
        activePage: 'login',
        error: 'Por favor, preencha todos os campos'
      });
    }
    
    const user = await User.findByUsername(username);
    console.log('Usuário encontrado:', user ? 'Sim' : 'Não');
    
    if (!user) {
      return res.render('auth/login', {
        title: 'Login',
        activePage: 'login',
        error: 'Usuário ou senha inválidos'
      });
    }

    const isValid = await User.verifyPassword(user, password);
    console.log('Senha válida:', isValid ? 'Sim' : 'Não');
    
    if (!isValid) {
      return res.render('auth/login', {
        title: 'Login',
        activePage: 'login',
        error: 'Usuário ou senha inválidos'
      });
    }

    // Configurar sessão
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    
    console.log('Sessão configurada:', req.session.user);
    console.log('Redirecionando para a página inicial');
    
    return res.redirect('/');
  } catch (error) {
    console.error('Erro de login:', error);
    res.render('auth/login', {
      title: 'Login',
      activePage: 'login',
      error: 'Ocorreu um erro ao fazer login: ' + error.message
    });
  }
};

exports.registerForm = (req, res) => {
  res.render('auth/register', {
    title: 'Registro',
    activePage: 'register'
  });
};

exports.register = async (req, res) => {
  try {
    console.log('Register: Dados recebidos', req.body);
    await User.create(req.body.username, req.body.email, req.body.password);
    console.log('Usuário criado com sucesso');
    const { username, email, password, confirmPassword } = req.body;
    
    // Verificar se recebemos os dados do formulário
    if (!username || !email || !password || !confirmPassword) {
      console.error('Dados de registro incompletos');
      return res.render('auth/register', {
        title: 'Registro',
        activePage: 'register',
        error: 'Por favor, preencha todos os campos'
      });
    }
    
    if (password !== confirmPassword) {
      return res.render('auth/register', {
        title: 'Registro',
        activePage: 'register',
        error: 'As senhas não coincidem'
      });
    }

    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.render('auth/register', {
        title: 'Registro',
        activePage: 'register',
        error: 'Este nome de usuário já está em uso'
      });
    }

    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.render('auth/register', {
        title: 'Registro',
        activePage: 'register',
        error: 'Este email já está registrado'
      });
    }

    console.log('Criando novo usuário...');
    const user = await User.create(username, email, password);
    console.log('Usuário criado com sucesso:', user);
    
    // Configurar sessão
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    
    console.log('Sessão configurada:', req.session.user);
    console.log('Redirecionando para a página inicial');
    
    return res.redirect('/');
  } catch (error) {
    console.error('Erro de registro:', error);
    res.render('auth/register', {
      title: 'Registro',
      activePage: 'register',
      error: 'Ocorreu um erro ao registrar: ' + error.message
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};