import axios from 'axios'
import { dataCoinListCleaner } from '../../utils/data'
import { graphCoinDataCleaner } from '../../utils/chart'

const GET_COINS = 'GET_COINS';

const getCoins = coins => ({ type: GET_COINS, coins })

export const updateCoinList = () =>
  dispatch => {
    return axios.get('/api/crypto-compare/coin-list')
      .then(res =>
        dispatch(getCoins(dataCoinListCleaner(res.data))))
      .catch(console.error)
  }

export default function (state = [], action) {
  switch (action.type) {
    case GET_COINS:
      return action.coins
    default:
      return state
  }
}
