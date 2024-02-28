const { salvarImagemNaPasta } = require('../util/upload');
const { CanhotoModel, StatusModel } = require('./migrations');

class Canhoto {
  constructor(body) {
    this.body = body;
    this.canhoto = null;
  }

  async createAnexo() {
    return await salvarImagemNaPasta(this.body.file, this.body.nf);
  }

  async create() {
    this.body.idStatus = '2';
    this.cleanUp();

    if(!this.body.nf) throw new Error('Não é possivel criar um Canhoto sem uma Nota Fiscal atrelada.');

    if(this.body.nf === '') throw new Error('Não é possivel criar um Canhoto sem uma Nota Fiscal atrelada.');

    this.canhoto = await CanhotoModel.create(this.body);

    if(!this.canhoto) throw new Error('Não foi possivel realizar a criação do canhoto.');
  }

  async update(id) {
    this.cleanUp();

    this.canhoto = await CanhotoModel.findByPk(id);

    if(!this.canhoto) throw new Error('Não foi possivel encontrar nenhum canhoto atrelado a este ID.');

    console.log(this.body);

    await this.canhoto.update({
      ...this.body
    });
  }

  async delete(id) {
    this.cleanUp();

    this.canhoto = await CanhotoModel.findByPk(id);

    if(!this.canhoto) throw new Error('Não foi possivel encontrar nenhum canhoto atrelado a este ID.');


    return await this.canhoto.destroy();
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  
    this.body = {
      latitude: this.body.latitude,
      longitude: this.body.longitude,
      nf: this.body.nf,
      arquivo: this.body.arquivo,
      idCarga: this.body.idCarga,
      idStatus: this.body.idStatus
    };
  }
  
  // Metodos Static
  static async all(idCarga) {
    const canhotos = idCarga != 0 ? await CanhotoModel.findAll({ 
      include: [StatusModel],
      where: { idCarga },
      order: [[
        'idStatus',
        'ASC'
      ]]
    }) : await CanhotoModel.findAll({ 
      include: [StatusModel],
      order: [[
        'idStatus',
        'ASC'
      ]]
    });
   
    if(!canhotos.length > 0) throw new Error('Não existe nenhum canhoto em nossa base de dados atrelado a essa carga.');

    return canhotos;
  }

  static async find(id) {
    const canhoto = await CanhotoModel.findOne({ where: { id }, include: [StatusModel]});

    if(!canhoto) throw new Error('Não foi possivel encontrar nenhum canhoto atrelado a este id.');

    return canhoto;
  }
}

module.exports.Canhoto = Canhoto;
