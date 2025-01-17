import React from 'react'
import classNames from 'classnames'

export default class HeaderBar extends React.Component {
  render () {

    return (
      <div aria-label="Pine Cliff Woodworks" role="banner">
        <a href="https://pinecliffwoodworks.com"><img src="/assets/misc/pcw-logo-with-text.png" alt="Pine Cliff Woodworks Logo"/></a>
        <a className="btn btn-default" href="http://pinecliffwoodworks.com/board-shop"><i className="fa fa-chevron-left" aria-hidden="true"></i> Back to Shop</a>
      </div>
    )
  }
}
