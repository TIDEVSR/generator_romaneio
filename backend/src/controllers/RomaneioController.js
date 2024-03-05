const { Romaneio } = require('../models/RomaneioModel');

exports.all = async (req, res) => {
  try {
    const model = new Romaneio();
    
    await model.findAllByOrdem(req.query);

    res.status(200).send(model.romaneios);
  }
  catch(e) {
    res.status(400).send(e.message); 
  }
};
