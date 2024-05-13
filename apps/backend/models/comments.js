const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./user'); // Importez le modèle User

const Comment = sequelize.define('Comment', {
    text: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Définir l'association avec le modèle User
Comment.belongsTo(User, { foreignKey: 'userId' }); // Un commentaire appartient à un utilisateur

module.exports = Comment;
