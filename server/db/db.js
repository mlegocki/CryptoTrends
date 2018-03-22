const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/cryptoTrends', {
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
      acquire: 30000
    }
  }
)
module.exports = db
