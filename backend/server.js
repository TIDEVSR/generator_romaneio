require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const { middlewareGlobal } = require('./src/middlewares/middleware');
 
const app = express();

app.use(cors());
const corsOptions = {
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(express.urlencoded( {extended: true, limit: '8000mb'} )); 
app.use(express.json({limit: '8000mb'}));
app.use(express.static(path.resolve(__dirname, 'public')));


app.use(middlewareGlobal);

app.use(routes);

const database = require('./db');

database.sync().then(() => {
  app.emit('online');
}).catch(e => console.log(e));

const port = process.env.SERVER_PORT || 8080;

app.on('online', () => {
  app.listen(port, () => {
    console.log('\n');
    console.log('Servidor rodando!');
    console.log('Acesse em: http://localhost:'+port);
    console.log(`Servidor ativo na porta: [${port}]!`);
    console.log('\n');
  });
});