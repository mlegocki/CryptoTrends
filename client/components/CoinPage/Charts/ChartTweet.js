import React from 'react';
import { Bar } from 'react-chartjs-2';
import { graphTweetsDataCleaner, graphTweetsOptions } from '../../../../utils/chart';

export const ChartTweet = (props) => {
  const { userData, timeFrame } = props;
  return (
    <div id="chart-tweet-graph">
      <Bar
        data={graphTweetsDataCleaner(userData, timeFrame)}
        options={graphTweetsOptions}
        width={937}
        height={375}
      />
    </div>
  )
}