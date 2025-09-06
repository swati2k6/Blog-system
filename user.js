const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
return sequelize.define('User', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
name: DataTypes.STRING,
email: { type: DataTypes.STRING, unique: true },
password_hash: DataTypes.STRING,
role: { type: DataTypes.ENUM('doctor','patient') }
}, { tableName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });
};