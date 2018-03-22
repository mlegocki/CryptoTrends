import React from 'react';
import { NavLink } from 'react-router-dom';

export const MarketCoinRow = (props) => {
  const { coin } = props;
  return (
    <div className="market-overview-row-container">
      <div className="market-overview-row-symbolImage-container">
        <NavLink to={`/${coin.symbol}`}>
          <img src={coin.imageUrl} className="market-overview-row-symbolImage" />
        </NavLink>
      </div>
      <h5 className="market-overview-row-symbol">
        <NavLink to={`/${coin.symbol}`}>
          {coin.symbol}
        </NavLink>
      </h5>
      <h5 className="market-overview-row-name">
        <NavLink to={`/${coin.symbol}`}>
          {coin.coinName}
        </NavLink>
      </h5>
      <h5 className="market-overview-row-price">
        <NavLink to={`/${coin.symbol}`}>
          {coin.price}
        </NavLink>
      </h5>
      {/* Positive or Negative Price Change */}
      { parseFloat(coin.priceChg) >= 0 &&
        <h5 className="market-overview-row-priceChg pos">
          <NavLink to={`/${coin.symbol}`}>
            {coin.priceChg}
          </NavLink>
        </h5>
      }
      { parseFloat(coin.priceChg) < 0 &&
        <h5 className="market-overview-row-priceChg neg">
          <NavLink to={`/${coin.symbol}`}>
            {coin.priceChg}
          </NavLink>
        </h5>
      }
      <h5 className="market-overview-row-marketCap">
        <NavLink to={`/${coin.symbol}`}>
          {coin.marketCap}
        </NavLink>
      </h5>
    </div>
  )
}