import React from 'react'
import ReactDOM from 'react-dom'
import { Col, ControlLabel, FormControl, FormGroup, Grid, Modal, Row } from 'react-bootstrap'

export default class OrderProcessingModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: !!this.props.order
    }

    if (this.props.order) {
      console.log('showing OrderProcessingModal with order:', this.props.order)
    }
  }

  onClose (event) {
    this.setState({ showModal: false })
  }



  render () {

    return (
      <Modal show={this.state.showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Status</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="order-summary-message text-center">
            <table>
              <tbody>
                <tr>
                  <td><i className="fa fa-thumbs-o-up fa-3x bounce" aria-hidden="true"></i></td>
                  <td>
                    <h4>Your order is being lovingly cared for.</h4>
                    <h5>We will contact you soon with details!</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br/>
          <div className="order-summary-message well well-sm text-center">
            <p className="text-info"><i className="fa fa-twitter-square fa-4x" aria-hidden="true"></i> <i className="fa fa-facebook-square fa-4x" aria-hidden="true"></i></p>
            <p>In the meantime, share your new board on social media.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={this.onClose.bind(this)}>Ok</button>
        </Modal.Footer>
      </Modal>
    )

  }
}
