import React from 'react'
import classNames from 'classnames'
import { Col, ControlLabel, FormControl, FormGroup, Grid, Modal, Row } from 'react-bootstrap'

export default class Step extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      address1: '',
      address2: '',
      city: '',
      email: '',
      name: '',
      phone: '',
      state: '',
      zip: ''
    }
  }

  saveOrder () {
    alert('Saving order!')
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
                    />
                </FormGroup>
              </Col>

              <Col sm={6}>
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    type="email"
                    value={this.state.email}
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
                    />
                </FormGroup>
              </Col>

              <Col sm={5}>
                <FormGroup>
                  <ControlLabel>State</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.state}
                    />
                </FormGroup>
              </Col>

              <Col sm={2}>
                <FormGroup>
                  <ControlLabel>Zip</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.zip}
                    />
                </FormGroup>
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={this.saveOrder}>Submit</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
