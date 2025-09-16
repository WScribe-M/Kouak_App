const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
        Message.belongsTo(models.Utilisateur, { foreignKey: 'id_utilisateur', as: 'Utilisateur' });
    }
    }
    Message.init(
    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        contenu: {
        type: DataTypes.TEXT,
        allowNull: false
        },      
        date_envoi: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
        },
        id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        }
    }, 
    {
        sequelize,
        modelName: 'Message',
        tableName: 'messages',
        timestamps: false  
    }
);
  return Message;
};

