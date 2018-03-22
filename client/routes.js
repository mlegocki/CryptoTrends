import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import history from './history'
import { Main, MarketOverview, MarketCoinRow, CoinPage } from './components'
import { updateCoinList } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { } = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route exact path="/" component={MarketOverview} />
            <Route path="/:coinSymbol" component={CoinPage} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(updateCoinList());
    }
  }
}

export default connect(null, mapDispatch)(Routes)