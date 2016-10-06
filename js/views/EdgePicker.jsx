import React from 'react'
import ReactDOM from 'react-dom'

import accessories from '../accessories.json'

export default class EdgePicker extends React.Component {
  onEdgeChange (event) {
    this.props.board.set('edge', {profile: event.currentTarget.value} )
    this.forceUpdate()
  }

  render () {
    let board = this.props.board
    let edge = board.get('edge').profile
    let edgeName = accessories.edges[edge].name
    let edgeDescription = accessories.edges[edge].description
    let EdgeRadios = Object.keys(accessories.edges).map((key) => {
      return (
        <div className="radio" key={key}>
          <label>
            <input type="radio" name="edgeOption" id={'edge-'+key} value={key} onChange={this.onEdgeChange.bind(this)} checked={edge === key}/>
            {accessories.edges[key].name}
          </label>
        </div>
      )
    })

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch swatch-big" src={'/assets/edges/' + edge + '.jpg'} alt="..."/>
        </div>
        <div className="media-body">
          <div className="row">
            <div className="col-xs-6">
              <h4 className="media-heading">{edgeName}</h4>
              <p>{edgeDescription}</p>
            </div>
            <div className="col-xs-6">
              {EdgeRadios}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
