const Sequelize = require('sequelize');
const db = require('../db');

const CoinLists = db.define('coinLists', {
  symbol: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true
    }
  },
  coinName: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  },
  priceChg: {
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  },
  marketCap: {
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  },
  cmcRank: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true
    }
  }
});

module.exports = CoinLists;