import _ from 'underscore'
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import EndcapPicker from 'views/EndcapPicker.jsx'
import EdgePicker from 'views/EdgePicker.jsx'
import FeetPicker from 'views/FeetPicker.jsx'
import GroovePicker from 'views/GroovePicker.jsx'
import HandlePicker from 'views/HandlePicker.jsx'
import Step from 'views/Step.jsx'
import StepHeader from 'views/StepHeader.jsx'
import StripPanel from 'views/StripPanel.jsx'
import StripList from 'views/StripList.jsx'

import SummaryStep from 'views/SummaryStep.jsx'

import constants from '../constants.json'

const KEYS = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39
}

export default class Wizard extends React.Component {
  static get constants() {
    return wizardConstants
  }

  constructor(props) {
    super(props)

    this.onSortEnd = this.onSortEnd.bind(this)
    this.onSortMove = this.onSortMove.bind(this)
    this.onSortStart = this.onSortStart.bind(this)

    let currentStep

    this.stepHeadings = {
      '1': 'Design',
      '2': 'Endcaps',
      '3': 'Accessorize',
      '4': 'Board Summary'
    }

    this.minWidth = constants.MINIMUM_WIDTH

    if (props.step && (props.step > 0) && (props.step <= 4)) {
      currentStep = props.step - 1
    } else {
      currentStep = 0
    }

    this.state = {
      currentStep,
      stripsExpand: false,
      totalSteps: 4,
      firstStep: true,
      lastStep: false
    }
  }

  componentDidMount () {
    const THROTTLE_KEY_COMMANDS_IN_MS = 550

    const onHandleKeyPress = _.throttle(function(e) {
      var keyCode = e.keyCode;
      // console.log('--- HANDLE ARROW KEY PRESS ---')
      if (keyCode == KEYS.ARROW_LEFT) this.onPrevious()
      else if (keyCode == KEYS.ARROW_RIGHT)  this.onNext()
    }, THROTTLE_KEY_COMMANDS_IN_MS, {trailing: false})
    window.addEventListener('keydown', onHandleKeyPress.bind(this), false)
  }

  onNext () {
    let nextStep = this.state.currentStep + 1
    let isLastStep = (nextStep === (this.state.totalSteps-1))
    let isFirstStep = (nextStep === 0)

    if (nextStep < this.state.totalSteps) {
      this.setState({
        currentStep: nextStep,
        firstStep: isFirstStep,
        lastStep: isLastStep
      })
    }
  }

  onPrevious () {
    let previousStep = this.state.currentStep - 1
    let isLastStep = (previousStep === (this.state.totalSteps-1))
    let isFirstStep = (previousStep === 0)

    if (previousStep >= 0) {
      this.setState({
        currentStep: previousStep,
        firstStep: isFirstStep,
        lastStep: isLastStep
      })
    }
  }

  onSortEnd ({ newIndex, oldIndex }) {
    const strips = this.props.board.get('strips')
    const { draggedStrip } = this.state

    strips.remove(draggedStrip, { silent: true })
    strips.add(draggedStrip, { at: newIndex })

    draggedStrip.set('moving', false)

    this.swapDirection = null
    this.swapping = null
    this.y = null
    this.setState({ draggedStrip: null })
  }

  onSortMove ({ screenY, target }) {
    const previousSwapdirection = this.swapDirection
    let cid = null

    this.swapDirection = screenY > this.y ? 'down' : 'up'
    this.y = screenY

    if (target.classList.contains('panel') || target.classList.contains('panel-heading')) {
      cid = target.getAttribute('data-cid')
    }

    if (cid) {
      if ((previousSwapdirection === this.swapDirection) && (this.swapping === cid)) { return }

      const strips = this.props.board.get('strips')

      const relatedStrip = strips.get({ cid })
      const relatedStripIndex = strips.indexOf(relatedStrip)
      const { draggedStrip } = this.state

      this.swapping = cid

      strips.remove(draggedStrip, { silent: true })
      strips.add(draggedStrip, { at: relatedStripIndex })
    }
  }

  onSortStart ({ index }, { screenY }) {
    const draggedStrip = this.props.board.get('strips').at(index)

    draggedStrip.set('moving', true)

    this.y = screenY

    this.setState({ draggedStrip: draggedStrip })
  }

  onStripLengthChanged (event) {
    this.props.board.set('length', event.currentTarget.value)
  }

  addStrip () {
    let strips = this.props.board.get('strips')
    strips.add({
      size: 'large',
      wood: 'maple'
    })
    this.forceUpdate()
  }

  removeStrip (strip) {
    this.props.board.get('strips').remove(strip)
    this.props.board.set('redraw', true)
    this.forceUpdate()
  }

  onToggleStripsExpand () {
    if (this.state.stripsExpand) {
      $('.panel-collapse.collapse').collapse('hide')
    } else {
      $('.panel-collapse.collapse').collapse('show')
    }

    this.setState({ stripsExpand: !this.state.stripsExpand })
  }

  render () {
    let board = this.props.board
    let order = this.props.order
    let strips = board.get('strips')

    let expandClass = classNames('fa', {
      'fa-plus': !this.state.stripsExpand,
      'fa-minus': this.state.stripsExpand
    })

    if (this.props.preview) {
      return (
        <menu className="wizard preview" type="toolbar">
          <StepHeader
            heading={'Order Sumary'}
            onNext={this.onNext.bind(this)}
            onPrevious={this.onPrevious.bind(this)}
            preview={this.props.preview}
            firstStep={this.state.firstStep}
            lastStep={this.state.lastStep}>
          </StepHeader>

          <div className="steps">
            <Step isActive={true} key={1}>
              <SummaryStep isSocialMediaIngress={this.props.isSocialMediaIngress} preview={this.props.preview} board={board} order={order} showMaterialsModal={this.props.showMaterialsModal}></SummaryStep>
            </Step>
          </div>
        </menu>
      )

    } else {
      return (
        <menu className="wizard" type="toolbar">
          <StepHeader
            heading={'Step ' + (this.state.currentStep + 1) + ': ' + this.stepHeadings[this.state.currentStep + 1]}
            onNext={this.onNext.bind(this)}
            onPrevious={this.onPrevious.bind(this)}
            firstStep={this.state.firstStep}
            lastStep={this.state.lastStep}>
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
                    step="1"
                    defaultValue={board.get('length')}
                    onChange={this.onStripLengthChanged.bind(this)} />
                </fieldset>

                <fieldset>
                  <legend>Board Strips <button type="button" className="btn btn-link pull-right" onClick={this.onToggleStripsExpand.bind(this)}><i className={expandClass} aria-hidden="true"></i></button></legend>

                  { !strips.length &&
                    <div className="alert alert-warning">
                      <h4>Add Some Strips</h4>
                      <p>Looks like you're starting from scratch!</p>
                      <p>Add some wood strips with the <button type="button" className="btn btn-sm btn-warning" onClick={this.addStrip.bind(this)}><i className="fa fa-plus-circle"></i> Add Strip</button> button below.</p>
                    </div>
                  }

                  <StripList
                    lockAxis="y"
                    lockToContainerEdges
                    onSortEnd={this.onSortEnd}
                    onSortMove={this.onSortMove}
                    onSortStart={this.onSortStart}
                    removeStrip={this.removeStrip.bind(this)}
                    strips={strips}
                    useDragHandle />
                </fieldset>
              </div>

              <div className="step-controls controls">
                <button type="button" className="btn btn-sm btn-warning" onClick={this.addStrip.bind(this)}><i className="fa fa-plus-circle"></i> Add Strip</button>
                &nbsp;
                <button type="button" className="btn btn-sm btn-primary" onClick={this.onNext.bind(this)}>Next Step <i className="fa fa-arrow-right"></i></button>
              </div>
            </Step>

            <Step isActive={this.state.currentStep === 1} key={1}>
              <div className="step-content">
                <EndcapPicker board={board}></EndcapPicker>
              </div>

              <div className="step-controls controls">
                <button type="button" className="btn btn-sm btn-primary" onClick={this.onPrevious.bind(this)}><i className="fa fa-arrow-left"></i> Previous Step</button>
                &nbsp;
                <button type="button" className="btn btn-sm btn-primary" onClick={this.onNext.bind(this)}>Next Step <i className="fa fa-arrow-right"></i></button>
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
                <button type="button" className="btn btn-sm btn-primary" onClick={this.onNext.bind(this)}>Next Step <i className="fa fa-arrow-right"></i></button>
              </div>
            </Step>

            <Step isActive={this.state.currentStep === 3} key={3}>
              <SummaryStep board={board} order={order}></SummaryStep>

              <div className="step-controls controls">
                <button type="button" className="btn btn-sm btn-primary" onClick={this.onPrevious.bind(this)}><i className="fa fa-arrow-left"></i> Previous Step</button>
                &nbsp;
                <button type="button" className="btn btn-sm btn-warning" onClick={this.props.onSubmit}><i className="fa fa-envelope-o" aria-hidden="true"></i> Submit Quote</button>
              </div>
            </Step>
          </div>
        </menu>
      )
    }
  }
}
