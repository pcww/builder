import React from 'react'
import classNames from 'classnames'
import { ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap'

export default class Step extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
    }
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
            <FormGroup>
              <ControlLabel>Name:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.name}
                />
            </FormGroup>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}
