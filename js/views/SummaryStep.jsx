import React from 'react'
import ReactDOM from 'react-dom'





let sizes = {
  xxsmall: 0.25,
  xsmall: 0.375,
  small: 0.5,
  medium: 0.625,
  large: 1
}





export default class Wizard extends React.Component {
  getDimensions () {
    let board = this.props.board

    return `${board.get('width')}" x ${board.get('length')}"`
  }

  getEdge () {
    let board = this.props.board
    let edge = ''

    switch (board.get('edge').profile) {
      case 'Bead':
        edge = 'Bead'
        break
      case 'chamfer':
        edge = 'Chamfer'
        break
      case 'cove':
        edge = 'Cove'
        break
      case 'large-round':
        edge = 'Large Round'
        break
      case 'small-round':
        edge = 'Small Round'
        break
    }

    return edge += ' Edge'
  }

  getEndcaps () {
    let board = this.props.board
    let endcaps = ''

    if (board.get('endcaps').branding !== 'none') {
      endcaps += 'Branded '
    }

    if (board.get('endcaps').type === 'button') {
      let color = board.get('endcaps').color

      switch (color) {
        case 'black':
          endcaps += 'Black '
          break
        case 'blue':
          endcaps += 'Blue '
          break
        case 'cyan':
          endcaps += 'Cyan '
          break
        case 'green':
          endcaps += 'Green '
          break
        case 'orange':
          endcaps += 'Orange '
          break
        case 'purple':
          endcaps += 'Purple '
          break
        case 'red':
          endcaps += 'Red '
          break
        case 'white':
          endcaps += 'White '
          break
        case 'yellow':
          endcaps += 'Yellow '
          break
        case 'stainless':
          endcaps += 'Stainless Steel '
          break
      }

      endcaps += 'Buttons'

    } else {
      endcaps += 'Nut Covers'
    }

    return endcaps
  }

  getFeet () {
    let board = this.props.board
    let feet = ''

    if (board.get('feet').type === 'suction') {
      feet = 'Suction Cups'
    } else {
      feet = 'Screw In'
    }

    return feet + ' Feet'
  }

  getHandle () {
    let board = this.props.board
    let handle = ''

    switch (board.get('handle')) {
      case 'dado':
        handle = 'Dado'
        break
      case 'elk-horn':
        handle = 'Elk Horn'
        break
      case 'none':
        handle = 'None'
        break
      case 'shaped':
        handle = 'Shaped'
        break
      case 'stainless':
        handle = 'Stainless'
        break
      case 'turned':
        handle = 'Turned'
        break
    }

    return handle += ' Handle'
  }

  getLayout () {
    let Strips = board.get('strips').map((strip, key) => {
      let styles = {
        flexGrow: sizes[strip.get('size')]
      }

      return (
        <div className={strip.get('wood')} key={strip.id} style={styles}></div>
      )
    })

    return (
      <div className="board-layout">
        {Strips}
      </div>
    )
  }

  render () {
    return (
      <div className="step-content">
        <fieldset>
          <legend>Layout</legend>
          {this.getLayout()}
        </fieldset>

        <fieldset>
          <legend>Board Dimensions</legend>
          {this.getDimensions()}
        </fieldset>

        <fieldset>
          <legend>Edge</legend>
          {this.getEdge()}
        </fieldset>

        <fieldset>
          <legend>Endcaps</legend>
          {this.getEndcaps()}
        </fieldset>

        <fieldset>
          <legend>Feet</legend>
          {this.getFeet()}
        </fieldset>

        <fieldset>
          <legend>Handle</legend>
          {this.getHandle()}
        </fieldset>
      </div>
    )
  }
}
