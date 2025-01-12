const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  type: {
    type: DataTypes.ENUM(
      'Electronics',
      'Fashion',
      'Home and Kitchen',
      'Health and Personal Care',
      'Books and Stationery',
      'Sports and Outdoors',
      'Toys and Games',
      'Beauty and Cosmetics',
      'Automotive',
      'Jewelry and Accessories',
      'Groceries and Food',
      'Baby Products',
      'Pet Supplies',
      'Tools and Hardware',
      'Office Supplies',
      'Musical Instruments',
      'Furniture',
      'Art and Craft',
      'Industrial and Scientific',
      'Video Games and Consoles',
      'Music'
    ),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  seller: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true,
  tableName: 'products',
  indexes: [
    {
      fields: ['type']
    },
    {
      fields: ['seller']
    }
  ]
});

module.exports = Product;
