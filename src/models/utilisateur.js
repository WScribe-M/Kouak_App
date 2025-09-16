const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    static associate(models) {
      Utilisateur.hasMany(models.Message, { foreignKey: 'id_utilisateur', as: 'messages' });
    }
  }
  Utilisateur.init(
    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        nom_utilisateur: {
        type: DataTypes.STRING,
        allowNull: false
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        },
        mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false
        },
        date_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
        }
    }, 
    {
        sequelize,
        modelName: 'Utilisateur',
        tableName: 'utilisateurs',
        timestamps: false  
    }
);
  return Utilisateur;
};

