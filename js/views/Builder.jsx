import React from 'react'
import BoardModel from 'models/Board'
import Board from 'views/Board.jsx'
import Wizard from 'views/Wizard.jsx'
import classNames from 'classnames'
import SubmitOrderModal from 'views/SubmitOrderModal.jsx';

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
      loaded: false,
      showModal: false
    }

    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)

    window.board = this.state.board
  }

  componentWillMount () {
    this.request = this.state.board.fetch()
    .done(() => {
      setTimeout(() => {this.setState({loaded: true})}, 1000)
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

    if (this.state.loaded) {
      return (
        <main>
          <Board board={this.state.board} overlay />

          <Wizard board={this.state.board} onSubmit={this.openModal} />

          <SubmitOrderModal board={this.state.board} show={this.state.showModal} close={this.closeModal}/>
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
