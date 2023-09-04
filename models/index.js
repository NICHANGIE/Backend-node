const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodedb', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres', 
});

const FundraisingCampaign = require('./FundraisingCampaign');
const User = require('./User');

// Define associations between models if needed
// FundraisingCampaign.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });

module.exports = {
  sequelize,
  FundraisingCampaign,
  User,
};
