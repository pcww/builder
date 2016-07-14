import React from 'react'
import ReactDOM from 'react-dom'

export default class StepHeader extends React.Component {
  render () {
    var nextButton = (
      <a href="#" className="next-step">
        <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
      </a>
    )

    var previousButton = (
      <a href="#">
        <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>
      </a>
    )

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
