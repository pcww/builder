import React from 'react'
import BoardModel from 'models/Board'
import VirtualBoard from 'views/VirtualBoard.js'
import classNames from 'classnames'

let backgroundUrls = [
  '/assets/backgrounds/subtle-pattern-6.jpg',
  '/assets/backgrounds/pexels-photo-207301.jpg',
  '/assets/backgrounds/pexels-photo-349609.jpg',
  '/assets/backgrounds/wood-pattern-ground-parquet-floor.jpg',
  '/assets/backgrounds/pexels-photo-167698.jpg',
  '/assets/backgrounds/pexels-photo-301692.jpg',
]

export default class Board extends React.Component {
  _generateBackgrounds () {
    return backgroundUrls.map((backgroundUrl, index) => {
      let classes = classNames('swatch', 'swatch-clickable', {
        selected: this.state.background === backgroundUrl
      })

      return (
        <div
          className={classes}
          data-background={backgroundUrl}
          id={index}
          key={index}
          onClick={this.onChangeBackground}
          style={{
            backgroundImage: `url(${backgroundUrl})`
          }} />
      )
    })
  }

  _generateOverlay (width, length, logo_url, name) {
    return (
      <section type="overlay">
        <div className="dimensions badge">Dimensions {length}" x {width}"</div>

        {/* <div className="cost well text-center">Board Cost: <span className="label label-success">$297.36</span></div> */}

        {!this.props.image && (
          <div className="background-picker panel panel-default">
            <div className="panel-heading">select a background</div>
            <div className="panel-body">
              {this._generateBackgrounds()}
            </div>
          </div>
        )}

        <div className="idea-zone well well-sm">
          <i className="fa fa-2x fa-lightbulb-o" aria-hidden="true"></i>
          <a href="http://pinecliffwoodworks.com/gallery/" target="_blank">Need an idea&#63; Visit the Gallery!</a>
        </div>
      </section>
    )
  }

  constructor (props) {
    super(props)

    this.onChangeBackground = this.onChangeBackground.bind(this)

    this.state = {
      background: backgroundUrls[0]
    }
  }

  componentDidMount () {
    // Init Three.js board
    if (this.props.image) {
      return
    }

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
    this.setState({background: event.currentTarget.getAttribute('data-background')})
  }

  render () {
    let { board } = this.props
    let backgroundUrl
    let boardInfo
    let boardLogo
    let length = board.get('length')
    let width = board.get('width')
    let name = board.get('name')
    let logo_url = board.get('logo_url')
    let isMedusa = board.get('medusa')

    let overlay = this._generateOverlay(width, length, logo_url, name)

    if (this.props.image) {
      backgroundUrl = decodeURIComponent(this.props.image)
    } else {
      backgroundUrl = this.state.background
    }

    if (logo_url) {
      boardLogo = (
        <div className="board-logo">
          <img src={isMedusa ? '//builder.pinecliffwoodworks.com/assets/god-logos/medusa.png' : logo_url} alt={name}/>
        </div>
      )
    }

    boardInfo = (
      <div className="board-info">
        <h1>{isMedusa ? 'Medusa' : name}</h1>
        {boardLogo}
      </div>
    )

    return (
      <div
        className="virtual-board"
        style={{
          backgroundImage: `url(${backgroundUrl})`
        }}>
        {overlay}
        {boardInfo}
      </div>
    )
  }
}
