const express = require('express');
const router = express.Router();

// Importar controllers
const homeController = require('../controllers/HomeController');
const runesController = require('../controllers/RunesController');
const spellsController = require('../controllers/SpellsController');
const damageController = require('../controllers/DamageController');
const championsController = require('../controllers/ChampionsController');
const lanesController = require('../controllers/LanesController');
const minionsController = require('../controllers/MinionsController');
const authController = require('../controllers/AuthController');

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
router.get('/runes', runesController.index);
router.get('/spells', spellsController.index);
router.get('/damage', damageController.index);
router.get('/champions', championsController.index);
router.get('/lanes', lanesController.index);
router.get('/minions', minionsController.index);

// Rotas de autenticação
router.get('/login', authController.loginForm);
router.post('/login', authController.login);
router.get('/register', authController.registerForm);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

// Rotas para o construtor de runas
router.get('/runes/builder', runesController.builder);
router.get('/runes/my-runes', runesController.myRunes);
router.post('/runes/save', runesController.saveRune);
router.delete('/runes/:id', runesController.deleteRune);

module.exports = router;