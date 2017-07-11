import React from 'react'
import ReactDOM from 'react-dom'

import { Modal } from 'react-bootstrap'

import accessories from '../accessories.json'

export default class GroovePicker extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      modalIsOpen: false
    }
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
        <div className="media-left" onClick={() => this.setState({ modalIsOpen: true })}>
          <img className="media-object swatch swatch-big" src={'/assets/grooves/' + groove + '.png'} alt="..."/>
        </div>

        <Modal show={this.state.modalIsOpen} onHide={() => this.setState({ modalIsOpen: false })}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ textAlign: 'center' }}>
            <img style={{ maxWidth: '100%' }} src={'/assets/grooves/' + groove + '.jpg'} alt="..."/>
          </Modal.Body>

          <Modal.Footer>
            <p>{description}</p>
          </Modal.Footer>
        </Modal>

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
