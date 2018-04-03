import React from 'react'
import ReactDOM from 'react-dom'
import { Col, ControlLabel, FormControl, FormGroup, Grid, Modal, Row } from 'react-bootstrap'

export default class WelcomeModal extends React.Component {
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
          <Modal.Title>Welcome to the Board Builder!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="order-summary-message text-center">
            <table>
              <tbody>
                <tr>
                  <td style={{paddingRight: '1.5rem'}}><i className="fa fa-cog fa-3x bounce" aria-hidden="true"></i></td>
                  <td style={{textAlign: 'left'}}>
                    <h4>Welcome to the PineCliff Woodworks Board Builder™</h4>
                    <p>Once you close this message you can begin to build your custom board. Start by selecting the length, and choosing any number of wood strips that will make up your design. Contact us if you have any questions.</p>
                    <p>Cheers, from the PCW Team! </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={this.onClose.bind(this)}><i class="fa fa-wrench" aria-hidden="true"></i> Build Your Custom Board</button>
        </Modal.Footer>
      </Modal>
    )

  }
}
