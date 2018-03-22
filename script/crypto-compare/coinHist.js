const { CoinLists, CoinHists } = require('../../server/db/models');
const rp = require('request-promise');

const updateCoinHist = async function () {
    let coinList = await CoinLists.findAll({
        where: {
            cmcRank: {
                $lte: 100
            }
        }
    });
    let promises = [];
    let promise = async function (coinData) {
        var eachMinute = [];
        var coinSymbol = coinList[coin]['symbol'];
        var histData = await rp({
            uri: `https://min-api.cryptocompare.com/data/histominute?fsym=${coinSymbol}&tsym=USD&limit=1440&e=CCCAGG`
        });
        histData = JSON.parse(histData);
        for (var minute in histData.Data) {
            var hist = {
                'symbol': coinSymbol,
                'priceClose': Number(histData.Data[minute]['close']),
                'priceOpen': Number(histData.Data[minute]['open']),
                'volumeFrom': Number(histData.Data[minute]['volumefrom']),
                'volumeTo': Number(histData.Data[minute]['volumeto']),
                'time': Number(histData.Data[minute]['time'])
            };
            eachMinute.push(hist);
        }
        return eachMinute;
    };
    for (var coin in coinList) {
        promises.push(promise(coin));
    }
    let parsedRows = await Promise.all(promises);
    let finalRows = parsedRows.map((row) => CoinHists.bulkCreate(row, { individualHooks: true }));
    return finalRows;
}

module.exports = updateCoinHist;