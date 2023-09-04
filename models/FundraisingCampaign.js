const Sequelize = require('sequelize');
const User = require('./User'); 
const sequelize = new Sequelize('nodedb', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres', 
  });



const FundraisingCampaign = sequelize.define('FundraisingCampaign', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      min: 0,
    },
    comment: 'Number of days the campaign will run',
  },
  targetedAmount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0,
    },
    comment: 'Targeted fundraising amount',
  },
  documentProof: {
    type: Sequelize.STRING, // Assuming you store the file path or URL
    allowNull: false,
    comment: 'Document proof for the campaign',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: 'Description of the fundraising campaign',
  },
  hospitalAccountDetails: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: 'Hospital account details for donations',
  },
  creatorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Assuming you have a Users table
      key: 'id',
    },
    comment: 'User who created the campaign',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt columns
});

// Define a foreign key relationship
FundraisingCampaign.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });

module.exports = FundraisingCampaign;
