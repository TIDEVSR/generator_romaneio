const { Canhoto } = require('../models/CanhotoModel');
const { createCenario } = require('../models/createCenario');

exports.iniciarCenario = async (req, res) => {
  try {
    await createCenario();
    
    res.status(200).send('Cenário criado com sucesso!');
  }
  catch(e) {
    res.status(400).send(e.message);
  }
};

exports.sendImg = async (req, res) => {
  try { 
    const file = await new Canhoto(req.body).createAnexo();
    res.status(200).send({file});
  } 
  catch(e) { 
    res.status(400).send(e.message); 
  }
};

exports.create = async (req, res) => {
  try {
    const model = new Canhoto(req.body);

    await model.create();

    res.status(200).send(model.canhoto);
  }
  catch(e) {
    res.status(400).send(e.message); 
  }
};

exports.update = async (req, res) => {
  try {
    const model = new Canhoto(req.body);

    await model.update(req.params.id);

    res.status(200).send(model.canhoto);
  }
  catch(e) {
    res.status(400).send(e.message); 
  }
};

exports.delete = async (req, res) => {
  try {
    const model = new Canhoto(req.body);

    await model.delete(req.params.id);

    res.status(200).send(model.canhoto);
  }
  catch(e) {
    res.status(400).send(e.message); 
  }
};

exports.find = async (req, res) => {
  try {
    const model = await Canhoto.find(req.params.id);

    res.status(200).send(model);
  }
  catch(e) {
    res.status(400).send(e.message); 
  }
};

exports.all = async (req, res) => {
  try {
    const model = await Canhoto.all(req.params.idCarga);

    res.status(200).send(model);
  }
  catch(e) {
    res.status(400).send(e.message); 
  }
};


/*
exports.login = async (req, res) => {
  
};

exports.update = async (req, res) => {
  
};

exports.delete = async (req, res) => {
  
};

exports.findAll = async (req, res) => {
  
};

exports.findById = async (req, res) => {
 
};*/