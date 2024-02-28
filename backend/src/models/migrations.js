const { DataTypes } = require('sequelize');

const database = require('../../db');

const RomaneioModel = database.define('z_romaneios', {
  data_registro: {
    type: DataTypes.INTEGER,
  },
  cod_romaneio: {
    type: DataTypes.INTEGER,
  },
  cod_ordem: {
    type: DataTypes.INTEGER,
  },
  cod_lote: {
    type: DataTypes.INTEGER,
  },
  nome_cliente: {
    type: DataTypes.STRING,
  },
  nome_cidade: {
    type: DataTypes.STRING,
  },
  item_sr: {
    type: DataTypes.STRING,
  },
  item_cliente: {
    type: DataTypes.STRING,
  },
  peso_bruto: {
    type: DataTypes.FLOAT,
  },
  peso_liquido: {
    type: DataTypes.FLOAT,
  },
  peso_tubete: {
    type: DataTypes.FLOAT,
  },
  endereco: {
    type: DataTypes.STRING,
  },
  qtd_volume: {
    type: DataTypes.FLOAT,
  },
  data_producao: {
    type: DataTypes.DATE,
  },
  peso_palete: {
    type: DataTypes.FLOAT,
  },
});

exports.RomaneioModel = RomaneioModel;

// await database.sync({ force: true });
