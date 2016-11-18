import React from 'react'
import BoardModel from 'models/Board'
import Board from 'views/Board.jsx'
import Wizard from 'views/Wizard.jsx'
import classNames from 'classnames'
import Modal from 'react-modal'

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
    this.state = {
      showModal: false
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      board: new BoardModel({ createdFromId: this.props.id }),
      loaded: false,
      showModal: false
    }

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
          <Wizard board={this.state.board} onSubmit={this.openModal.bind(this)} preview={this.props.preview} />
          <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.closeModal.bind(this)}
            contentLabel="Example Modal"
            style={customStyles}
          >
            <div className="imageModal">
              <header className="imageModal-header">
                <h2 ref="subtitle">Endcap Types</h2>
                <span className="imageModal-buttons imageModal-header-closeButton">
                  <i className="fa fa-times"></i>
                </span>
              </header>

              <div className="imageModal-contents">

              </div>
            </div>
          </Modal>
        </main>
      )
    }

    return (
      <main className={classes}>
        <div className="loading">
          <img src="/assets/misc/pcw-logo.png"/>
          <p>Gathering up some lumber&hellip;</p>
          <img src="/assets/misc/loading-ring.svg" />
        </div>
      </main>
    )
  }
}
