const express= require('express');
const route = express.Router();

const UserController = require('./src/controllers/UserController');
const CanhotoController = require('./src/controllers/CanhotoController');
const TokenController = require('./src/controllers/TokenController');
const CargaController = require('./src/controllers/CargaController');
const StatusController = require('./src/controllers/StatusController');

route.get('/', (req, res) => {
  res.status(200).send('API Canhoto Digital');
});

route.post('/inicializar', CanhotoController.iniciarCenario);

// User
route.post('/user/login', UserController.login);

route.get('/user', UserController.findAllUsers);
route.get('/user/:id', UserController.findUserById);

route.post('/user/register', UserController.register);

route.put('/user/update/:id', UserController.update);

route.delete('/user/delete/:id', UserController.delete);

// Canhotos
route.get('/canhotos/:idCarga', CanhotoController.all);
// route.get('/canhoto/image', CanhotoController.img);
route.get('/canhoto/:id', CanhotoController.find);

route.post('/canhoto/create', CanhotoController.create);
route.post('/canhoto/save', CanhotoController.sendImg);
route.put('/canhoto/update/:id', CanhotoController.update);

route.delete('/canhoto/delete/:id', CanhotoController.delete);

// Token
route.get('/token/', TokenController.findAll);
route.post('/token/login', TokenController.login);

route.get('/token/:id', TokenController.findById);

route.post('/token/create', TokenController.create);

route.post('/token/carga/:carga', TokenController.setCarga);

route.delete('/token/carga/:carga', TokenController.desvincularCarga);

route.put('/token/update/:id', TokenController.update);

route.delete('/token/delete/:id', TokenController.delete);


// Cargas
route.get('/carga/', CargaController.findAll);
route.post('/carga/', CargaController.findAll);
route.get('/carga/:id', CargaController.findById);

route.post('/carga/create', CargaController.create);

route.put('/carga/update/:id', CargaController.update);

route.delete('/carga/delete/:id', CargaController.delete);

// Status
route.get('/status/', StatusController.findAll);
route.get('/status/:id', StatusController.findById);

route.post('/status/create', StatusController.create);

route.put('/status/update/:id', StatusController.update);

route.delete('/status/delete/:id', StatusController.delete);

module.exports = route;
