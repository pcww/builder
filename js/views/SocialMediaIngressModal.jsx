import React from 'react'
import ReactDOM from 'react-dom'
import { Col, ControlLabel, FormControl, FormGroup, Grid, Modal, Row } from 'react-bootstrap'

export default class SocialMediaIngressModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: !!this.props.show || false
    }

  }

  onClose (event) {
    this.setState({ showModal: false })
  }



  render () {

    return (
      <Modal show={this.state.showModal} onHide={this.onClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Hello There!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="order-summary-message text-center">
            <table>
              <tbody>
                <tr>
                  <td><i className="fa fa-hand-spock-o fa-3x bounce" aria-hidden="true"></i></td>
                  <td>
                    <h4>Welcome to the Pine Cliff Woodworks Board Builder™</h4>
                    <p>You're viewing a custom cutting board that someone has crafted. Check it out and click "Back to Shop" to create one yourself.</p>
                    <p>Cheers, from the PCW Team! </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={this.onClose.bind(this)}>View this Board</button>
        </Modal.Footer>
      </Modal>
    )

  }
}
