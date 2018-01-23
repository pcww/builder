import React from 'react'
import ReactDOM from 'react-dom'
import StripHeader from 'views/StripHeader.jsx'
import WoodPicker from 'views/WoodPicker.jsx'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { SortableElement } from 'react-sortable-hoc'





class StripPanel extends React.Component {
  onSizeChange (event) {
    this.props.strip.set('size', event.currentTarget.value)
    this.forceUpdate()
  }

  render () {
    let headingTarget = 'heading-' + this.props.cid
    let collapseTarget = 'collapse-' + this.props.cid
    let radioGroupPrefix = 'strip-' + this.props.cid
    let radioGroupName = radioGroupPrefix + '-wood-size'

    return (
      <li
        className="panel panel-default"
        data-cid={this.props.cid}>
        <StripHeader data-id={this.props.cid} id={this.props.cid} strip={this.props.strip} />

        <div id={collapseTarget} className="panel-collapse collapse" role="tabpanel" aria-labelledby={headingTarget}>
          <div className="panel-body">
            <fieldset>
              <legend>Wood Type</legend>

              <WoodPicker strip={this.props.strip} updateState={this.setState.bind(this)}/>
            </fieldset>

            <fieldset>
              <legend>Strip Width</legend>

              <OverlayTrigger key={this.props.cid+'xxsmall'} placement="top" overlay={<Tooltip id="tooltip">Extra-Extra Small &mdash; 1/4&quot;</Tooltip>}>
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

              <OverlayTrigger key={this.props.cid+'xsmall'} placement="top" overlay={<Tooltip id="tooltip">Extra Small &mdash; 3/8&quot;</Tooltip>}>
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

              <OverlayTrigger key={this.props.cid+'small'} placement="top" overlay={<Tooltip id="tooltip">Small &mdash; 1/2&quot;</Tooltip>}>
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

              <OverlayTrigger key={this.props.cid+'medium'} placement="top" overlay={<Tooltip id="tooltip">Medium &mdash; 5/8&quot;</Tooltip>}>
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

              <OverlayTrigger key={this.props.cid+'large'} placement="top" overlay={<Tooltip id="tooltip">Large &mdash; 1&quot;</Tooltip>}>
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

              <OverlayTrigger key={this.props.cid+'xlarge'} placement="top" overlay={<Tooltip id="tooltip">Extra Large &mdash; 1.5&quot;</Tooltip>}>
                <label className="radio-inline">
                  <input
                    checked={this.props.strip.get('size') === 'xlarge'}
                    id={radioGroupPrefix + '-size-6'}
                    name={radioGroupName}
                    type="radio"
                    value="xlarge"
                    onChange={this.onSizeChange.bind(this)} />
                  XL
                </label>
              </OverlayTrigger>

            </fieldset>

            <hr/>
            <button type="button" className="btn btn-link remove-strip" disabled={!this.props.canRemoveStrip} onClick={this.props.removeStrip.bind(this, this.props.strip)}>remove strip</button>
          </div>
        </div>
      </li>
    )
  }
}





export default SortableElement(StripPanel)