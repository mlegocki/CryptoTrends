/* global describe beforeEach it */

const expect = require('chai').expect;
const db = require('../index')
const CoinLists = db.model('coinLists')

describe('Coin List model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('instance attributes', () => {
    describe('correct attributes', () => {
      let bitcoin

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
      it('returns true if the symbol is correct', () => {
        expect(bitcoin.symbol).to.equal('BTC')
      })
      it('returns true if the coinName is correct', () => {
        expect(bitcoin.coinName).to.equal('Bitcoin')
      })
      it('returns true if the price is correct', () => {
        expect(bitcoin.priceChg).to.equal(10.01)
      })
      it('returns true if the cmcRank is correct', () => {
        expect(bitcoin.cmcRank).to.equal(1)
      })
    })
  })
})