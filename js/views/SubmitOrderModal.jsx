import React from 'react'
import classNames from 'classnames'
import OrderModel from 'models/Order'
import { Col, Collapse, ControlLabel, FormControl, HelpBlock, FormGroup, Grid, Modal, Row } from 'react-bootstrap'

export default class SubmitOrderModal extends React.Component {
  constructor (props) {
    super(props)

    order = this.props.order
    order.set('board', this.props.board)

    this.state = {
      address1: undefined,
      address2: undefined,
      city: undefined,
      email: undefined,
      name: undefined,
      order: order,
      phone: undefined,
      state: undefined,
      zip: undefined,
      formErrors: [],
      orderProcessing: false,
      orderComplete: false,
      showCloseButton: true
    }

    this.handleAddress1Change = this.handleAddress1Change.bind(this)
    this.handleAddress2Change = this.handleAddress2Change.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleZipChange = this.handleZipChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.orderComplete = this.orderComplete.bind(this)
    this.resetForm = this.resetForm.bind(this)
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

  getValidationState (field) {
    console.log('validationState:', arguments)
    let value = this.state[field];
    if (typeof value == 'undefined') {
      return null;
    }
    // console.log('field:', field, arguments)
    if (value.length > 0) {
      return 'success'
    }
    else {
      return 'error'
    }
  }

  resetForm () {
    let fields = ['name', 'phone', 'email', 'address1', 'city', 'state', 'zip']
    for (const field of fields) {
      let obj = {}
      obj[field] = undefined
      this.setState(obj)
    }
  }

  validateForm () {
    let requiredFields = ['name', 'phone', 'email', 'address1', 'city', 'state', 'zip']
    let formErrors = []
    for (const field of requiredFields) {
      console.log('checking ', field, 'value: ', this.state[field])

      if (typeof this.state[field] == 'undefined') {
        // force validation on untouched (undefined) fields
        let obj = {}
        obj[field] = ''
        this.setState(obj)
      }

      if (typeof this.state[field] == 'undefined' || this.state[field].length <= 0) {
        console.error(field, 'invalid')
        formErrors.push(field)
      }
    }

    this.setState({formErrors: formErrors})

    return formErrors
  }

  onSubmit () {
    if (this.state.orderProcessing || this.state.orderComplete) return

    let formErrors = this.validateForm()
    console.log('formErrors ', formErrors)
    if (formErrors.length > 0) return

    let order = this.state.order
    let board = order.get('board')

    this.setState({orderProcessing: true})

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
      // alert('Board Order Submitted!')
      this.orderComplete()
    })

    promise.catch((error) => {
      alert('There was an error submitting your order.')
      this.setState({orderProcessing: false})
    })
  }

  orderComplete () {
    this.resetForm()
    this.setState({orderComplete: true, showCloseButton: false})
    this.props.complete()
  }

  render () {
    let classes = classNames('step-container', {
      current: this.props.isActive
    })

    let submitButtonText
    if (this.state.orderComplete) {
      submitButtonText = (<span><i className="fa fa-check-circle" aria-hidden="true"></i> Order Submitted</span>)
    }
    else if (!this.state.orderProcessing) {
      submitButtonText = (<span><i className="fa fa-envelope-o" aria-hidden="true"></i> Submit Your Order</span>)
    } else {
      submitButtonText = (<span><i className="fa fa-circle-o-notch fa-spin fa-fw"></i> Submitting&hellip;</span>)
    }

    let submitButtonDisabled = (this.state.orderComplete) ? "disabled" : false

    return (
      <Modal show={this.props.show} onHide={this.props.close} backdrop="static">
        <Modal.Header closeButton={this.state.showCloseButton}>
          <Modal.Title>Submit Board Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Collapse in={!this.state.orderComplete}>
            <div>
              <form>
                <Row>
                  <Col sm={12}>
                    <FormGroup controlId="formName" validationState={this.getValidationState('name')}>
                      <ControlLabel>Name</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        placeholder="John Smith"
                        />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <FormGroup controlId="formPhone" validationState={this.getValidationState('phone')}>
                      <ControlLabel>Phone</ControlLabel>
                      <FormControl
                        type="phone"
                        value={this.state.phone}
                        onChange={this.handlePhoneChange}
                        placeholder="(555) 123-4567"
                        />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>

                  <Col sm={6}>
                    <FormGroup controlId="formEmail" validationState={this.getValidationState('email')}>
                      <ControlLabel>Email</ControlLabel>
                      <FormControl
                        type="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        placeholder="john.smith@domain.com"
                        />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm={12}>
                    <FormGroup controlId="formAddress1" validationState={this.getValidationState('address1')}>
                      <ControlLabel>Address</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.address1}
                        onChange={this.handleAddress1Change}
                        placeholder="123 Main Street"
                        />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm={12}>
                    <FormGroup controlId="formAddress2">
                      <FormControl
                        type="text"
                        value={this.state.address2}
                        onChange={this.handleAddress2Change}
                        placeholder="(Optional) Apt 123"
                        />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm={5}>
                    <FormGroup controlId="formCity" validationState={this.getValidationState('city')}>
                      <ControlLabel>City</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.city}
                        onChange={this.handleCityChange}
                        />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>

                  <Col sm={4}>
                    <FormGroup controlId="formState" validationState={this.getValidationState('state')}>
                      <ControlLabel>State</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.state}
                        onChange={this.handleStateChange}
                        />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>

                  <Col sm={3}>
                    <FormGroup controlId="formZip" validationState={this.getValidationState('zip')}>
                      <ControlLabel>Zip</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.zip}
                        onChange={this.handleZipChange}
                        />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
              </form>
            </div>
          </Collapse>

          <Collapse in={this.state.orderComplete}>
            <div className="text-center well well-sm">
              <h3 className="text-primary">One Last Step!</h3>
              <p>Please Check your email to verify the order. <br/>It <strong><em>WILL NOT</em></strong> be processed by Pine Cliff Woodworks without being verified.</p>
              <br/>
              <i className="fa fa-exclamation-triangle fa-5x text-primary" aria-hidden="true"></i>
            </div>
          </Collapse>


        </Modal.Body>
        <Modal.Footer>
          { this.state.orderComplete ? (<button className="btn btn-link pull-left" onClick={this.props.close}>Okay, I've verified my order</button>) : null}
          <button className="btn btn-primary" disabled={submitButtonDisabled} onClick={this.onSubmit}>{submitButtonText}</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
