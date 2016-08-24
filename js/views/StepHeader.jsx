import React from 'react'
import ReactDOM from 'react-dom'

export default class StepHeader extends React.Component {
  render () {
    var nextButton = (
      <a href="#" className="next-step">
        <i className="fa fa-chevron-circle-right" aria-hidden="true" onClick={this.props.onNext}></i>
      </a>
    )

    var previousButton = (
      <a href="#">
        <i className="fa fa-chevron-circle-left" aria-hidden="true" onClick={this.props.onPrevious}></i>
      </a>
    )

    return (
      <header>
        <h3>
          {this.props.heading}

          <span className="pull-right">
            {previousButton}&nbsp;
            {nextButton}
          </span>
        </h3>
      </header>
    )
  }
}
