const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Admins.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Admins',
    },
  );
  return Admins;
};
