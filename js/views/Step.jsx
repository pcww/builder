import React from 'react'
import classNames from 'classnames'

export default class Step extends React.Component {
  render () {
    let classes = classNames('step-container', {
      current: this.props.isActive
    });

    return (
      <div className={classes}>
        <form className="step">
          {this.props.children}
        </form>
      </div>
    )
  }
}
