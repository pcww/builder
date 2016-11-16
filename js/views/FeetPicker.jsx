import React from 'react'
import ReactDOM from 'react-dom'

import accessories from '../accessories.json'

export default class FeetPicker extends React.Component {
  onFeetChange (event) {
    this.props.board.set('feet', {type: event.currentTarget.value})
    this.forceUpdate()
  }

  render () {
    let board = this.props.board
    let feet = board.get('feet').type
    let feetName = accessories.feet[feet].name
    let feetDescription = accessories.feet[feet].description

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch swatch-big" src={'/assets/feet/' + feet + '.jpg'} alt="..."/>
        </div>
        <div className="media-body">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <h4 className="media-heading">{feetName}</h4>
              <p>{feetDescription}</p>
            </div>
            <div className="col-md-12 col-lg-6">

              <div className="radio">
                <label>
                  <input type="radio" name="feetOption" id="feet-screw" value="screw" onChange={this.onFeetChange.bind(this)} checked={feet === 'screw' || !feet}/>
                  Screw In
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="feetOption" id="feet-suction" value="suction" onChange={this.onFeetChange.bind(this)} checked={feet === 'suction'}/>
                  Suction Cup
                </label>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
