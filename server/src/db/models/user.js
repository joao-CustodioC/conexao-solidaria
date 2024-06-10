'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Voluntariado, { foreignKey: 'servico_id', as: 'servicos'})
      this.hasMany(models.Voluntariado, { foreignKey: 'instituicao_id', as: 'instituicoes'})
      this.hasMany(models.Doacao, { foreignKey: 'user_id', as :'doacoes'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};
