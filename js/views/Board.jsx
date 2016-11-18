import React from 'react'
import BoardModel from 'models/Board'
import VirtualBoard from 'views/VirtualBoard.js'
import classNames from 'classnames'

export default class Builder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      backgroundIndex: 6
    }
  }

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

  onChangeBackground (event) {
    this.setState({backgroundIndex: event.currentTarget.id})
  }

  onHideSummaryMessage (event) {
    this.setState({ hideOrderSummaryMessage: true })
  }

  render () {
    let overlay

    let virtualBoardClasses = classNames('virtual-board', 'background-'+this.state.backgroundIndex)

    let board = this.props.board
    let length = board.get('length')
    let width = board.get('width')

    let numberOfBackgroundOptions = 6

    let Backgrounds = Array.from(Array(numberOfBackgroundOptions).keys()).map((i) => {
      let index = i+1
      let backgroundUrl = `/assets/backgrounds/subtle-pattern-${index}.jpg`
      let classes = classNames('swatch', 'swatch-clickable', {
        'selected': this.state.backgroundIndex == index
      });

      return (
        <div key={index} className={classes} id={index} onClick={this.onChangeBackground.bind(this)}><img src={backgroundUrl}/></div>
      )
    })

    if (this.props.overlay) {
      let orderSummaryClasses = classNames('order-summary-message', 'well', {
        hidden: !this.props.preview || this.state.hideOrderSummaryMessage
      })

      overlay = (
        <section type="overlay">
          <div className="dimensions badge">Dimensions {length}" x {width}"</div>

          <div className="cost well text-center">Board Cost: <span className="label label-success">$297.36</span></div>

          <div className="background-picker panel panel-default">
            <div className="panel-heading">select a background</div>
            <div className="panel-body">
              {Backgrounds}
            </div>
          </div>

          <div className="idea-zone well well-sm">
            <i className="fa fa-2x fa-lightbulb-o" aria-hidden="true"></i>
            <a href="http://pinecliffwoodworks.com/gallery/" target="_blank">Need an idea&#63; Visit the Gallery!</a>
          </div>

          <div className={orderSummaryClasses}>
            <i className="fa fa-thumbs-o-up fa-3x bounce" aria-hidden="true"></i>
            <span>Your order is being lovingly cared for. We will contact you soon with details!</span>
            <button type="button" className="close btn btn-link" onClick={this.onHideSummaryMessage.bind(this)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </section>
      )
    }

    return (
      <div className={virtualBoardClasses}>
        {overlay}
      </div>
    )
  }
}
