import React from 'react'

import StepHeader from 'views/StepHeader.jsx'

export default class Step extends React.Component {
  render () {

    return (
      <section className="step">
        <StepHeader heading={this.props.heading}></StepHeader>

        <form>{this.props.children}</form>
      </section>
    )
  }
}
