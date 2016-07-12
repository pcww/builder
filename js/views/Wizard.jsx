import React from 'react'
import ReactDOM from 'react-dom'

import Step from 'views/Step.jsx'
import StripPanel from 'views/StripPanel.jsx'

export default class Wizard extends React.Component {
  render () {
    let Strips = this.props.data.strips.map((strip, key) => {
      return (
        <StripPanel size={strip.size} wood={strip.wood} key={key}></StripPanel>
      )
    })

    return (
      <div id="wizard">
        <Step heading="Step 3">
          <fieldset>
            <legend>Strip Length</legend>

            <input type="range" max="48" min="8" step="2" />
          </fieldset>

          <fieldset>
            <legend>Strips</legend>

            {Strips}
          </fieldset>
        </Step>
      </div>
    )
  }
}
