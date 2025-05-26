const express = require('express');
const router = express.Router();

// Importar controllers
const homeController = require('../controllers/HomeController');
const authController = require('../controllers/AuthController');
const characterController = require('../controllers/CharacterController');
const raceController = require('../controllers/RaceController');
const classController = require('../controllers/ClassController');
const godsController = require('../controllers/GodsController');
const equipmentController = require('../controllers/EquipmentController');

// Middleware para verificar autenticação
const checkAuth = (req, res, next) => {
  console.log('Session user:', req.session.user);
  res.locals.user = req.session.user || null;
  next();
};

// Aplicar middleware a todas as rotas
router.use(checkAuth);

// Rotas principais
router.get('/', homeController.index);
router.get('/racas', raceController.index);
router.get('/classes', classController.index);
router.get('/deuses', godsController.index);
router.get('/equipamentos', equipmentController.index);

// Rotas de autenticação
router.get('/login', authController.loginForm);
router.post('/login', authController.login);
router.get('/register', authController.registerForm);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

// Rotas para personagens/fichas
router.get('/personagens', characterController.myCharacters);
router.get('/personagens/criar', characterController.createForm);
router.post('/personagens/criar', characterController.create);
router.get('/personagens/:id', characterController.view);
router.get('/personagens/:id/editar', characterController.editForm);
router.put('/personagens/:id', characterController.update);
router.delete('/personagens/:id', characterController.delete);

module.exports = router;