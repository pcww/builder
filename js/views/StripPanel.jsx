import React from 'react'
import ReactDOM from 'react-dom'

import StripHeader from 'views/StripHeader.jsx'
import WoodPicker from 'views/WoodPicker.jsx'

export default class StripPanel extends React.Component {
  render () {
    let collapseTarget = 'collapse-' + this.props.id

    return (
      <div className="panel-group" id="strip-list" role="tablist" aria-multiselectable="true">
        <div className="panel panel-default">
          <StripHeader id={this.props.id} wood={this.props.wood} />

          <div id={collapseTarget} className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div className="panel-body">
              <fieldset>
                <legend>Wood Type</legend>

                <WoodPicker currentWood={this.props.wood} />
              </fieldset>

              <fieldset>
                <legend>Strip Width</legend>

                <label className="radio-inline">
                  <input id="strip-size-1" name="wood-size" type="radio" defaultValue="xsmall" defaultChecked="checked" />
                  Extra Extra Small
                </label>

                <label className="radio-inline">
                  <input id="strip-size-1" name="wood-size" type="radio" defaultValue="small" />
                  Extra Small
                </label>

                <label className="radio-inline">
                  <input id="strip-size-1" name="wood-size" type="radio" defaultValue="small" />
                  Small
                </label>

                <label className="radio-inline">
                  <input id="strip-size-1" name="wood-size" type="radio" defaultValue="medium" />
                  Medium
                </label>

                <label className="radio-inline">
                  <input id="strip-size-1" name="wood-size" type="radio" defaultValue="large" />
                  Large
                </label>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
