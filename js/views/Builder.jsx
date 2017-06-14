import React from 'react'
import BoardModel from 'models/Board'
import OrderModel from 'models/Order'
import Board from 'views/Board.jsx'
import Wizard from 'views/Wizard.jsx'
import classNames from 'classnames'
import SubmitOrderModal from 'views/SubmitOrderModal.jsx';
import OrderProcessingModal from 'views/OrderProcessingModal.jsx';

import woods from '../woods.json'

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '1.5rem',
    transform: 'translate(-50%, -50%)'
  }
}

export default class Builder extends React.Component {
  closeModal () {
    this.setState({
      showModal: false
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      board: new BoardModel({ createdFromId: this.props.id }),
      order: false,
      loaded: false,
      showModal: false
    }

    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)

    window.board = this.state.board
  }

  componentWillMount () {
    let promise = new Promise((resolve, reject) => {
      if (this.props.order) {
        this.state.order = new OrderModel({
          id: this.props.order,
          hash: this.props.hash
        })
        this.state.order.fetch({ success: resolve, error: reject })
      } else {
        resolve()
      }
    })
    .then(() => {
      if (this.state.order) {
        this.state.board.set('createdFromId', this.state.order.get('board_id'))
      }
      return new Promise((resolve, reject) => {
        this.state.board.fetch({ success: resolve , error: reject })
      })
    })
    .then(() => {
      setTimeout(() => {this.setState({loaded: true})}, 1000)
    })
    .catch(() => {
      this.setState({ error: true })
    })
  }

  componentWillUnmount () {
    this.request.abort()
  }

  openModal () {
    this.setState({
      showModal: true
    })
  }



  render () {
    let woodKeys = Object.keys(woods)
    let randomWood = woodKeys[(Math.floor(Math.random() * woodKeys.length-1))]
    let classes = classNames('vignette', randomWood, 'lowres')
    let orderProcessingModal

    // if (this.props.preview) {
    //   orderProcessingModal = (
    //
    //   )
    // }


    if (this.state.loaded) {
      return (
        <main>
          <Board board={this.state.board} overlay preview={this.props.preview}/>
          <Wizard board={this.state.board} order={this.state.order} onSubmit={this.openModal} preview={this.props.preview}/>
          <SubmitOrderModal board={this.state.board} show={this.state.showModal} close={this.closeModal}/>
          <OrderProcessingModal order={this.state.order} />
        </main>

      )
    }

    if (this.state.error) {
      return (
        <main className={classes}>
          <div className="loading">
            <div>
              <img src="/assets/misc/pcw-logo.png"/>
            </div>
            <div className="message">
              <p>Sorry, we couldn't load your board details.</p>
            </div>
            <div>
              <i className="fa fa-exclamation-triangle fa-4x"></i>
            </div>
          </div>
        </main>
      )
    }

    return (
      <main className={classes}>
        <div className="loading">
          <div>
            <img src="/assets/misc/pcw-logo.png"/>
          </div>
          <div className="message">
            <p>Gathering up some lumber&hellip;</p>
          </div>
          <div>
            <img src="/assets/misc/loading-ring.svg" />
          </div>
        </div>
      </main>
    )
  }
}
