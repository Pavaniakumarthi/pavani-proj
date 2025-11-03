const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Employee = require('./employee')(sequelize, Sequelize);
db.Enquiry = require('./enquiry')(sequelize, Sequelize);

db.Employee.hasMany(db.Enquiry, { foreignKey: 'counselorId', as: 'enquiries' });
db.Enquiry.belongsTo(db.Employee, { foreignKey: 'counselorId', as: 'counselor' });

module.exports = db;
