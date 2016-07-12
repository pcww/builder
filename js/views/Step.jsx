import React from 'react'
import ReactDOM from 'react-dom'

import StepHeader from 'views/StepHeader.jsx'

export default class Step extends React.Component {
  render () {

    return (
      <section>
        <StepHeader heading={this.props.heading}></StepHeader>

        <form>{this.props.children}</form>
      </section>
    )
  }
}
