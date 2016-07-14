import React from 'react'
import ReactDOM from 'react-dom'

export default class StripPanel extends React.Component {
  render () {
    let classes = ['swatch', 'swatch-mini', this.props.wood].join(' ')
    let collapseTarget = 'collapse-' + this.props.id
    let collapseTargetId = '#' + collapseTarget

    return (
      <div className="panel-heading" role="tab" id="headingOne">
        <h4 className="panel-title">
          <a role="button" data-toggle="collapse" data-parent="#strip-list" href={collapseTargetId} aria-expanded="true" aria-controls={collapseTarget}>
            <i className="fa drag-handle fa-bars" aria-hidden="true"></i>
            {this.props.wood}
            <div className={classes}></div>
          </a>
        </h4>
      </div>
    )
  }
}
