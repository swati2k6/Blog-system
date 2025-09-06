const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
return sequelize.define('Blog', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
title: DataTypes.STRING,
image_url: DataTypes.STRING,
summary: DataTypes.TEXT,
content: DataTypes.TEXT,
is_draft: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'blogs', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });
};