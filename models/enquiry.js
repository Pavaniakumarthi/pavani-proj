module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Enquiry', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    courseInterest: { type: DataTypes.STRING },
    claimed: { type: DataTypes.BOOLEAN, defaultValue: false },
    counselorId: { type: DataTypes.INTEGER, allowNull: true }
  }, { tableName: 'enquiries', timestamps: true });
};
