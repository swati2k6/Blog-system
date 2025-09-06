const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
return sequelize.define('BlogCategory', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
name: DataTypes.STRING,
slug: DataTypes.STRING
}, { tableName: 'blog_categories', timestamps: false });
};