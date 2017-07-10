import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, Tab, Tooltip, OverlayTrigger } from 'react-bootstrap'

import woods from '../woods.json'

export default class WoodPicker extends React.Component {

  toggleChangeWoods () {
    this.setState({
      showWoods: !this.state.showWoods
    })
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState.showWoods) {
      // Set a global event listener to handle closing popup on clicks outside the popup
      document.addEventListener('click', this._handleForeignClick)
    } else {
      document.removeEventListener('click', this._handleForeignClick)
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      showWoods: false
    }

    this.toggleChangeWoods = this.toggleChangeWoods.bind(this)
    this._handleForeignClick = this._handleForeignClick.bind(this)

  }


  // Then make sure to handle that listener appropriately, BRIAN.
  _handleForeignClick (event) {
    // `this.el` should be equivalent to the element or container that you want to be remain clickable
    let targetIsThis = (event.target === this.elTab) || this.elTab.contains(event.target)

    // `this.state.open` should be modified to match whatever property you're using to determine openness
    if (!targetIsThis && this.state.showWoods) {
      event.stopPropagation()

      // Do something to close the thing here.
      this.toggleChangeWoods()
    }
  }


  onChangeWood (event) {
    let value = event.currentTarget.id

    this.props.strip.set('wood', value)
    this.props.updateState({}) // using the passed in updateState forces this component and the StripPanel parent to re-render.
    // this.toggleModal()
    this.forceUpdate()
  }

  render () {
    let currentWood = this.props.strip.get('wood')
    let previewClasses = ['swatch', 'swatch-big', currentWood].join(' ')
    let woodObj = woods[currentWood] || 'Unknown'
    let WoodTabs = null

    if (this.state.showWoods) {

      let genericWoods = _.filter(woods, (wood) => { return !wood.endgrain && !wood.mosaic })
      let endgrainWoods = _.filter(woods, (wood) => { return wood.endgrain })
      let mosaicWoods = _.filter(woods, (wood) => { return wood.mosaic })

      let GenericWoods = _.map(genericWoods, (wood, index) => {
        let classes = ['swatch', 'swatch-clickable', wood.safeName].join(' ')
        let tooltip = <Tooltip id="tooltip">{wood.name}</Tooltip>

        return (
          <OverlayTrigger key={index} placement="top" overlay={tooltip}>
            <li className={classes} id={wood.safeName}  onClick={this.onChangeWood.bind(this)}/>
          </OverlayTrigger>
        )
      })

      let EndgrainWoods = _.map(endgrainWoods, (wood, index) => {
        let classes = ['swatch', 'swatch-clickable', wood.safeName].join(' ')
        let tooltip = <Tooltip id="tooltip">{wood.name}</Tooltip>

        return (
          <OverlayTrigger key={index} placement="top" overlay={tooltip}>
            <li className={classes} id={wood.safeName}  onClick={this.onChangeWood.bind(this)}/>
          </OverlayTrigger>
        )
      })

      let MosaicWoods = _.map(mosaicWoods, (wood, index) => {
        let classes = ['swatch', 'swatch-clickable', wood.safeName].join(' ')
        let tooltip = <Tooltip id="tooltip">{wood.name}</Tooltip>

        return (
          <OverlayTrigger key={index} placement="top" overlay={tooltip}>
            <li className={classes} id={wood.safeName}  onClick={this.onChangeWood.bind(this)}/>
          </OverlayTrigger>
        )
      })

      WoodTabs = (
        <div
          className="wood-tabs"
          ref={ elTab => this.elTab = elTab }>
          <a className="fa fa-window-close close" onClick={this.toggleChangeWoods}></a>
          <Tabs defaultActiveKey={1} id="wood-tabs-bootstrap">
            <Tab eventKey={1} title="Basic">
              <ul className="wood-swatches">
                {GenericWoods}
              </ul>
            </Tab>
            <Tab eventKey={2} title="Mosaic">
              <ul className="wood-swatches">
                {MosaicWoods}
              </ul>
            </Tab>
            <Tab eventKey={3} title="Endgrain">
              <ul className="wood-swatches">
                {EndgrainWoods}
              </ul>
            </Tab>
          </Tabs>
        </div>
        )
    }


    return (
      <div className="wood-picker">
        <div>
          <a id="preview" className={previewClasses} data-toggle="dropdown"></a>
          <span className="color-name">{woodObj.name}</span><br/>
          <a className="btn btn-sm btn-primary" onClick={this.toggleChangeWoods}>Change Wood</a>
          { this.state.showWoods ? WoodTabs : null }
        </div>
      </div>
    )
  }
}
