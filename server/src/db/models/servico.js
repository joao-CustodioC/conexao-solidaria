'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Servico.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    instituicao_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Servico',
    tableName: 'servicos',
  });
  return Servico;
};
