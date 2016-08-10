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
      this.setState({loaded: true})
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
      <main><div className="loading">Loading that sexy board data...</div></main>
    )

  }
}
