import React from 'react'
import ReactDOM from 'react-dom'
import { SortableHandle } from 'react-sortable-hoc'

import woods from '../woods.json'





const DragHandle = SortableHandle(() => (
  <i className="fa drag-handle fa-bars" aria-hidden="true" />
))





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
      <div
        className="panel-heading"
        data-cid={this.props.strip.cid}
        id={headingTarget}
        role="tab">
        <h4 className="panel-title">
          <DragHandle />

          <a role="button" data-toggle="collapse" data-parent="#strip-list" href={collapseTargetId} aria-expanded="true" aria-controls={collapseTarget}>
            {woodObj.name}
            <div className={classes}></div>
          </a>
        </h4>
      </div>
    )
  }
}
