import React from 'react'
import ReactDOM from 'react-dom'

import Step from 'views/Step.jsx'
import StripPanel from 'views/StripPanel.jsx'

export default class Wizard extends React.Component {
  onStripLengthChanged (event) {
    this.props.board.set('width', event.currentTarget.value)
  }

  render () {
    let board = this.props.board

    let Strips = board.get('strips').map((strip, key) => {
      return (
        <StripPanel id={key} strip={strip} key={key}></StripPanel>
      )
    })

    let steps = [
      { name: 'Step 3', active: true },
      { name: 'Step 4', active: false },
      { name: 'Summary', active: false }
    ]

    return (
      <menu className="wizard" type="toolbar">
        <Step index="0" steps={steps}>
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
        </Step>

        <Step index="1" steps={steps}>
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

        <Step index="2" steps={steps}>
          Order Summary
        </Step>
      </menu>
    )
  }
}
