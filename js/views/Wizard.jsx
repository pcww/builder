import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import Sortable from '../../bower_components/Sortable/Sortable.min.js'

import Step from 'views/Step.jsx'
import StepHeader from 'views/StepHeader.jsx'
import StripPanel from 'views/StripPanel.jsx'
import HandlePicker from 'views/HandlePicker.jsx'
import EdgePicker from 'views/EdgePicker.jsx'
import GroovePicker from 'views/GroovePicker.jsx'
import FeetPicker from 'views/FeetPicker.jsx'

export default class Wizard extends React.Component {
  constructor(props) {
    super(props)
    this.stepHeadings = {
      '1': 'Design',
      '2': 'Endcaps',
      '3': 'Accessorize',
      '4': 'Board Summary'
    }
    this.maxWidth = 13
  }

  componentDidMount () {
    this.initializeSortable()

    // Bootstrap Grossness
    $(function () {
      $('[data-toggle="tooltip"]').tooltip({container: 'body'})
    })
  }

  componentWillMount () {
    this.state = {
      currentStep: 0,
      maxedWidth: false,
      stripsExpand: false,
      totalSteps: 4
    }
  }

  initializeSortable () {
    if (this.sortable) {
      this.sortable.destroy()
    }

    this.sortable = Sortable.create(document.querySelector('.sortable-list'), {
      animation: 150,
      handle: '.drag-handle',
      onSort: (event) => {
        let newIndex = event.newIndex
        let oldIndex = event.oldIndex
        let strips = this.props.board.get('strips')
        let strip = strips.remove(strips.at(oldIndex))
        let stripsArray = strips.toJSON()

        stripsArray.splice(newIndex, 0, strip)

        strips.reset(stripsArray)
      }
    })
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
    this.updateMaxedWidth()
  }

  updateMaxedWidth () {
    board = this.props.board
    console.log('updateMaxedWidth()', board._currentWidth(), this.maxWidth)
    this.setState({ maxedWidth: (board._currentWidth() > this.maxWidth) })
  }

  addStrip () {
    console.log('addStrip()')
    this.props.board.get('strips').add({ "wood": "maple", "size": "medium"})
    this.forceUpdate()
    this.initializeSortable()
    this.updateMaxedWidth()
  }

  removeStrip (strip) {
    this.props.board.get('strips').remove(strip)
    this.props.board.set('redraw', true)
    this.forceUpdate()
    this.initializeSortable()
    this.updateMaxedWidth()
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
        <li key={strip.cid}>
          <StripPanel id={key} strip={strip} removeStrip={this.removeStrip.bind(this)}></StripPanel>
        </li>
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

                <ol className="sortable-list">{Strips}</ol>
              </fieldset>
            </div>

            <div className="step-controls controls">
              <button type="button" className="btn btn-sm btn-primary" onClick={this.addStrip.bind(this)}><i className="fa fa-plus-circle"></i> Add Strip</button>
              &nbsp;
              <button type="button" className="btn btn-sm btn-primary" onClick={this.onNext.bind(this)}><i className="fa fa-arrow-right"></i> Next Step</button>

              <div className="warning">
                <span>
                  {this.state.maxedWidth ?
                  "Warning: the maximum width reached" :
                  "" }
                </span>
              </div>
            </div>

          </Step>

          <Step isActive={this.state.currentStep === 1} key={1}>
            <div className="step-content">
              <fieldset>
                <legend>Buttons & Nut Covers</legend>
                &hellip;
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
              <fieldset>
                <legend>Handle</legend>
                <HandlePicker board={board}></HandlePicker>
              </fieldset>

              <fieldset>
                <legend>Edge</legend>
                <EdgePicker board={board}></EdgePicker>
              </fieldset>

              <fieldset>
                <legend>Juice Groove</legend>
                <GroovePicker board={board}></GroovePicker>
              </fieldset>

              <fieldset>
                <legend>Feet</legend>
                <FeetPicker board={board}></FeetPicker>
              </fieldset>
            </div>

            <div className="step-controls controls">
              <button type="button" className="btn btn-sm btn-primary" onClick={this.onPrevious.bind(this)}><i className="fa fa-arrow-left"></i> Previous Step</button>
              &nbsp;
              <button type="button" className="btn btn-sm btn-primary" onClick={this.onNext.bind(this)}><i className="fa fa-arrow-right"></i> Next Step</button>
            </div>
          </Step>

          <Step isActive={this.state.currentStep === 3} key={3}>
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
