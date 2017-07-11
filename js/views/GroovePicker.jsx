import React from 'react'
import ReactDOM from 'react-dom'

import accessories from '../accessories.json'

export default class GroovePicker extends React.Component {

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    let { value } = event.target

    this.props.board.set('groove', value)
    this.forceUpdate()
  }

  render () {
    let board = this.props.board
    let groove = board.get('groove')
    let {
      description,
      name,
    } = accessories.grooves[groove]

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch swatch-big" src={'/assets/grooves/' + groove + '.png'} alt="..."/>
        </div>
        <div className="media-body">
          <div className="row">
            <div className="col-xs-12">
              <h4 className="media-heading">{name}</h4>
              <p>{description}</p>
            </div>
            <div className="col-xs-12">

              <div className="radio">
                <label>
                  <input
                    defaultChecked={groove === 'inner'}
                    id="groove-inner"
                    name="grooveOption"
                    onClick={this.handleClick}
                    type="radio"
                    value="inner" />
                  Inner Groove
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    defaultChecked={groove === 'outer'}
                    id="groove-outer"
                    name="grooveOption"
                    onClick={this.handleClick}
                    type="radio"
                    value="outer" />
                  Outer Groove
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    defaultChecked={groove === 'none'}
                    id="groove-none"
                    name="grooveOption"
                    onClick={this.handleClick}
                    type="radio"
                    value="none" />
                  No Groove
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
