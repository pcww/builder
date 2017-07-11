import React from 'react'
import ReactDOM from 'react-dom'

import { Modal } from 'react-bootstrap'

import accessories from '../accessories.json'

export default class EdgePicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }
  }

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
        <div className="media-left" onClick={() => this.setState({ modalIsOpen: true })}>
          <img className="media-object swatch swatch-big" src={'/assets/edges/' + edge + '.jpg'} alt="..."/>
        </div>

        <Modal show={this.state.modalIsOpen} onHide={() => this.setState({ modalIsOpen: false })}>
          <Modal.Header closeButton>
            <Modal.Title>{edgeName}</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ textAlign: 'center' }}>
            <img style={{ maxWidth: '100%' }} src={'/assets/edges/' + edge + '.jpg'} alt="..."/>
          </Modal.Body>

          <Modal.Footer>
            <p>{edgeDescription}</p>
          </Modal.Footer>
        </Modal>

        <div className="media-body">
          <div className="row">
            <div className="col-xs-12">
              <h4 className="media-heading">{edgeName}</h4>
              <p>{edgeDescription}</p>
            </div>
            <div className="col-xs-12">
              {EdgeRadios}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
