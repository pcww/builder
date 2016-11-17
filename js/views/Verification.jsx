import React from 'react'
import classNames from 'classnames'
import OrderModel from 'models/Order'

import woods from '../woods.json'

export default class Verification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false,
      loaded: false,
      verified: false,
      order: new OrderModel({
        id: this.props.id,
        hash: this.props.hash
      }),
      state: 'loading'
    }

    window.order = this.state.order
  }

  componentWillMount () {
    let order = this.state.order

    this.request = order.fetch()
    .done(() => {
      let verified = order.get('verified')

      this.setState({
        state: verified ? 'verified' : 'loaded'
      })

      if (!verified) {
        order.verify()
        .done(() => {
          this.setState({
            state: verified ? 'verified' : 'loaded'
          })
        })
        .error(() => {
          this.setState({
            state: 'error'
          })
        })
      }
    })
    .error(() => {
      this.setState({
        state: 'error'
      })
    })
  }

  errorState () {
    return (
      <div className="loading">
        <img src="/assets/misc/pcw-logo.png"/>
        <p>Sorry, there was a problem verifying your order. Please try again later or email us at <a href="mailto:tech@pinecliffwoodworks.com">tech@pinecliffwoodworks.com</a>.</p>
      </div>
    )
  }

  loadedState () {
    return (
      <div className="loading">
        <img src="/assets/misc/pcw-logo.png"/>
        <p>{order.get('name')}, we're verifying your order!</p>
        <img src="/assets/misc/loading-ring.svg" />
      </div>
    )
  }

  loadingState () {
    return (
      <div className="loading">
        <img src="/assets/misc/pcw-logo.png"/>
        <p>Retrieving your order details...</p>
        <img src="/assets/misc/loading-ring.svg" />
      </div>
    )
  }

  verifiedState () {
    return (
      <div className="loading">
        <img src="/assets/misc/pcw-logo.png"/>
        <p>Thanks, {order.get('name')}, your order has been verified!</p>
      </div>
    )
  }

  render () {
    let classes = classNames('vignette', randomWood, 'lowres')
    let message
    let order = this.state.order
    let woodKeys = Object.keys(woods)
    let randomWood = woodKeys[(Math.floor(Math.random() * woodKeys.length-1))]

    switch (this.state.state) {
      case 'loading':
        message = this.loadingState()
        break

      case 'loaded':
        message = this.loadedState()
        break

      case 'error':
        message = this.errorState()
        break

      case 'verified':
        message = this.verifiedState()
        break
    }

    if (this.state.loaded) {
      return (
        <main>
          <Board board={this.state.board} overlay />
          <Wizard board={this.state.board} />
        </main>
      )
    }

    return (
      <main className={classes}>
        {message}
      </main>
    )
  }
}
