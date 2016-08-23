import React from 'react'
import ReactDOM from 'react-dom'

export default class StepHeader extends React.Component {
  nextStep () {
    this.props.steps[this.props.index].active = false
    this.props.steps[parseInt(this.props.index) + 1].active = true
  }

  prevStep () {
    this.props.steps[this.props.index].active = false
    this.props.steps[parseInt(this.props.index) - 1].active = true
  }

  render () {

    var nextButton = (
      <a href="#" className="next-step">
        <i className="fa fa-chevron-circle-right" aria-hidden="true" onClick={this.nextStep.bind(this)}></i>
      </a>
    )

    var previousButton = (
      <a href="#">
        <i className="fa fa-chevron-circle-left" aria-hidden="true" onClick={this.prevStep.bind(this)}></i>
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
