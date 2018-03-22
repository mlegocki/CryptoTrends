import React, { Component } from 'react';
import { ChartCoin } from './ChartCoin';
import { ChartGT } from './ChartGT';
import { ChartTweet } from './ChartTweet';

import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';

export class Chart extends Component {
  constructor() {
    super();
    this.state = {
      coinChart: true,
      GTChart: false,
      tweetChart: false,
      timeFrame: 'day',
    };
    this.showCoin = this.showCoin.bind(this);
    this.showGT = this.showGT.bind(this);
    this.showTweet = this.showTweet.bind(this);
    this.hideTweet = this.hideTweet.bind(this);
  };

  componentDidMount() {
    const { coin, data, loadCoinData, loadGTData } = this.props;
    if (data.timeFrame === 'day') {
      loadCoinData(coin.symbol);
      loadGTData(coin.coinName, data.timeFrame);
    }
  }
  showCoin() {
    this.setState({ coinChart: !this.state.coinChart })
  }
  showGT() {
    this.setState({ GTChart: !this.state.GTChart })
  }
  showTweet() {
    this.setState({ tweetChart: true })
  }
  hideTweet() {
    this.setState({ tweetChart: false })
  }
  render() {

    const {
      coin,
      data,
      loadUserTweet,
      loadGTData,
      clearUserTweet
    } = this.props;

    const { coinData, GTData, userData, timeFrame } = data;
    return (
      <div className="chart-container">
        <div className="chart-button-container">
          <div className="chart-button-timeFrame-container">
            <h5 className="button-title-timeFrame">Toggle Timeframe</h5>
            <RaisedButton
              label="Past Hour"
              secondary={true}
              onClick={() => {
                loadGTData(coin.coinName, 'hour');
              }}
              style={{ margin: 10 }}
            />
            <RaisedButton
              label="Past 24 Hours"
              onClick={() => {
                loadGTData(coin.coinName, 'day');
              }}
              style={{ margin: 10 }}
            />
            <RaisedButton
              label="Past 7 Days"
              primary={true}
              onClick={() => {
                loadGTData(coin.coinName, 'week');
              }}
              style={{ margin: 10 }}
            />
          </div>
          <div className="chart-button-dataType-container">
            <h5 className="button-title-dataType">Toggle Data Type</h5>
            <Toggle
              label="Price Data"
              onToggle={this.showCoin}
              defaultToggled={true}
              labelPosition={"right"}
              trackSwitchedStyle={{ backgroundColor: '#ffff00' }}
            />
            <Toggle
              label="Google Trends Data"
              onToggle={this.showGT}
              labelPosition={"right"}
              trackSwitchedStyle={{ backgroundColor: '#00e600' }}
            />
            <div className="twitterHandle-form-container">
              <form id='twitterHandle-form' onSubmit={event => {
                loadUserTweet(event);
                this.showTweet();
              }}>
                <TextField
                  name='twitterHandle'
                  hintText='Enter a Twitter Handle'
                />
              </form>
              <div id='twitterHandle-reset'>
                <RaisedButton
                  label='Clear Tweets'
                  backgroundColor={'#C62828'}
                  labelColor={'#ffffff'}
                  onClick={() => {
                    document.getElementById('twitterHandle-form').reset();
                    clearUserTweet();
                    this.hideTweet();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="chart-title-container">
          {
            timeFrame === "hour" &&
            <h5 className="chart-title">Past Hour Data</h5>
          }
          {
            timeFrame === "day" &&
            <h5 className="chart-title">Past 24 Hour Data</h5>
          }
          {
            timeFrame === "week" &&
            <h5 className="chart-title">Past 7 Days Data</h5>
          }
        </div>
        <div className="chart-graph-container">
          {
            this.state.coinChart &&
            <ChartCoin
              coinData={coinData}
              timeFrame={timeFrame}
            />
          }
          {
            this.state.GTChart &&
            <ChartGT
              GTData={GTData}
              timeFrame={timeFrame}
            />
          }
          {
            this.state.tweetChart &&
            <ChartTweet
              userData={userData}
              timeFrame={timeFrame}
            />
          }
        </div>
      </div>
    )
  }
}