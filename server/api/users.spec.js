/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

const CoinLists = db.model('coinLists');
const CoinHists = db.model('coinHists');

describe('Crypto-Compare routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
  describe('/api/crypto-compare/', () => {
    let bitcoin
    let bitcoinHist
    beforeEach(() => {
      return CoinLists.create(
        {
          symbol: 'BTC',
          coinName: 'Bitcoin',
          imageUrl: '/test',
          price: 100.01,
          priceChg: 10.01,
          marketCap: 100000.01,
          cmcRank: 1,
        }
      )
        .then(coin => {
          bitcoin = coin
        })
    })
    beforeEach(() => {
      return CoinHists.create(
        {
          symbol: 'BTC',
          priceClose: 100.00,
          priceOpen: 200.00,
          volumeFrom: 300.00,
          volumeTo: 400.00,
          time: 10,
          priceChg: 10.00,
        }
      )
        .then(coin => {
          bitcoinHist = coin
        })
    })
    it('GET /coin-list', () => {
      return request(app).get('/api/crypto-compare/coin-list').expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].symbol).to.be.equal('BTC');
      })
    })
    it('GET /hist/:coinSymbol', () => {
      return request(app).get('/api/crypto-compare/hist/BTC').expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].symbol).to.be.equal('BTC');
      })
    })
  })
})