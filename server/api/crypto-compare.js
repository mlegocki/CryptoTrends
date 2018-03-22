const router = require('express').Router();
const { CoinLists, CoinHists } = require('../db/models');

// get top 100 coins

router.get('/coin-list', async (req, res, next) => {
  var coinList = await CoinLists.findAll({
    where: {
      cmcRank: {
        $lte: 100
      }
    }
  });
  res.send(coinList);
});

router.get('/hist/:coinSymbol', async (req, res, next) => {
  var coinSymbol = req.params.coinSymbol;
  var coinData = await CoinHists.findAll({
    where: {
      symbol: {
        $eq: coinSymbol
      }
    }
  });
  res.send(coinData);
});

module.exports = router;