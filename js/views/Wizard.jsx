import _ from 'underscore'
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import Sortable from '../../bower_components/Sortable/Sortable.min.js'

import Step from 'views/Step.jsx'
import StepHeader from 'views/StepHeader.jsx'
import StripPanel from 'views/StripPanel.jsx'
import EndcapPicker from 'views/EndcapPicker.jsx'
import HandlePicker from 'views/HandlePicker.jsx'
import EdgePicker from 'views/EdgePicker.jsx'
import GroovePicker from 'views/GroovePicker.jsx'
import FeetPicker from 'views/FeetPicker.jsx'

import SummaryStep from 'views/SummaryStep.jsx'

import constants from '../constants.json'

export default class Wizard extends React.Component {
  static get constants() {
    return wizardConstants
  }

  constructor(props) {
    super(props)
    this.stepHeadings = {
      '1': 'Design',
      '2': 'Endcaps',
      '3': 'Accessorize',
      '4': 'Board Summary'
    }
    this.minWidth = constants.MINIMUM_WIDTH
  }

  componentWillMount () {
    this.state = {
      allGrain: false,
      allGrainAligned: false,
      currentStep: 0,
      peakedWidth: false,
      stripsExpand: false,
      totalSteps: 4
    }
  }

  componentDidMount () {
    this.initializeSortable()
  }

  initializeSortable () {
    if (this.sortable) {
      this.sortable.destroy()
    }

    this.sortable = Sortable.create(document.querySelector('.sortable-list'), {
      animation: 150,
      delay: 0,
      handle: '.drag-handle',
      onEnd: (event) => {
        let strips = this.props.board.get('strips')

        strips.forEach((strip) => {
          strip.set('moving', false)
        })
      },
      onMove: (event) => {
        let strips = this.props.board.get('strips')
        let stripsArray = strips.toJSON()

        // Dragged strip details
        let draggedRect = event.draggedRect
        let draggedStrip = event.dragged
        let draggedStripId = parseInt(draggedStrip.getAttribute('data-id'))
        let draggedStripModel = _.findWhere(stripsArray, {id: draggedStripId})
        let draggedStripIndex = _.indexOf(stripsArray, draggedStripModel)

        // Related strip details
        let relatedRect = event.relatedRect
        let relatedStrip = event.related
        let relatedStripId = parseInt(relatedStrip.getAttribute('data-id'))
        let relatedStripModel = _.findWhere(stripsArray, {id: relatedStripId})
        let relatedStripIndex = _.indexOf(stripsArray, relatedStripModel)

        stripsArray = _.without(stripsArray, draggedStripModel)
        stripsArray.splice(relatedStripIndex, 0, draggedStripModel)
        strips.reset(stripsArray)

        this.setState({})
      },
      onStart: (event) => {
        let oldIndex = event.oldIndex
        let strips = this.props.board.get('strips')
        let strip = strips.at(oldIndex)

        strip.set('moving', true)
        strip.set('endGrain', 'end-grain-no')
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
    this.props.board.set('length', event.currentTarget.value)
    this.minWidthFlag()
  }

  minWidthFlag () {
    this.setState({ peakedWidth: (this.props.board._currentWidth() < this.minWidth) })
  }

  addStrip () {
    let strips = this.props.board.get('strips')
    strips.add({
      id: strips.length,
      endGrain: 'end-grain-no',
      size: 'large',
      wood: 'maple'
    })
    this.forceUpdate()
    this.initializeSortable()
    this.minWidthFlag()
  }

  removeStrip (strip) {
    this.props.board.get('strips').remove(strip)
    this.props.board.set('redraw', true)
    this.forceUpdate()
    this.initializeSortable()
    this.minWidthFlag()
  }

  onToggleStripsExpand () {
    if (this.state.stripsExpand) {
      $('.panel-collapse.collapse').collapse('hide')
    } else {
      $('.panel-collapse.collapse').collapse('show')
    }

    this.setState({ stripsExpand: !this.state.stripsExpand })
  }

  onSubmitOrder () {
    window.alert('Order Submitted!')
  }

  onGrainSelectAll (state) {
    this.selectAllEndGrain(state)

    this.setState({
      allGrain: state,
      allGrainAligned: true
    })
  }

  selectAllEndGrain (state) {
    let endGrain = state ? 'end-grain-yes' : 'end-grain-no'
    this.props.board.get('strips').forEach((strip) => {
      strip.set('endGrain', endGrain)
    })
  }

  checkGrainAlignment () {
    let strips = this.props.board.get('strips')

    let values = strips.map((strip) => {
      return strip.get('endGrain')
    })

    let uniqueValues = _.uniq(values)
    let result = uniqueValues.length < 2

    this.setState({allGrainAligned: result})
  }

  render () {
    let board = this.props.board
    let canRemoveStrip = !!(this.props.board.get('strips').length > constants.MINIMUM_NUMBER_STRIPS)

    let Strips = board.get('strips').map((strip, key) => {
      return (
        <li className="panel panel-default" data-id={strip.get('id')} key={strip.get('id')}>
          <StripPanel key={strip.cid} id={key} strip={strip} canRemoveStrip={canRemoveStrip} removeStrip={this.removeStrip.bind(this)} checkGrainAlignment={this.checkGrainAlignment.bind(this)}></StripPanel>
        </li>
      )
    })

    let expandClass = classNames('fa', {
      'fa-plus': !this.state.stripsExpand,
      'fa-minus': this.state.stripsExpand
    });

    let currentWidth = this.props.board._currentWidth()
    let currentWidthText = this.state.peakedWidth ?  "Width: " + currentWidth + "\""   : ""
    let minimumWidthText = this.state.peakedWidth ?  " | Min Width: " + this.minWidth + "\""  : ""

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
                  defaultValue={board.get('length')}
                  onChange={this.onStripLengthChanged.bind(this)} />
              </fieldset>

              <fieldset>
                <legend>End Grain Selection</legend>
                <label className="radio-inline" data-toggle="tooltip" title="End Grain Selected">
                  <input
                    checked={this.state.allGrain && this.state.allGrainAligned}
                    id="selectAllEndGrain"
                    name="allEndGrainRadioGroupName"
                    type="radio"
                    value="all-end-grain-yes"
                    onClick={this.onGrainSelectAll.bind(this, true)} />
                  Yes
                </label>

                <label className="radio-inline" data-toggle="tooltip" title="End Grain Selected">
                  <input
                    checked={!this.state.allGrain && this.state.allGrainAligned}
                    id="deselectAllEndGrain"
                    name="allEndGrainRadioGroupName"
                    type="radio"
                    value="all-end-grain-yes"
                    onClick={this.onGrainSelectAll.bind(this, false)} />
                  No
                </label>
              </fieldset>

              <fieldset>
                <legend>Board Strips <button type="button" className="btn btn-link pull-right" onClick={this.onToggleStripsExpand.bind(this)}><i className={expandClass} aria-hidden="true"></i></button></legend>

                <ol id="strip-list" className="sortable-list panel-group" role="tablist" aria-multiselectable="true">{Strips}</ol>
              </fieldset>
            </div>

            <div className="step-controls controls">
              <button type="button" className="btn btn-sm btn-primary" onClick={this.addStrip.bind(this)}><i className="fa fa-plus-circle"></i> Add Strip</button>
              &nbsp;
              <button type="button" className="btn btn-sm btn-primary" onClick={this.onNext.bind(this)}><i className="fa fa-arrow-right"></i> Next Step</button>

              <div className="warning">
                <span className="current">
                  {currentWidthText}
                </span>
                <span className="minimum">
                  {minimumWidthText}
                </span>
              </div>
            </div>

          </Step>

          <Step isActive={this.state.currentStep === 1} key={1}>
            <div className="step-content">
              <EndcapPicker board={board}></EndcapPicker>
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
            <SummaryStep board={board}></SummaryStep>

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
