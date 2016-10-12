import React from 'react'
import BoardModel from 'models/Board'
import Board from 'views/Board.jsx'
import Wizard from 'views/Wizard.jsx'
import classNames from 'classnames'

import woods from '../woods.json'

export default class Builder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      board: new BoardModel({ id: this.props.id }),
      loaded: false
    }

    this.state.board.set("length", 24)
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

  render () {
    let woodKeys = Object.keys(woods)
    let randomWood = woodKeys[(Math.floor(Math.random() * woodKeys.length-1))]
    let classes = classNames('vignette', randomWood, 'lowres')

    if (this.state.loaded) {
      return (
        <main>
          <Board board={this.state.board} overlay />
          <Wizard board={this.state.board} />
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
