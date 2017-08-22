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
    return (
      <Modal show={this.props.show} backdrop="static" onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Materials List</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <form>
              <Row>
                <Col sm={12}>
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
