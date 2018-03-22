const Sequelize = require('sequelize');
const db = require('../db');

const CoinHists = db.define('coinHists', {
  symbol: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true
    }
  },
  priceClose: {
    type: Sequelize.DECIMAL,
    validate: {
      isNumeric: true
    }
  },
  priceOpen: {
    type: Sequelize.DECIMAL,
    validate: {
      isNumeric: true
    }
  },
  volumeFrom: {
    type: Sequelize.DECIMAL,
    validate: {
      isNumeric: true
    }
  },
  volumeTo: {
    type: Sequelize.DECIMAL,
    validate: {
      isNumeric: true
    }
  },
  time: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true
    }
  },
  priceChg: {
    type: Sequelize.DECIMAL,
    validate: {
      isNumeric: true
    }
  }
});

CoinHists.hook('beforeCreate', (row) => {
  row.priceChg = (((row.priceClose) - (row.priceOpen)) / (row.priceOpen)) * 100;
})


module.exports = CoinHists;