import moment from 'moment';

// store => coinList data cleaner
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const dataCoinListCleaner = (data) => {
  let cleanData = [];
  for (var coin in data) {
    let newRow = {
      ...data[coin],
      price: '$' + numberWithCommas((Number(data[coin].price)).toFixed(2)),
      priceChg: Number(data[coin].priceChg).toFixed(2) + '%',
      marketCap: '$' + numberWithCommas(data[coin].marketCap)
    };
    cleanData.push(newRow);
  }
  cleanData.sort((a, b) => { return a.id - b.id })
  return cleanData;
}

// store => coinData data cleaner
export const dataCoinCleaner = (dataSet, coinSymbol) => {
  let cleanData = dataSet.filter(row =>
    coinSymbol === row.symbol
  ).sort((a, b) => a.time - b.time).map(row => row.priceClose);
  return cleanData;
};

// store => googleTrends data cleaner
export const dataGTCleaner = (dataSet) => {
  let cleanData = dataSet.default.timelineData.map(row => {
    let newRow = {
      time: parseInt(row.time),
      value: row.value[0]
    };
    return newRow;
  });
  cleanData.sort((a, b) => { return a.time - b.time })
  return cleanData;
};

// store => tweets data cleaner
export const dataTweetCleaner = (tweets) => {
  let date = new Date();
  date = date.getTime();
  let filteredTweets = tweets.filter(row => {
    let tweetTime = parseInt(moment(row.created_at).format('x'));
    if (tweetTime >= date - 604800000) return row;
  })
  let cleanData = {};
  filteredTweets.forEach(row => {
    let time = moment(row.created_at).format('MM/DD hh:mm a');
    let newRow = {
      time
    }
    cleanData[time] = time;
  })
  return cleanData;
}