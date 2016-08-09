import React from 'react'
import ReactDOM from 'react-dom'

import Step from 'views/Step.jsx'
import StripPanel from 'views/StripPanel.jsx'

export default class Wizard extends React.Component {
  render () {
    let Strips = this.props.board.get('strips').map((strip, key) => {
      return (
        <StripPanel id={key} size={strip.size} wood={strip.wood} key={key}></StripPanel>
      )
    })

    return (
      <menu className="wizard" type="toolbar">
        <Step heading="Step 1">
          <fieldset>
            <legend>Strip Length</legend>

            <input type="range" max="48" min="8" step="2" defaultValue={this.props.width} />
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
