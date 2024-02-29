const express= require('express');
const route = express.Router();

const RomaneioController = require('./src/controllers/RomaneioController');

route.get('/', (req, res) => {
  res.status(200).send('API Romaneio');
});

route.get('/romaneio/', RomaneioController.all);


module.exports = route;
