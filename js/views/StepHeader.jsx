import React from 'react'
import ReactDOM from 'react-dom'

export default class StepHeader extends React.Component {
  render () {
    let nextButton
    let previousButton

    let hasNext = this.props.hasNext || true
    let hasPrevious = this.props.hasPrevious || true

    if (this.props.hasNext) {
      previousButton = (
        <a href="#" className="next-step"><i className="fa fa-chevron-circle-right" aria-hidden="true"></i></a>
      )
    }

    if (this.props.hasPrevious) {
      previousButton = (
        <a href="#"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></a>
      )
    }

    return (
      <header>
        <h3>
          {this.props.heading}
          <span className="pull-right">
            {previousButton}
            {nextButton}
          </span>
        </h3>
      </header>
    )
  }
}
