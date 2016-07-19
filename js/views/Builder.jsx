import React from 'react'
import BoardModel from 'models/Board'
import Wizard from 'views/Wizard.jsx'
import Board from 'views/Board.js'

export default class Builder extends React.Component {
  constructor (props) {
      super(props)
      this.state = {
        board: new BoardModel({ id: this.props.id }),
        loaded: false
      }
  }

  componentWillMount () {
    this.request = this.state.board.fetch()
    .done(() => {
      this.setState({loaded: true})

      // Init Three.js board
      window.board = new Board(this.state.board, 'main')
      window.addEventListener('resize', onWindowResize, false);
      function onWindowResize() {
        window.board.resize()
      }

    })
  }

  componentWillUnmount () {
    this.request.abort()
  }

  render () {
    if (this.state.loaded) {
      let strips = this.state.board.get('strips')
      let width = this.state.board.get('width')
      console.log(this.state.board)
      return (
        <div>
          <main class="board-view"></main>
          <section type="overlay">
            <div class="dimensions badge">Dimensions 38.6" x 25.0"</div>
            <div class="cost well text-center">Board Cost: <span class="label label-success">$297.36</span></div>
          </section>

        </div>
      )
    }

    return <div>Loading that sexy board data...</div>

  }
}
