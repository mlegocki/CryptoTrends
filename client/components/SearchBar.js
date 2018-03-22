import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

export const SearchBar = (props) => {
  const { coinsList, history } = props
  return (
    <AutoComplete
      textFieldStyle={{ fontSize: 24 }}
      fullWidth={true}
      hintText="Search Currencies"
      dataSource={coinsList}
      dataSourceConfig={{ text: 'coinName', value: 'coinName' }}
      filter={AutoComplete.fuzzyFilter}
      onNewRequest={
        chosenRequest => {
          history.push(`/${chosenRequest.symbol}`);
        }
      }
    />
  )
}