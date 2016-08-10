import React from 'react'
import ReactDOM from 'react-dom'

import StripHeader from 'views/StripHeader.jsx'
import WoodPicker from 'views/WoodPicker.jsx'

export default class StripPanel extends React.Component {
  onSizeChange (event) {
    let value = event.currentTarget.value

    this.setState({
      size: value
    })

    this.props.strip.set('size', value)
  }

  render () {
    let collapseTarget = 'collapse-' + this.props.id
    let radioGroupPrefix = 'strip-' + this.props.id
    let radioGroupName = radioGroupPrefix + '-wood-size'

    return (
      <div className="panel-group strip-list" role="tablist" aria-multiselectable="true">
        <div className="panel panel-default">
          <StripHeader id={this.props.id} wood={this.props.wood} />

          <div id={collapseTarget} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
            <div className="panel-body">
              <fieldset>
                <legend>Wood Type</legend>

                <WoodPicker currentWood={this.props.wood} />
              </fieldset>

              <fieldset>
                <legend>Strip Width</legend>

                <label className="radio-inline">
                  <input
                    checked={this.props.strip.get('size') === 'xxsmall'}
                    id={radioGroupPrefix + '-size-1'}
                    name={radioGroupName}
                    type="radio"
                    value="xxsmall"
                    onChange={this.onSizeChange.bind(this)} />
                  Extra Extra Small
                </label>

                <label className="radio-inline">
                  <input
                    checked={this.props.strip.get('size') === 'xsmall'}
                    id={radioGroupPrefix + '-size-2'}
                    name={radioGroupName}
                    type="radio"
                    value="xsmall"
                    onChange={this.onSizeChange.bind(this)} />
                  Extra Small
                </label>

                <label className="radio-inline">
                  <input
                    checked={this.props.strip.get('size') === 'small'}
                    id={radioGroupPrefix + '-size-3'}
                    name={radioGroupName}
                    type="radio"
                    value="small"
                    onChange={this.onSizeChange.bind(this)} />
                  Small
                </label>

                <label className="radio-inline">
                  <input
                    checked={this.props.strip.get('size') === 'medium'}
                    id={radioGroupPrefix + '-size-4'}
                    name={radioGroupName}
                    type="radio"
                    value="medium"
                    onChange={this.onSizeChange.bind(this)} />
                  Medium
                </label>

                <label className="radio-inline">
                  <input
                    checked={this.props.strip.get('size') === 'large'}
                    id={radioGroupPrefix + '-size-5'}
                    name={radioGroupName}
                    type="radio"
                    value="large"
                    onChange={this.onSizeChange.bind(this)} />
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
