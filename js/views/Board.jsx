import React from 'react'
import BoardModel from 'models/Board'
import VirtualBoard from 'views/VirtualBoard.js'

export default class Builder extends React.Component {
  constructor (props) {
      super(props)
  }

  componentDidMount () {
      // Init Three.js board
      window.vboard = new VirtualBoard(this.props.board, '.virtual-board')
      window.addEventListener('resize', onWindowResize, false)
      function onWindowResize() {
        window.vboard.resize()
      }
  }

  render () {
    let overlay
    if (this.props.overlay) {
      overlay = (
        <section type="overlay">
          <div className="dimensions badge">Dimensions 38.6" x 25.0"</div>
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
