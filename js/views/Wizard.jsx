import React from 'react'
import ReactDOM from 'react-dom'

import Step from 'views/Step.jsx'
import StripPanel from 'views/StripPanel.jsx'

export default class Wizard extends React.Component {
  render () {
    let board = this.props.board

    let Strips = board.get('strips').map((strip, key) => {
      return (
        <StripPanel id={key} strip={strip} size={strip.get('size')} wood={strip.get('wood')} key={key}></StripPanel>
      )
    })

    return (
      <menu className="wizard" type="toolbar">
        <Step heading="Step 1">
          <fieldset>
            <legend>Strip Length</legend>

            <input type="range" max="48" min="8" step="2" defaultValue={board.get('width')} />
          </fieldset>

          <fieldset>
            <legend>Strips</legend>

            {Strips}
          </fieldset>
        </Step>
      </menu>
    )
  }
}
