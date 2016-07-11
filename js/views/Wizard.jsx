import React from 'react'
import ReactDOM from 'react-dom'

// import BoardDataModel from './boardDataModel.json'

export default class Wizard extends React.Component {
  render () {

    return (
      <div type="wizard"><pre>{JSON.stringify(this.props.data)}</pre></div>
    )
  }
}
