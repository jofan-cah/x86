const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as needed

const Subscription = sequelize.define('subscriptions', {
  subscription_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  subscription_password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  serv_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  group: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  subscription_start_date: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  subscription_billing_cycle: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  subscription_price: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  subscription_address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  subscription_status: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  subscription_maps: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  subscription_home_photo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  subscription_form_scan: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  subscription_description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  cpe_type: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  cpe_serial: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  cpe_picture: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  cpe_site: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  installed_by: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  subscription_test_result: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  odp_distance: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  approved_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  installed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  index_month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  attenuation_photo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ip_address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'subscriptions', // Replace with the actual table name if different
  timestamps: false, // Set to false if you don't want Sequelize to automatically add timestamp fields
});

module.exports = Subscription;
