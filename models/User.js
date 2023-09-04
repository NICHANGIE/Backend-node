const Sequelize = require('sequelize');
// const sequelize = require('./index').sequelize; // Import the sequelize instance from your index.js file

const sequelize = new Sequelize('nodedb', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres', 
  });

const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
    field: 'first_name',
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
    field: 'last_name',
  },
  isStaff: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    field: 'is_staff',
    defaultValue: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    field: 'is_active',
    defaultValue: true,
  },
  phoneNumber: {
    type: Sequelize.STRING(10),
    allowNull: false,
    validate: {
      is: /^\d{1,10}$/, // RegexValidator equivalent
    },
    field: 'phone_number',
    defaultValue: '0123467808',
  },
  dateJoined: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'date_joined',
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false, // Disable createdAt and updatedAt columns
  tableName: 'custom_users', // Specify the table name if different
});

module.exports = User;
