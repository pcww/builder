import React from 'react'

import OrderModel from 'models/Order'

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
      }
    })
    .error(() => {
      this.setState({
        state: 'error'
      })
    })
  }

  errorState () {
    return <p>Sorry, we failed to verify your order. Please try again later or send us an email at <a href="mailto:tech@pinecliffwoodworks.com">tech@pinecliffwoodworks.com</a>.</p>
  }

  loadedState () {
    return <p>{order.get('name')}, we're verifying your order!</p>
  }

  loadingState () {
    return <p>Retrieving your order details...</p>
  }

  verifiedState () {
    return <p>Thanks, {order.get('name')}, your order has been verified!</p>
  }

  render () {
    let message
    let order = this.state.order

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

    return (
      <main>
        {message}
      </main>
    )
  }
}
