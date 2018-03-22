import moment from 'moment';

/*
 ****************************** COIN CHARTS *******************************
*/

const coinLabelMaker = function (date, timeFrame) {
  let array = [];
  switch (timeFrame) {
    case 'week':
      for (let i = 0; i < 167; i++) {
        array.unshift(moment(date - (i * 3600000)).format("MM/DD hh:mm a"));
      }
      return array;
    case 'day':
      for (let i = 0; i < 1440; i++) {
        array.unshift(moment(date - (i * 60000)).format("MM/DD hh:mm a"));
      }
      return array;
    case 'hour':
      for (let i = 0; i < 60; i++) {
        array.unshift(moment(date - (i * 60000)).format("MM/DD hh:mm a"));
      }
      return array;
  }
};

export const graphCoinDataCleaner = function (coinData, timeFrame) {
  let date = new Date();
  date = date.getTime();
  let graphReadyData = {
    labels: coinLabelMaker(date, timeFrame)
  };
  let dataSetsObject = {
    label: 'Price (USD)',
    data: coinData,
    backgroundColor: 'rgba(255, 255, 0, 1)',
    borderWidth: 1,
  }
  graphReadyData.datasets = [dataSetsObject];
  return graphReadyData;
};

export const graphCoinOptions = {
  scales: {
    xAxes: [{
      offset: false
    }],
    yAxes: [{
      offset: false
    }]
  },
};

/*
 ****************************** GOOGLE TRENDS CHARTS ****************************
*/



const GTLabelMaker = function (date, timeFrame) {
  let array = [];
  switch (timeFrame) {
    case 'week':
      for (let i = 0; i < 168; i++) {
        array.unshift(moment(date - (i * 3600000)).format("MM/DD hh:mm a"));
      }
      return array;
    case 'day':
      for (let i = 0; i < 180; i++) {
        array.unshift(moment(date - (i * 480000)).format("MM/DD hh:mm a"));
      }
      return array;
    case 'hour':
      for (let i = 0; i < 60; i++) {
        array.unshift(moment(date - (i * 60000)).format("MM/DD hh:mm a"));
      }
      return array;
  }
};

export const graphGTDataCleaner = function (googleTrends, timeFrame) {
  let date = new Date();
  date = date.getTime();
  let graphReadyData = {
    labels: GTLabelMaker(date, timeFrame)
  };
  let dataSetsObject = {
    label: 'Google Trends Index',
    data: googleTrends.map(row => row.value),
    borderColor: 'rgba(0, 230, 0, 1)',
    borderWidth: 1
  }
  graphReadyData.datasets = [dataSetsObject];
  return graphReadyData;
}

export const graphGTOptions = {
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        color: "rgba(0, 0, 0, 0)",
      },
    }],
    yAxes: [{
      display: false,
      ticks: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
      gridLines: {
        color: "rgba(0, 0, 0, 0)",
      },
    }]
  },
  legend: {
    display: false
  }
};


/*
 ****************************** TWITTER TRENDS CHARTS ****************************
*/

const tweetsLabelMaker = function (date, timeFrame) {
  let array = [];
  switch (timeFrame) {
    case 'week':
      for (let i = 0; i < 10080; i++) {
        array.unshift(moment(date - (i * 60000)).format("MM/DD hh:mm a"));
      }
      return array;
    case 'day':
      for (let i = 0; i < 1440; i++) {
        array.unshift(moment(date - (i * 60000)).format("MM/DD hh:mm a"));
      }
      return array;
    case 'hour':
      for (let i = 0; i < 60; i++) {
        array.unshift(moment(date - (i * 60000)).format("MM/DD hh:mm a"));
      }
      return array;
  }
};

export const graphTweetsDataCleaner = function (tweets, timeFrame) {
  let date = new Date();
  date = date.getTime();
  let labelArray = tweetsLabelMaker(date, timeFrame);

  let graphReadyData = {
    labels: labelArray
  };

  let dataSetsObject = {
    label: 'Tweet',
    data: labelArray.map(row => {
      if (row === tweets[row]) {
        return { x: tweets[row], y: 1 }
      } else {
        return { x: row, y: null }
      }
    }),
    borderColor: 'rgba(0, 204, 255, 1)',
    backgroundColor: 'rgba(0, 204, 255, 1)',
    borderWidth: 1,
    showLine: false,
  }
  graphReadyData.datasets = [dataSetsObject];
  return graphReadyData;
}

export const graphTweetsOptions = {
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        color: "rgba(0, 0, 0, 0)",
      },
      barPercentage: 1,
      barThickness: 2,
    }],
    yAxes: [{
      display: false,
      ticks: {
        suggestedMin: 0,
        suggestedMax: 1,
      },
      gridLines: {
        color: "rgba(0, 0, 0, 0)",
      }
    }]
  },
  legend: {
    display: false
  }
}