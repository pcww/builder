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
                  <input
                    checked={this.props.size === 'xxsmall'}
                    id={'strip-' +  + this.props.id + '-size-1'}
                    name={'strip-' + this.props.id + '-wood-size'}
                    type="radio"
                    value="xxsmall"
                    defaultChecked={true} />
                  Extra Extra Small
                </label>

                <label className="radio-inline">
                  <input
                    checked={this.props.size === 'xsmall'}
                    id={'strip-' +  + this.props.id + '-size-2'}
                    name={'strip-' + this.props.id + '-wood-size'}
                    type="radio"
                    value="xsmall" />
                  Extra Small
                </label>

                <label className="radio-inline">
                  <input
                    checked={this.props.size === 'small'}
                    id={'strip-' +  + this.props.id + '-size-3'}
                    name={'strip-' + this.props.id + '-wood-size'}
                    type="radio"
                    value="small" />
                  Small
                </label>

                <label className="radio-inline">
                  <input
                    checked={this.props.size === 'medium'}
                    id={'strip-' +  + this.props.id + '-size-4'}
                    name={'strip-' + this.props.id + '-wood-size'}
                    type="radio"
                    value="medium" />
                  Medium
                </label>

                <label className="radio-inline">
                  <input
                    checked={this.props.size === 'large'}
                    id={'strip-' +  + this.props.id + '-size-5'}
                    name={'strip-' + this.props.id + '-wood-size'}
                    type="radio"
                    value="large" />
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
