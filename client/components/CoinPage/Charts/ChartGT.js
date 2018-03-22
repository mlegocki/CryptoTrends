import React from 'react';
import { Line } from 'react-chartjs-2';
import { graphGTDataCleaner, graphGTOptions } from '../../../../utils/chart';

export const ChartGT = (props) => {
  const { GTData, timeFrame } = props;
  return (
    <div id='chart-gt-graph'>
      <Line
        data={graphGTDataCleaner(GTData, timeFrame)}
        options={graphGTOptions}
        width={937}
        height={375}
      />
    </div>
  )
}