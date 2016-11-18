import React from 'react'
import classNames from 'classnames'
import OrderModel from 'models/Order'
import { Col, ControlLabel, FormControl, FormGroup, Grid, Modal, Row } from 'react-bootstrap'

export default class SubmitOrderModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      address1: '',
      address2: '',
      city: '',
      email: '',
      name: '',
      order: new OrderModel({
        board: this.props.board
      }),
      phone: '',
      state: '',
      zip: ''
    }

    this.handleAddress1Change = this.handleAddress1Change.bind(this)
    this.handleAddress2Change = this.handleAddress2Change.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleZipChange = this.handleZipChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleAddress1Change (event) {
    this.setState({
      address1: event.target.value
    })
  }

  handleAddress2Change (event) {
    this.setState({
      address2: event.target.value
    })
  }

  handleCityChange (event) {
    this.setState({
      city: event.target.value
    })
  }

  handleEmailChange (event) {
    this.setState({
      email: event.target.value
    })
  }

  handleNameChange (event) {
    this.setState({
      name: event.target.value
    })
  }

  handlePhoneChange (event) {
    this.setState({
      phone: event.target.value
    })
  }

  handleStateChange (event) {
    this.setState({
      state: event.target.value
    })
  }

  handleZipChange (event) {
    this.setState({
      zip: event.target.value
    })
  }

  onSubmit () {
    let order = this.state.order
    let board = order.get('board')

    let promise = new Promise((resolve, reject) => {
      board.save({}, {
        error: reject,
        success: resolve,
        url: board.urlRoot + '/board'
      })
    })

    promise.then(() => {
      console.log('Board saved!')

      return new Promise((resolve, reject) => {
        order.save({
          address: {
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip
          },
          board_id: board.get('id'),
          email: this.state.email,
          name: this.state.name,
          notes: '',
          order_date: new Date().toISOString(),
          phone: this.state.phone,
        }, {
          error: reject,
          success: resolve,
          url: board.urlRoot + '/order'
        })
      })
    })

    promise.then(() => {
      console.log('Order saved!')
      console.log('Woohoo!')
      alert('Board Order Submitted!')
      this.props.close()
    })
  }

  render () {
    let classes = classNames('step-container', {
      current: this.props.isActive
    });

    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <Row>
              <Col sm={12}>
                <FormGroup>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col sm={6}>
                <FormGroup>
                  <ControlLabel>Phone</ControlLabel>
                  <FormControl
                    type="phone"
                    value={this.state.phone}
                    onChange={this.handlePhoneChange}
                    />
                </FormGroup>
              </Col>

              <Col sm={6}>
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    type="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <FormGroup>
                  <ControlLabel>Address</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.address1}
                    onChange={this.handleAddress1Change}
                    />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <FormGroup>
                  <FormControl
                    type="text"
                    value={this.state.address2}
                    onChange={this.handleAddress2Change}
                    />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col sm={5}>
                <FormGroup>
                  <ControlLabel>City</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.city}
                    onChange={this.handleCityChange}
                    />
                </FormGroup>
              </Col>

              <Col sm={5}>
                <FormGroup>
                  <ControlLabel>State</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.state}
                    onChange={this.handleStateChange}
                    />
                </FormGroup>
              </Col>

              <Col sm={2}>
                <FormGroup>
                  <ControlLabel>Zip</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.zip}
                    onChange={this.handleZipChange}
                    />
                </FormGroup>
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
