import React from 'react'
import BoardModel from 'models/Board'
import OrderModel from 'models/Order'
import Board from 'views/Board.jsx'
import Wizard from 'views/Wizard.jsx'
import classNames from 'classnames'
import SubmitOrderModal from 'views/SubmitOrderModal.jsx';
import MaterialsListModal from 'views/MaterialsListModal.jsx';
import OrderProcessingModal from 'views/OrderProcessingModal.jsx';
import SocialMediaIngressModal from 'views/SocialMediaIngressModal.jsx';
import HeaderBar from 'views/HeaderBar.jsx';

import woods from '../woods.json'

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '1.5rem',
    transform: 'translate(-50%, -50%)'
  }
}

export default class Builder extends React.Component {
  closeModal () {
    this.setState({
      showModal: false
    })
  }

  closeMaterialsModal () {
    this.setState({
      showMaterialsModal: false
    })
  }

  closeOrderProcessingModal () {
    this.setState({
      showOrderProcessingModal: false
    })
  }

  closeSocialMediaIngressModal () {
    this.setState({
      showSocialMediaIngressModal: false
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      board: new BoardModel({ createdFromId: this.props.id }),
      order: false,
      loaded: false,
      showModal: false,
      showMaterialsModal: !!this.props.jasonMode || false,
      showOrderProcessingModal: (this.props.preview && !(!!this.props.jasonMode || false) && !!this.props.hash) || false,
      showSocialMediaIngressModal: (!this.props.jasonMode && !this.props.hash) || false,
      isSocialMediaIngress: !this.props.hash,
      orderComplete: false
    }

    this.closeModal = this.closeModal.bind(this)
    this.closeMaterialsModal = this.closeMaterialsModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeOrderProcessingModal = this.closeOrderProcessingModal.bind(this)
    this.closeSocialMediaIngressModal = this.closeSocialMediaIngressModal.bind(this)
    this.openMaterialsModal = this.openMaterialsModal.bind(this)

    window.board = this.state.board
  }

  componentWillMount () {
    let promise = new Promise((resolve, reject) => {
      if (this.props.orderId) {
        this.state.order = new OrderModel({
          id: this.props.orderId,
          hash: this.props.hash
        })
        this.state.order.fetch({ success: resolve, error: reject })
      } else {
        this.setState({order: this.state.order})
        resolve()
      }
    })
    .then(() => {
      if (this.state.order) {
        this.state.board.set('createdFromId', this.state.order.get('board_id'))
      } else {
        // stub out an order to hold onto user notes in Wizard->SummaryStep
        this.state.order = new OrderModel({})
      }
      return new Promise((resolve, reject) => {
        this.state.board.fetch({ success: resolve , error: reject })
      })
    })
    .then(() => {
      setTimeout(() => {this.setState({loaded: true})}, 1000)
    })
    .catch(() => {
      this.setState({ error: true })
    })
  }

  componentWillUnmount () {
    this.request.abort()
  }

  openModal () {
    this.setState({
      showModal: true
    })
  }

  openMaterialsModal () {
    this.setState({
      showMaterialsModal: true
    })
  }

  orderComplete () {
    this.setState({
      orderComplete: true
    })
  }



  render () {
    let genericWoodKeys = _.chain(woods).filter(function(wood, key){ return !wood.mosaic && !wood.endgrain }).map(function(wood) { return wood.safeName }).value()
    let randomWoodIndex = Math.round(Math.random()*genericWoodKeys.length)
    let randomWood = genericWoodKeys[randomWoodIndex]
    let classes = classNames('vignette', randomWood, 'lowres')

    if (this.state.loaded) {
      return (
        <main>
          <HeaderBar/>
          <div className="builder-area">
            <Board
              board={this.state.board}
              image={this.props.image}
              overlay
              preview={this.props.preview || this.state.orderComplete}/>
            <Wizard
              board={this.state.board}
              order={this.state.order}
              onSubmit={this.openModal}
              preview={this.props.preview || this.state.orderComplete}
              showMaterialsModal={!!this.props.jasonMode ? this.openMaterialsModal : false}
              isSocialMediaIngress={this.state.isSocialMediaIngress}
              step={this.props.step}/>
          </div>
          <SubmitOrderModal board={this.state.board} order={this.state.order} show={this.state.showModal} close={this.closeModal} complete={this.orderComplete.bind(this)}/>
          <OrderProcessingModal order={this.state.order} show={this.state.showOrderProcessingModal} close={this.closeOrderProcessingModal} />
          <SocialMediaIngressModal show={this.state.showSocialMediaIngressModal} close={this.closeSocialMediaIngressModal} />
          <MaterialsListModal board={this.state.board} order={this.state.order} show={this.state.showMaterialsModal} close={this.closeMaterialsModal}/>
        </main>
      )
    }

    if (this.state.error) {
      return (
        <main className={classes}>
          <div className="loading">
            <div>
              <img src="/assets/misc/pcw-logo.png"/>
            </div>
            <div className="message">
              <p>Sorry, we couldn't load your board details.</p>
            </div>
            <div>
              <i className="fa fa-exclamation-triangle fa-4x"></i>
            </div>
          </div>
        </main>
      )
    }

    return (
      <main className={classes}>
        <div className="loading">
          <div>
            <img src="/assets/misc/pcw-logo.png"/>
          </div>
          <div className="message">
            <p>Gathering up some lumber&hellip;</p>
          </div>
          <div>
            <img src="/assets/misc/loading-ring.svg" />
          </div>
        </div>
      </main>
    )
  }
}
