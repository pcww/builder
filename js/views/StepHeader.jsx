import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

export default class StepHeader extends React.Component {
  render () {
    let nextButtonClasses = classNames('fa', 'fa-chevron-circle-right', {
      'text-muted': this.props.lastStep
    })
    var nextButton = (
      <a href="#" className="next-step">
        <i className={nextButtonClasses} aria-hidden="true" onClick={this.props.onNext}></i>
      </a>
    )

    let previousButtonClasses = classNames('fa', 'fa-chevron-circle-left', {
      'text-muted': this.props.firstStep
    })
    var previousButton = (
      <a href="#">
        <i className={previousButtonClasses} aria-hidden="true" onClick={this.props.onPrevious}></i>
      </a>
    )

    let classes = classNames('pull-right', {
      'hidden': this.props.preview
    })
    
    return (
      <header>
        <h3>
          {this.props.heading}

          <span className={classes}>
            {previousButton}&nbsp;
            {nextButton}
          </span>
        </h3>
      </header>
    )
  }
}
