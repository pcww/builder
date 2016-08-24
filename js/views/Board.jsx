import React from 'react'
import BoardModel from 'models/Board'
import VirtualBoard from 'views/VirtualBoard.js'

export default class Builder extends React.Component {
  componentDidMount () {
    // Init Three.js board
    window.vboard = new VirtualBoard(this.props.board, '.virtual-board')
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
      window.vboard.resize()
    }
  }

  componentWillMount () {
    this.props.board.on('change', (model, option) => {
      this.forceUpdate()
    })
  }

  render () {
    let overlay

    let board = this.props.board
    let length = board.get('length')
    let width = board.get('width')

    if (this.props.overlay) {
      overlay = (
        <section type="overlay">
          <div className="dimensions badge">Dimensions {length}" x {width}"</div>
          <div className="cost well text-center">Board Cost: <span className="label label-success">$297.36</span></div>
        </section>
      )
    }

    return (
      <div className="virtual-board">
        {overlay}
      </div>
    )
  }
}
