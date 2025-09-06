const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user')(sequelize);
const BlogCategory = require('./blogCategory')(sequelize);
const Blog = require('./blog')(sequelize);


User.hasMany(Blog, { foreignKey: 'authorId', as: 'blogs' });
Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
BlogCategory.hasMany(Blog, { foreignKey: 'categoryId', as: 'blogs' });
Blog.belongsTo(BlogCategory, { foreignKey: 'categoryId', as: 'category' });


module.exports = { sequelize, User, BlogCategory, Blog };