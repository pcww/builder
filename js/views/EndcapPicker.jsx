import React from 'react'
import ReactDOM from 'react-dom'

import accessories from '../accessories.json'

export default class EndcapPicker extends React.Component {
  onEndcapChange (event) {
    let color = this.props.board.set('endcaps').color
    this.props.board.set('endcaps', { type: event.currentTarget.value, color: color })
    this.forceUpdate()
  }

  render () {
    let board = this.props.board
    let endcap = board.get('endcaps')
    let endcapType = endcap.type
    let endcapColor = endcap.color
    let endcapName = accessories.endcaps[endcapType].name
    let endcapDescription = accessories.endcaps[endcapType].description

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch" src={'/assets/endcaps/' + endcapType + '.jpg'} alt="..."/>
        </div>
        <div className="media-body">
          <div className="row">
            <div className="col-xs-6">
              <h4 className="media-heading">{endcapName}</h4>
              <p>{endcapDescription}</p>
            </div>
            <div className="col-xs-6">

              <div className="radio">
                <label>
                  <input type="radio" name="endcapOption" id="endcap-button" value="button" onChange={this.onEndcapChange.bind(this)} checked={endcapType === 'button'}/>
                  {accessories.endcaps['button'].name}
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="endcapOption" id="endcap-nutcover" value="nutcover" onChange={this.onEndcapChange.bind(this)} checked={endcapType === 'nutcover'}/>
                  {accessories.endcaps['nutcover'].name}
                </label>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
