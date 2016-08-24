import React from 'react'
import classNames from 'classnames'

export default class Step extends React.Component {
  render () {
    let classes = classNames('step', {
      hidden: !this.props.isActive
    });

    return (
      <form className={classes}>
        {this.props.children}
      </form>
    )
  }
}
