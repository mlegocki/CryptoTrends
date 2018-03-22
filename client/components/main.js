import React from 'react'
import AppBar from 'material-ui/AppBar';
import { grey50 } from 'material-ui/styles/colors';
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { SearchBar } from './SearchBar'

const Main = (props) => {
  const { children, coinsList, history } = props

  return (
    <div id="main-container">
      <AppBar
        style={{ backgroundColor: grey50 }}
        iconElementLeft={
          <div id="main-logo-container">
            <NavLink to="/">
              <img src='/CryptoTrends.png' id="main-logo" />
            </NavLink>
          </div>
        }
        iconElementRight={
          <div id="main-searchBar-container">
            <SearchBar coinsList={coinsList} history={history} />
          </div>
        }
      >
      </AppBar>
      <hr />
      {children}
    </div >
  )
}

const mapState = (state, ownProps) => {
  const { history } = ownProps
  return {
    coinsList: state.coinsList,
    history
  }
}

export default withRouter(connect(mapState, null)(Main))
