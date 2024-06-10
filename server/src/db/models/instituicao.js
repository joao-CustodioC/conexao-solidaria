'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instituicao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Doacao, { foreignKey: 'instituicao_id', as :'doacoes'});
      this.hasMany(models.Voluntariado, { foreignKey: 'instituicao_id', as :'voluntarios'});
      this.hasMany(models.Servico, { foreignKey: 'instituicao_id', as :'servicos'});
    }
  }
  Instituicao.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Instituicao',
    tableName: 'instituicoes',
  });
  return Instituicao;
};
