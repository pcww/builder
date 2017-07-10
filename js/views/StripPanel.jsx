import React from 'react'
import ReactDOM from 'react-dom'
import StripHeader from 'views/StripHeader.jsx'
import WoodPicker from 'views/WoodPicker.jsx'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

export default class StripPanel extends React.Component {
  onSizeChange (event) {
    this.props.strip.set('size', event.currentTarget.value)
    this.forceUpdate()
  }

  render () {
    let headingTarget = 'heading-' + this.props.id
    let collapseTarget = 'collapse-' + this.props.id
    let radioGroupPrefix = 'strip-' + this.props.id
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
              <legend>Strip Width</legend>

              <OverlayTrigger key={this.props.id+'xxsmall'} placement="top" overlay={<Tooltip id="tooltip">Extra-Extra Small &mdash; 1/4&quot;</Tooltip>}>
                <label className="radio-inline">
                  <input
                    checked={this.props.strip.get('size') === 'xxsmall'}
                    id={radioGroupPrefix + '-size-1'}
                    name={radioGroupName}
                    type="radio"
                    value="xxsmall"
                    onChange={this.onSizeChange.bind(this)} />
                  XXS
                </label>
              </OverlayTrigger>

              <OverlayTrigger key={this.props.id+'xsmall'} placement="top" overlay={<Tooltip id="tooltip">Extra Small &mdash; 3/8&quot;</Tooltip>}>
                <label className="radio-inline">
                  <input
                    checked={this.props.strip.get('size') === 'xsmall'}
                    id={radioGroupPrefix + '-size-2'}
                    name={radioGroupName}
                    type="radio"
                    value="xsmall"
                    onChange={this.onSizeChange.bind(this)} />
                  XS
                </label>
              </OverlayTrigger>

              <OverlayTrigger key={this.props.id+'small'} placement="top" overlay={<Tooltip id="tooltip">Small &mdash; 1/2&quot;</Tooltip>}>
                <label className="radio-inline">
                  <input
                    checked={this.props.strip.get('size') === 'small'}
                    id={radioGroupPrefix + '-size-3'}
                    name={radioGroupName}
                    type="radio"
                    value="small"
                    onChange={this.onSizeChange.bind(this)} />
                  S
                </label>
              </OverlayTrigger>

              <OverlayTrigger key={this.props.id+'medium'} placement="top" overlay={<Tooltip id="tooltip">Medium &mdash; 5/8&quot;</Tooltip>}>
                <label className="radio-inline">
                  <input
                    checked={this.props.strip.get('size') === 'medium'}
                    id={radioGroupPrefix + '-size-4'}
                    name={radioGroupName}
                    type="radio"
                    value="medium"
                    onChange={this.onSizeChange.bind(this)} />
                  M
                </label>
              </OverlayTrigger>

              <OverlayTrigger key={this.props.id+'large'} placement="top" overlay={<Tooltip id="tooltip">Large &mdash; 1&quot;</Tooltip>}>
                <label className="radio-inline">
                  <input
                    checked={this.props.strip.get('size') === 'large'}
                    id={radioGroupPrefix + '-size-5'}
                    name={radioGroupName}
                    type="radio"
                    value="large"
                    onChange={this.onSizeChange.bind(this)} />
                  L
                </label>
              </OverlayTrigger>

            </fieldset>

            <hr/>
            <button type="button" className="btn btn-link remove-strip" disabled={!this.props.canRemoveStrip} onClick={this.props.removeStrip.bind(this, this.props.strip)}>remove strip</button>

          </div>
        </div>
      </div>
    )
  }
}
