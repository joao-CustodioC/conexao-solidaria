'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voluntariado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as :'user'});
      this.belongsTo(models.Instituicao, { foreignKey: 'instituicao_id', as :'instituicao'});
      this.belongsTo(models.Servico, { foreignKey: 'servico_id', as :'servico'});

    }
  }
  Voluntariado.init({
    user_id: DataTypes.INTEGER,
    instituicao_id: DataTypes.INTEGER,
    servico_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Voluntariado',
    tableName: 'voluntariados',
  });
  return Voluntariado;
};
