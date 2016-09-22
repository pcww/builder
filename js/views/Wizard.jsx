import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import Step from 'views/Step.jsx'
import StepHeader from 'views/StepHeader.jsx'
import StripPanel from 'views/StripPanel.jsx'

export default class Wizard extends React.Component {
  constructor(props) {
      super(props)
      this.stepHeadings = {
        '1': 'Build',
        '2': 'Accessorize',
        '3': 'Summary'
      }
  }

  componentWillMount () {
    this.state = {
      currentStep: 0,
      totalSteps: 3,
      stripsExpand: false
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

  onToggleStripsExpand () {
    console.log('expando', this.state.stripsExpand ? 'hide' : 'show' )
    if (this.state.stripsExpand)
      $('.panel-collapse.collapse').collapse('hide')
    else
      $('.panel-collapse.collapse').collapse('show')

    this.setState({ stripsExpand: !this.state.stripsExpand })
  }

  onSubmitOrder () {
    window.alert('Order Submitted!')
  }

  render () {
    let board = this.props.board

    let Strips = board.get('strips').map((strip, key) => {
      return (
        <StripPanel id={key} strip={strip} key={key} removeStrip={this.removeStrip.bind(this)}></StripPanel>
      )
    })

    let expandClass = classNames('fa', {
      'fa-plus': !this.state.stripsExpand,
      'fa-minus': this.state.stripsExpand
    });

    return (
      <menu className="wizard" type="toolbar">
        <StepHeader
          heading={'Step ' + (this.state.currentStep + 1) + ': ' + this.stepHeadings[this.state.currentStep + 1]}
          onNext={this.onNext.bind(this)}
          onPrevious={this.onPrevious.bind(this)}>
        </StepHeader>

        <div className="steps">
          <Step isActive={this.state.currentStep === 0} key={0}>
            <div className="step-content">
              <fieldset>
                <legend>Board Length</legend>

                <input
                  type="range"
                  max="48"
                  min="8"
                  step="2"
                  defaultValue={board.get('width')}
                  onChange={this.onStripLengthChanged.bind(this)} />
              </fieldset>

              <fieldset>
                <legend>Board Strips <button type="button" className="btn btn-link pull-right" onClick={this.onToggleStripsExpand.bind(this)}><i className={expandClass} aria-hidden="true"></i></button></legend>

                {Strips}
              </fieldset>
            </div>

            <div className="step-controls controls">
              <button type="button" className="btn btn-sm btn-primary" onClick={this.addStrip.bind(this)}><i className="fa fa-plus-circle"></i> Add Strip</button>
              &nbsp;
              <button type="button" className="btn btn-sm btn-primary" onClick={this.onNext.bind(this)}><i className="fa fa-arrow-right"></i> Next Step</button>
            </div>
          </Step>

          <Step isActive={this.state.currentStep === 1} key={1}>
            <div className="step-content">
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
            </div>

            <div className="step-controls controls">
              <button type="button" className="btn btn-sm btn-primary" onClick={this.onPrevious.bind(this)}><i className="fa fa-arrow-left"></i> Previous Step</button>
              &nbsp;
              <button type="button" className="btn btn-sm btn-primary" onClick={this.onNext.bind(this)}><i className="fa fa-arrow-right"></i> Next Step</button>
            </div>
          </Step>

          <Step isActive={this.state.currentStep === 2} key={2}>
            <div className="step-content">
              Order Summary
              <hr/>

              <pre>Order details...</pre>

              <br/>
            </div>

            <div className="step-controls controls">
              <button type="button" className="btn btn-sm btn-primary" onClick={this.onPrevious.bind(this)}><i className="fa fa-arrow-left"></i> Previous Step</button>
              &nbsp;
              <button type="button" className="btn btn-sm btn-primary" onClick={this.onSubmitOrder.bind(this)}><i className="fa fa-envelope-o" aria-hidden="true"></i> Submit Order</button>
            </div>
          </Step>
        </div>


      </menu>
    )
  }
}
