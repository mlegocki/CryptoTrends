/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { updateCoinList } from './coinsList'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = { coinsList: {} }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })
})

  // describe('updateCoinList', () => {
  //   it('eventually dispatches the GET COINS action', () => {
  //     const coinsList = { email: 'Cody' }
  //     mockAxios.onGet('/api/crypto-compare/coin-list').replyOnce(200, coinsList)
  //     return store.dispatch(updateCoinList())
  //       .then(() => {
  //         const actions = store.getActions()
  //         expect(actions[0].type).to.be.equal('GET_COINS')
  //         expect(actions[0].coins).to.be.deep.equal(coinsList)
  //       })
  //   })
  // })