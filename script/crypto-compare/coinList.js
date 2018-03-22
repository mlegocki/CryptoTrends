const { CoinLists } = require('../../server/db/models');
const rp = require('request-promise');

// update coin data list

const updateCoinList = async function () {
  let socialData = await rp({
    uri: `https://min-api.cryptocompare.com/data/all/coinlist`
  });
  let dataset = [];
  socialData = JSON.parse(socialData);
  for (let coin in socialData.Data) {
    let row = {
      'symbol': socialData.Data[coin].Symbol,
      'coinName': socialData.Data[coin].CoinName,
      'imageUrl': socialData.Data[coin].ImageUrl
    };
    dataset.push(row);
  }
  let findImageUrl = (currentCoin, socialCoinList) => {
    for (coin in socialCoinList) {
      if (socialCoinList[coin].symbol === currentCoin['symbol'] || socialCoinList[coin].coinName === currentCoin['name'])
        return 'https://www.cryptocompare.com' + socialCoinList[coin].imageUrl;
    }
  }
  let coinList = await rp({
    uri: 'https://api.coinmarketcap.com/v1/ticker/?limit=0'
  });
  coinList = JSON.parse(coinList);
  let promise = async function (eachCoin, socialCoinList) {
    let dataRow = {
      'symbol': eachCoin['symbol'],
      'imageUrl': findImageUrl(eachCoin, socialCoinList) || '/No-Image.png',
      'coinName': eachCoin['name'],
      'price': Number(eachCoin['price_usd']),
      'priceChg': Number(eachCoin['percent_change_24h']),
      'marketCap': Number(eachCoin['market_cap_usd']),
      'cmcRank': Number(eachCoin['rank'])
    };
    return dataRow;
  };
  let promises = coinList.map((coin) => promise(coin, dataset));
  let finalRows = await Promise.all(promises);
  await CoinLists.bulkCreate(finalRows);
  return finalRows;
};

module.exports = updateCoinList;