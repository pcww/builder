import React from 'react'
import classNames from 'classnames'
import { Col, Modal, Row, Table } from 'react-bootstrap'

import constants from '../constants.json'

let sizes = constants.SIZES

export default class MaterialsListModal extends React.Component {
  constructor (props) {
    super(props)

  }

  render () {
    const endcaps = this.props.board.get('endcaps').attributes
    const isChoosePattern = endcaps.branding === 'chooseapattern'
    const order = this.props.order.attributes
    const address = _.get(order, 'address');
    let simpleAddress = []
    if (address) {
      for (const field of ['address1', 'address2', 'city', 'state', 'zip']) {
        const value = _.get(address, field)
        if (value) simpleAddress.push(value)
      }
    }

    return (
      <Modal show={this.props.show} backdrop="static" onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Materials List</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <form>
            { order &&
                <Row>
                  <Col sm={12}>
                    <h4>Order Information</h4>
                    <table>
                      <tbody>
                        <tr><th><strong>Name: </strong></th><td>{_.get(order, 'name', '-')}</td></tr>
                        <tr><th><strong>Email: </strong></th><td>{_.get(order, 'email', '-')}</td></tr>
                        <tr><th><strong>Phone: </strong></th><td>{_.get(order, 'phone', '-')}</td></tr>
                        <tr><th><strong>Address: </strong></th><td>{simpleAddress.join(', ')}</td></tr>
                        <tr><th><strong>Notes: </strong></th><td>{_.get(order, 'notes', '-')}</td></tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
            }
            { isChoosePattern &&
                <Row>
                  <Col sm={12}>
                    <h4>General Information</h4>
                    <p>
                      Selected endcap pattern image filename: <strong>{endcaps.chooseapattern}</strong>
                    </p>
                  </Col>
                </Row>
              }
              <Row>
                <Col sm={12}>
                <h4>Strip Information</h4>
                  <Table>
                    <thead>
                      <tr>
                        <td>Strip Number</td>

                        <td>Wood Type</td>

                        <td>Dimensions</td>
                      </tr>
                    </thead>

                    <tbody>
                      {this.props.board.get('strips').toJSON().map((strip, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>{strip.wood}</td>

                            <td>
                              W: {sizes[strip.size]}"<br/>
                              L: {this.props.board.get('length')}"<br />
                              H: 1.75"
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
