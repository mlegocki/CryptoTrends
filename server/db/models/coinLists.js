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
    validate: {
      isAlphanumeric: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      isNumeric: true
    }
  },
  priceChg: {
    type: Sequelize.DECIMAL,
    validate: {
      isNumeric: true
    }
  },
  marketCap: {
    type: Sequelize.DECIMAL,
    validate: {
      isNumeric: true
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