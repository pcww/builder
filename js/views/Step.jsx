import React from 'react'
import classNames from 'classnames'
import StepHeader from 'views/StepHeader.jsx'

export default class Step extends React.Component {
  render () {
    let currentStep = this.props.steps[this.props.index]
    let classes = classNames('step', {
      'hidden': !currentStep.active
    });

    return (
      <section className={classes}>
        <StepHeader heading={currentStep.name} index={this.props.index} steps={this.props.steps}></StepHeader>

        <form>{this.props.children}</form>
      </section>
    )
  }
}
