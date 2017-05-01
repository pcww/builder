import React from 'react'
import classNames from 'classnames'
import OrderModel from 'models/Order'

import woods from '../woods.json'

export default class Verification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
      this.setState({
        state: order.get('verified') ? 'verified' : 'loaded'
      })

      if (!order.get('verified')) {
        order.verify()
        .done(() => {
          this.setState({
            state: order.get('verified') ? 'verified' : 'loaded'
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
        <div className="frontface">
          <div>
            <img src="/assets/misc/pcw-logo.png"/>
          </div>
          <div className="message">
            <p>Sorry, there was a problem verifying your order. Please try again later or email us at <a href="mailto:tech@pinecliffwoodworks.com">tech@pinecliffwoodworks.com</a>.</p>
          </div>
          <div></div>
        </div>
      </div>
    )
  }

  loadedState () {
    return (
      <div className="loading">
        <div className="frontface">
          <div>
            <img src="/assets/misc/pcw-logo.png"/>
          </div>
          <div className="message">
            <p>{order.get('name')}, we're verifying your order!</p>
          </div>
          <div>
            <img src="/assets/misc/loading-ring.svg" />
          </div>
        </div>
      </div>
    )
  }

  loadingState () {
    return (
      <div className="loading">
        <div className="frontface">
          <div>
            <img src="/assets/misc/pcw-logo.png"/>
          </div>
          <div className="message">
            <p>Retrieving your order details...</p>
          </div>
          <div>
            <img src="/assets/misc/loading-ring.svg" />
          </div>
        </div>
      </div>
    )
  }

  verifiedState () {
    return (
      <div className="loading">
        <div className="frontface">
          <div>
            <img src="/assets/misc/pcw-logo.png"/>
          </div>
          <div className="message">
            <p>Thanks, {order.get('name')}, your order has been verified!</p>
            <small>Check your email for your order details.</small>
          </div>
          <div>
            <i className="fa fa-check fa-5x"></i>
          </div>
        </div>

        <div className="backface">
          <div>
            <img src="/assets/misc/pcw-logo.png"/>
          </div>
          <div className="message">
            <p>Thanks, {order.get('name')}, your order has been verified!</p>

            <div>
              <a href="http://facebook.com">
                <i className="fa fa-fw fa-facebook"></i>
              </a>

              <a href="http://twitter.com">
                <i className="fa fa-fw fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    let message
    let order = this.state.order
    let woodKeys = Object.keys(woods)
    let randomWood = woodKeys[(Math.floor(Math.random() * woodKeys.length-1))]

    let classes = classNames('vignette', randomWood, 'lowres')

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
