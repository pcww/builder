import React from 'react'
import ReactDOM from 'react-dom'
import constants from '../constants.json'
import accessories from '../accessories.json'

let sizes = constants.SIZES

export default class Wizard extends React.Component {
  getEdge () {
    let board = this.props.board
    let edge = board.get('edge').profile
    let name = accessories.edges[edge].name
    let description = accessories.edges[edge].description

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch" src={'/assets/edges/' + edge + '.jpg'}/>
        </div>

        <div className="media-body">
          <h4 className="media-heading">
            {name}
          </h4>

          <p>
            {description}
          </p>
        </div>
      </div>
    )
  }

  getEndcaps () {
    let board = this.props.board
    let endcaps = board.get('endcaps')
    let color = accessories['endcap-colors'][endcaps.color].name
    let description = accessories['endcaps'][endcaps.type].description
    let type = accessories['endcaps'][endcaps.type].name

    let name = `${color} ${type}`

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch" src={'/assets/endcaps/' + endcaps.type + '.jpg'}/>
        </div>

        <div className="media-body">
        <h4 className="media-heading">
          {name}
        </h4>

        <p>
          {description}
        </p>
      </div>
    </div>
    )
  }

  getFeet () {
    let board = this.props.board
    let type = board.get('feet').type
    let feet = accessories.feet[type]

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch" src={'/assets/feet/' + type + '.jpg'}/>
        </div>

        <div className="media-body">
          <h4 className="media-heading">
            {feet.name}
          </h4>

          <p>
            {feet.description}
          </p>
        </div>
      </div>
    )
  }

  getHandle () {
    let board = this.props.board
    let type = board.get('handle')
    let handle = accessories.handles[type]

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch" src={'/assets/handles/' + type + '.jpg'}/>
        </div>

        <div className="media-body">
          <h4 className="media-heading">
            {handle.name}
          </h4>

          <p>
            {handle.description}
          </p>
        </div>
      </div>
    )
  }

  getLayout () {
    let Strips = board.get('strips').map((strip, key) => {
      let styles = {
        flexGrow: sizes[strip.get('size')]
      }

      return (
        <div className={strip.get('wood')} key={strip.id} style={styles}></div>
      )
    })

    return (
      <div className="board-layout">
        {Strips}
      </div>
    )
  }

  getCustom () {
    let placeholderText = "(Optional) If you have any additional requests, we would love to hear them!"
    let value = (this.props.order) ? this.props.order.get('notes') : false
    return (
      <textarea className="customText form-control" rows="4" placeholder={placeholderText} defaultValue={value}></textarea>
    )
  }

  render () {
    return (
      <div className="step-content">
        <fieldset>
          <legend>Layout</legend>
          {this.getLayout()}
        </fieldset>

        <fieldset>
          <legend>Edge</legend>
          {this.getEdge()}
        </fieldset>

        <fieldset>
          <legend>Endcaps</legend>
          {this.getEndcaps()}
        </fieldset>

        <fieldset>
          <legend>Feet</legend>
          {this.getFeet()}
        </fieldset>

        <fieldset>
          <legend>Handle</legend>
          {this.getHandle()}
        </fieldset>

        <fieldset>
          <legend>Custom Requests</legend>
          {this.getCustom()}
        </fieldset>
      </div>
    )
  }
}
