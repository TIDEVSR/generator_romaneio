const { RomaneioModel } = require('./migrations');

class Romaneio {
  constructor(body) {
    this.body = body;
    this.romaneios = null;
  }

  async findAllByOrdem(cod_ordem) {
    this.romaneios = await RomaneioModel.findAll({
      where: {
        cod_ordem,
      }
    });

    if(!this.romaneios) throw new Error('Não foram encontrados romaneios atrelados a esta ordem.');
  }
}

module.exports.Romaneio = Romaneio;
