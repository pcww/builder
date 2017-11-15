import React from 'react'
import ReactDOM from 'react-dom'

import woods from '../woods.json'

export default class StripPanel extends React.Component {
  render () {
    let key = this.props.strip.cid
    let headingTarget = `heading-${key}`
    let collapseTarget = `collapse-${key}`
    let collapseTargetId = `#${collapseTarget}`
    let wood = this.props.strip.get('wood')
    let woodObj = woods[wood] || 'Unknown'
    let classes = ['swatch', 'swatch-mini', wood].join(' ')

    return (
      <div className="panel-heading" role="tab" id={headingTarget}>
        <h4 className="panel-title">
          <i className="fa drag-handle fa-bars" aria-hidden="true"></i>

          <a role="button" data-toggle="collapse" data-parent="#strip-list" href={collapseTargetId} aria-expanded="true" aria-controls={collapseTarget}>
            {woodObj.name}
            <div className={classes}></div>
          </a>
        </h4>
      </div>
    )
  }
}
