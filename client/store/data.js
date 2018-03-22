import axios from 'axios';
import { dataCoinCleaner, dataGTCleaner, dataTweetCleaner } from '../../utils/data';

const defaultState = {
  coinData: [],
  GTData: [],
  userData: [],
  timeFrame: 'day'
}

// COIN DATA

const GET_COIN_DATA = 'GET_COIN_DATA';

const getCoinData = results => ({ type: GET_COIN_DATA, results })

export const updateCoinData = (coinSymbol) =>
  dispatch => {
    return axios.get(`/api/crypto-compare/hist/${coinSymbol}`)
      .then(res =>
        dispatch(getCoinData(dataCoinCleaner(res.data, coinSymbol))))
      .catch(console.error)
  }
  
// GT DATA

const GET_TRENDS = 'GET_TRENDS';

const getTrends = (results, timeFrame) => ({ type: GET_TRENDS, results, timeFrame })

export const updateGTData = (searchTerm, timeFrame) =>
  dispatch => {
    return axios.get(`/api/google-trends/one-${timeFrame}?searchTerm=${searchTerm}`)
      .then(res =>
        dispatch(getTrends(dataGTCleaner(res.data), timeFrame)))
      .catch(console.error)
  }


// USER DATA

const GET_USER_TWEET = 'GET_USER_TWEET';
const RESET_USER_TWEET = 'RESET_USER_TWEET';

const getUserTweet = results => ({ type: GET_USER_TWEET, results })

export const updateUserTweet = (twitterHandle) =>
  dispatch => {
    return axios.get(`/api/twitter?twitterHandle=${twitterHandle}`)
      .then(res =>
        dispatch(getUserTweet(dataTweetCleaner(res.data))))
      .catch(console.error)
  }

export const resetUserTweet = () => ({ type: RESET_USER_TWEET });

// TIMEFRAME

const SET_TIMEFRAME = 'SET_TIMEFRAME';

export function setTimeFrame(timeFrame) {
  return { type: SET_TIMEFRAME, timeFrame };
}


export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_COIN_DATA:
      return { ...state, coinData: action.results }
    case GET_TRENDS:
      return { ...state, GTData: action.results, timeFrame: action.timeFrame }
    case GET_USER_TWEET:
      return { ...state, userData: action.results }
    case RESET_USER_TWEET:
      return { ...state, userData: [] }
    default:
      return state;
  }
}
