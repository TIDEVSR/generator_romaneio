const { RomaneioModel } = require('./migrations');

class Romaneio {
  constructor(body) {
    this.body = body;
    this.romaneios = null;
  }

  async findAllByOrdem(params) {
    if (params.ordem)  {
      this.romaneios = await RomaneioModel.findAll({
        where: {
          cod_ordem: Number(params.ordem),
        },
        attributes: [
          'data_registro', 'cod_romaneio', 'cod_ordem', 'cod_lote', 'nome_cliente', 'nome_cidade', 'item_sr', 'item_cliente', 'peso_bruto', 'peso_liquido', 'peso_tubete', 'endereco', 'qtd_volume', 'data_producao', 'peso_palete'
        ]
      });
    }
    else if (params.romaneio) {
      this.romaneios = await RomaneioModel.findOne({
        where: {
          cod_romaneio: Number(params.romaneio),
        },
        attributes: [
          'data_registro', 'cod_romaneio', 'cod_ordem', 'cod_lote', 'nome_cliente', 'nome_cidade', 'item_sr', 'item_cliente', 'peso_bruto', 'peso_liquido', 'peso_tubete', 'endereco', 'qtd_volume', 'data_producao', 'peso_palete'
        ]
      });
    }
    else {
      this.romaneios = null;
    }


    if(!this.romaneios) throw new Error('Não foram encontrados romaneios atrelados a esta ordem.');
  }
}

module.exports.Romaneio = Romaneio;
