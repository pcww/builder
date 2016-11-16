import React from 'react'
import ReactDOM from 'react-dom'

import accessories from '../accessories.json'

export default class HandlePicker extends React.Component {
  onHandleChange (event) {
    this.props.board.set('handle', event.currentTarget.value)
    this.forceUpdate()
  }

  render () {
    let board = this.props.board
    let handle = board.get('handle')
    let handleName = accessories.handles[handle].name
    let handleDescription = accessories.handles[handle].description

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch swatch-big" src={'/assets/handles/' + handle + '.jpg'} alt="..."/>
        </div>
        <div className="media-body">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <h4 className="media-heading">{handleName}</h4>
              <p>{handleDescription}</p>
            </div>
            <div className="col-md-12 col-lg-6">

              <div className="radio">
                <label>
                  <input type="radio" name="handleOption" id="handle-shaped" value="none" onChange={this.onHandleChange.bind(this)} checked={handle === 'none' || !handle}/>
                  None
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="handleOption" id="handle-shaped" value="shaped" onChange={this.onHandleChange.bind(this)} checked={handle === 'shaped'}/>
                  Shaped
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="handleOption" id="handle-stainless" value="stainless" onChange={this.onHandleChange.bind(this)} checked={handle === 'stainless'}/>
                  Stainless
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="handleOption" id="handle-dado" value="dado" onChange={this.onHandleChange.bind(this)} checked={handle === 'dado'}/>
                  Dado
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="handleOption" id="handle-turned" value="turned" onChange={this.onHandleChange.bind(this)} checked={handle === 'turned'}/>
                  Turned
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="handleOption" id="handle-elk-horn" value="elk-horn" onChange={this.onHandleChange.bind(this)} checked={handle === 'elk-horn'}/>
                  Elk Horn
                </label>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
