import React from 'react'
import ReactDOM from 'react-dom'

import woods from '../woods.json'

export default class StripPanel extends React.Component {
  render () {
    let wood = this.props.strip.get('wood')
    let woodObj = woods[wood] || 'Unknown'
    let classes = ['swatch', 'swatch-mini', wood].join(' ')
    let collapseTarget = 'collapse-' + this.props.id
    let collapseTargetId = '#' + collapseTarget

    return (
      <div className="panel-heading" role="tab" id="headingOne">
        <h4 className="panel-title">
          <a role="button" data-toggle="collapse" data-parent="#strip-list" href={collapseTargetId} aria-expanded="true" aria-controls={collapseTarget}>
            <i className="fa drag-handle fa-bars" aria-hidden="true"></i>
            {woodObj.name}
            <div className={classes}></div>
          </a>
        </h4>
      </div>
    )
  }
}
