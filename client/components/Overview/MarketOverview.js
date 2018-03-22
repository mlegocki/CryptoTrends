import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MarketCoinRow } from './MarketCoinRow';

export const MarketOverview = (props) => {
  const { coins } = props;
  return (
    <div id="market-overview-main-container">
      <div className="market-overview-row-container">
        <h5 className="market-overview-row-symbolImage-container">Logo</h5>
        <h5 className="market-overview-row-symbol">Symbol</h5>
        <h5 className="market-overview-row-name">Name</h5>
        <h5 className="market-overview-row-price">Price (USD)</h5>
        <h5 className="market-overview-row-priceChg">24 Change</h5>
        <h5 className="market-overview-row-marketCap">Market Cap</h5>
      </div>
      {
        coins.map((coin) => {
          return (
            <MarketCoinRow key={coin.id} coin={coin} />
          )
        })
      }
    </div>
  )
}

const mapState = (state) => {
  return {
    coins: state.coinsList,
  }
}

export default withRouter(connect(mapState, null)(MarketOverview))