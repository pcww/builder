import React from 'react'
import ReactDOM from 'react-dom'

import Step from 'views/Step.jsx'
import StepHeader from 'views/StepHeader.jsx'
import StripPanel from 'views/StripPanel.jsx'

export default class Wizard extends React.Component {
  componentWillMount () {
    this.state = {
      currentStep: 0,
      totalSteps: 3
    }
  }

  onNext () {
    let nextStep = this.state.currentStep + 1

    if (nextStep < this.state.totalSteps) {
      this.setState({
        currentStep: nextStep
      })
    }
  }

  onPrevious () {
    let previousStep = this.state.currentStep - 1

    if (previousStep >= 0) {
      this.setState({
        currentStep: previousStep
      })
    }
  }

  onStripLengthChanged (event) {
    this.props.board.set('width', event.currentTarget.value)
  }

  addStrip () {
    this.props.board.get('strips').add({ "wood": "maple", "size": "large"})
    this.forceUpdate()
    console.log(this.props.board.get('strips'))
  }

  removeStrip (strip) {
    this.props.board.get('strips').remove(strip)
    this.props.board.set('redraw', true)
    this.forceUpdate()
    console.log(this.props.board.get('strips'))
  }

  render () {
    let board = this.props.board

    let Strips = board.get('strips').map((strip, key) => {
      return (
        <StripPanel id={key} strip={strip} key={key} removeStrip={this.removeStrip.bind(this)}></StripPanel>
      )
    })

    return (
      <menu className="wizard" type="toolbar">
        <StepHeader
          heading={'Step ' + (this.state.currentStep + 1)}
          onNext={this.onNext.bind(this)}
          onPrevious={this.onPrevious.bind(this)}>
        </StepHeader>

        <Step isActive={this.state.currentStep === 0} key={0}>
          <div className="step-content">
            <fieldset>
              <legend>Strip Length</legend>

              <input
                type="range"
                max="48"
                min="8"
                step="2"
                defaultValue={board.get('width')}
                onChange={this.onStripLengthChanged.bind(this)} />
            </fieldset>

            <fieldset>
              <legend>Strips</legend>

              {Strips}
            </fieldset>
          </div>

          <div className="controls">
            <button type="button" className="btn btn-sm btn-primary" onClick={this.addStrip.bind(this)}><i className="fa fa-plus-circle"></i> Add Strip</button>
            <button type="button" className="btn btn-sm btn-primary" onClick={this.onNext.bind(this)}><i className="fa fa-arrow-right"></i> Next Step</button>
          </div>
        </Step>

        <Step isActive={this.state.currentStep === 1} key={1}>
          <fieldset>
            <legend>Handle</legend>
            <span>&hellip;</span>
          </fieldset>

          <fieldset>
            <legend>Edge</legend>
            <span>&hellip;</span>
          </fieldset>

          <fieldset>
            <legend>Groove</legend>
            <span>&hellip;</span>
          </fieldset>

          <fieldset>
            <legend>Feet</legend>
            <span>&hellip;</span>
          </fieldset>
        </Step>

        <Step isActive={this.state.currentStep === 2} key={2}>
          Order Summary
        </Step>
      </menu>
    )
  }
}
