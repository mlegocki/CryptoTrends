import React from 'react';
import { Line } from 'react-chartjs-2';
import { graphCoinDataCleaner, graphCoinOptions } from '../../../../utils/chart';

export const ChartCoin = (props) => {
  const { coinData, timeFrame } = props;
  return (
      <Line
        data={graphCoinDataCleaner(coinData, timeFrame)}
        options={graphCoinOptions}
      />
  )
}