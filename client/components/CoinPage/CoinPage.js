import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Chart } from './Charts';
import {
  updateCoinData,
  updateGTData,
  updateUserTweet,
  resetUserTweet
} from '../../store';

import RaisedButton from 'material-ui/RaisedButton';

class CoinPage extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      coin,
      data,
      loadCoinData,
      loadGTData,
      loadUserTweet,
      clearUserTweet
    } = this.props;

    return (
      <div>
        { coin &&
          <div className="coin-page-container">
            <div className="coin-page-title">
              <img src={coin.imageUrl} className="coin-page-title-symbolImage" />
              <h1 className="coin-page-title-name">{coin.coinName}</h1>
              <h5 className="coin-page-title-symbol">({coin.symbol})</h5>
            </div>
            <div className="coin-page-info-container">
              <div className="coin-page-info-label-container">
                <h5 className="coin-page-info">Current Price (USD):</h5>
                <h5 className="coin-page-info">Percent Change (24Hrs):</h5>
                <h5 className="coin-page-info">Market Cap:</h5>
              </div>
              <div className="coin-page-info-number-container">
                <h5 className="coin-page-info">{coin.price}</h5>
                {/* Positive or Negative Price Change */}
                {parseFloat(coin.priceChg) >= 0 &&
                  <h5 className="coin-page-info pos">{coin.priceChg}</h5>
                }
                {parseFloat(coin.priceChg) < 0 &&
                  <h5 className="coin-page-info neg">{coin.priceChg}</h5>
                }
                <h5 className="coin-page-info">{coin.marketCap}</h5>
              </div>
            </div>
            <div className="coin-page-graph-container">
              <Chart
                coin={coin}
                data={data}
                loadCoinData={loadCoinData}
                loadGTData={loadGTData}
                loadUserTweet={loadUserTweet}
                clearUserTweet={clearUserTweet}
              />
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  const coinSymbol = ownProps.match.params.coinSymbol;
  const coin = state.coinsList.find(coin => coinSymbol === coin.symbol);
  const { data } = state;
  return {
    coin,
    data
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadCoinData(coinSymbol) {
      dispatch(updateCoinData(coinSymbol));
    },
    loadGTData(coinName, timeFrame) {
      dispatch(updateGTData(coinName, timeFrame));
    },
    loadUserTweet(event) {
      event.preventDefault();
      let twitterHandle = event.target.twitterHandle.value;
      dispatch(updateUserTweet(twitterHandle));
    },
    clearUserTweet() {
      dispatch(resetUserTweet());
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(CoinPage))