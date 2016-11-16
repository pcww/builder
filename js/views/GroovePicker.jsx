import React from 'react'
import ReactDOM from 'react-dom'

import accessories from '../accessories.json'

export default class GroovePicker extends React.Component {
  onGrooveChange (event) {
    this.props.board.set('groove', event.currentTarget.value)
    this.forceUpdate()
  }

  render () {
    let board = this.props.board
    let groove = board.get('groove')
    let grooveName = accessories.grooves[groove].name
    let grooveDescription = accessories.grooves[groove].description

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch swatch-big" src={'/assets/grooves/' + groove + '.jpg'} alt="..."/>
        </div>
        <div className="media-body">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <h4 className="media-heading">{grooveName}</h4>
              <p>{grooveDescription}</p>
            </div>
            <div className="col-md-12 col-lg-6">

              <div className="radio">
                <label>
                  <input type="radio" name="grooveOption" id="groove-false" value="false" onChange={this.onGrooveChange.bind(this)} checked={groove === 'false' || !groove}/>
                  No Groove
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="grooveOption" id="groove-true" value="true" onChange={this.onGrooveChange.bind(this)} checked={groove === 'true'}/>
                  Routed Groove
                </label>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
