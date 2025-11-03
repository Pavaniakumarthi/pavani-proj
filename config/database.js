require('dotenv').config();
const { Sequelize } = require('sequelize');

const dialect = process.env.DB_DIALECT || 'sqlite';
const config = { dialect, logging: false };

if (dialect === 'sqlite') {
  config.storage = process.env.DB_STORAGE || './crm_db.sqlite';
}

module.exports = new Sequelize({ ...config });
