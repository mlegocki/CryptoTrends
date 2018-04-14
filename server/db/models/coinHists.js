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
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  },
  priceOpen: {
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  },
  volumeFrom: {
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  },
  volumeTo: {
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  },
  time: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true
    }
  },
  priceChg: {
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  }
});

CoinHists.hook('beforeCreate', (row) => {
  row.priceChg = (((row.priceClose) - (row.priceOpen)) / (row.priceOpen)) * 100;
})


module.exports = CoinHists;