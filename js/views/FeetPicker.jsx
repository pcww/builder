import React from 'react'
import ReactDOM from 'react-dom'

import { Modal } from 'react-bootstrap'

import accessories from '../accessories.json'

export default class FeetPicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }
  }

  onFeetChange (event) {
    this.props.board.set('feet', {type: event.currentTarget.value})
    this.forceUpdate()
  }

  render () {
    let board = this.props.board
    let feet = board.get('feet').type || 'suction'
    let feetName = accessories.feet[feet].name
    let feetDescription = accessories.feet[feet].description

    return (
      <div className="media">
        <div className="media-left" onClick={() => this.setState({ modalIsOpen: true })}>
          <img className="media-object swatch swatch-big" src={'/assets/feet/' + feet + '.jpg'} alt="..."/>
        </div>

        <Modal show={this.state.modalIsOpen} onHide={() => this.setState({ modalIsOpen: false })}>
          <Modal.Header closeButton>
            <Modal.Title>{feetName}</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ textAlign: 'center' }}>
            <img style={{ maxWidth: '100%' }} src={'/assets/feet/' + feet + '.jpg'} alt="..."/>
          </Modal.Body>

          <Modal.Footer>
            <p>{feetDescription}</p>
          </Modal.Footer>
        </Modal>

        <div className="media-body">
          <div className="row">
            <div className="col-xs-12">
              <h4 className="media-heading">{feetName}</h4>
              <p>{feetDescription}</p>
            </div>
            <div className="col-xs-12">

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
