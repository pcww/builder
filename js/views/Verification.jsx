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

  render () {
    let message
    let order = this.state.order

    switch (this.state.state) {
      case 'loading':
        message = 'Retrieving your order details...'
        break

      case 'loaded':
        message = order.get('name') + ', we\'re verifying your order!'
        break

      case 'error':
        message = 'Sorry, we failed to verify your order. Please try again later or send us an email at <a href="mailto:tech@pinecliffwoodworks.com">tech@pinecliffwoodworks.com</a>.'
        break

      case 'verified':
        message = 'Thanks, ' + order.get('name') + ', your order has been verified!'
        break
    }

    return (
      <main>
        {message}
      </main>
    )
  }
}
