import React from 'react'
import BoardModel from 'models/Board'
import Board from 'views/Board.jsx'
import Wizard from 'views/Wizard.jsx'

export default class Builder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      board: new BoardModel({ id: this.props.id }),
      loaded: false
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

  render () {
    if (this.state.loaded) {
      return (
        <main>
          <Board board={this.state.board} overlay />
          <Wizard board={this.state.board} />
        </main>
      )
    }

    return (
      <main>
        <div className="loading">
          <img src="/assets/misc/pcw-logo.png"/>
          <p>Gathering up some lumber...</p>
          <img src="/assets/misc/loading.gif"/>
        </div>
      </main>
    )

  }
}
