'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as :'user'});
      this.belongsTo(models.Instituicao, { foreignKey: 'instituicao_id', as :'instituicao'});
    }
  }
  Doacao.init({
    user_id: DataTypes.INTEGER,
    instituicao_id: DataTypes.INTEGER,
    valor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doacao',
    tableName: 'doacoes',
  });
  return Doacao;
};
