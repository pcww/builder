import React from 'react'
import ReactDOM from 'react-dom'

import StripHeader from 'views/StripHeader.jsx'
import WoodPicker from 'views/WoodPicker.jsx'

export default class StripPanel extends React.Component {
  onSizeChange (event) {
    this.props.strip.set('size', event.currentTarget.value)
    this.forceUpdate()
  }

  onGrainSelection (event) {
    this.props.strip.set('endGrain', event.currentTarget.value)
    this.props.checkGrainAlignment()
    this.forceUpdate()
  }

  render () {
    let headingTarget = 'heading-' + this.props.id
    let collapseTarget = 'collapse-' + this.props.id
    let radioGroupPrefix = 'strip-' + this.props.id
    let endGrainRadioGroupName = radioGroupPrefix + '-end-grain'
    let radioGroupName = radioGroupPrefix + '-wood-size'

    return (
      <div>
        <StripHeader data-id={this.props.strip.get('data-id')} id={this.props.id} strip={this.props.strip} />

        <div id={collapseTarget} className="panel-collapse collapse" role="tabpanel" aria-labelledby={headingTarget}>
          <div className="panel-body">
            <fieldset>
              <legend>Wood Type</legend>

              <WoodPicker strip={this.props.strip} updateState={this.setState.bind(this)}/>
            </fieldset>

            <fieldset>
              <legend>End Grain</legend>

              <label className="radio-inline" data-toggle="tooltip" title="End Grain Selected">
                <input
                  checked={this.props.strip.get('endGrain') === 'end-grain-yes'}
                  id={radioGroupPrefix + '-end-grain-yes'}
                  name={endGrainRadioGroupName}
                  type="radio"
                  value="end-grain-yes"
                  onChange={this.onGrainSelection.bind(this)} />
                Yes
              </label>

              <label className="radio-inline" data-toggle="tooltip" title="End Grain Deselected">
                <input
                  checked={this.props.strip.get('endGrain') === 'end-grain-no'}
                  id={radioGroupPrefix + '-end-grain-no'}
                  name={endGrainRadioGroupName}
                  type="radio"
                  value="end-grain-no"
                  onChange={this.onGrainSelection.bind(this)} />
                No
              </label>
            </fieldset>

            <fieldset>
              <legend>Strip Width</legend>

              <label className="radio-inline" data-toggle="tooltip" title="Extra-Extra Small &mdash; 1/4&quot;">
                <input
                  checked={this.props.strip.get('size') === 'xxsmall'}
                  id={radioGroupPrefix + '-size-1'}
                  name={radioGroupName}
                  type="radio"
                  value="xxsmall"
                  onChange={this.onSizeChange.bind(this)} />
                XXS
              </label>

              <label className="radio-inline" data-toggle="tooltip" title="Extra Small &mdash; 3/8&quot;">
                <input
                  checked={this.props.strip.get('size') === 'xsmall'}
                  id={radioGroupPrefix + '-size-2'}
                  name={radioGroupName}
                  type="radio"
                  value="xsmall"
                  onChange={this.onSizeChange.bind(this)} />
                XS
              </label>

              <label className="radio-inline" data-toggle="tooltip" title="Small &mdash; 1/2&quot;">
                <input
                  checked={this.props.strip.get('size') === 'small'}
                  id={radioGroupPrefix + '-size-3'}
                  name={radioGroupName}
                  type="radio"
                  value="small"
                  onChange={this.onSizeChange.bind(this)} />
                S
              </label>

              <label className="radio-inline" data-toggle="tooltip" title="Medium &mdash; 5/8&quot;">
                <input
                  checked={this.props.strip.get('size') === 'medium'}
                  id={radioGroupPrefix + '-size-4'}
                  name={radioGroupName}
                  type="radio"
                  value="medium"
                  onChange={this.onSizeChange.bind(this)} />
                M
              </label>

              <label className="radio-inline" data-toggle="tooltip" title="Large &mdash; 1&quot;">
                <input
                  checked={this.props.strip.get('size') === 'large'}
                  id={radioGroupPrefix + '-size-5'}
                  name={radioGroupName}
                  type="radio"
                  value="large"
                  onChange={this.onSizeChange.bind(this)} />
                L
              </label>
            </fieldset>

            <hr/>
            <button type="button" className="btn btn-link remove-strip" disabled={!this.props.canRemoveStrip} onClick={this.props.removeStrip.bind(this, this.props.strip)}>remove strip</button>

          </div>
        </div>
      </div>
    )
  }
}
