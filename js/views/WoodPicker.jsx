import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, Tab } from 'react-bootstrap'

import woods from '../woods.json'

export default class WoodPicker extends React.Component {

  toggleChangeWoods () {
    this.setState({
      showWoods: !this.state.showWoods
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      showWoods: false
    }

    this.toggleChangeWoods = this.toggleChangeWoods.bind(this)
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

      console.log('genericWoods: ', genericWoods)

      let GenericWoods = _.map(genericWoods, (wood, index) => {
        let classes = ['swatch', 'swatch-clickable', wood.safeName].join(' ')
        console.log('')

        return (
          <li className={classes} id={wood.safeName} key={index} title={wood.name} onClick={this.onChangeWood.bind(this)} data-toggle="tooltip"/>
        )
      })

      let EndgrainWoods = _.map(endgrainWoods, (wood, index) => {
        let classes = ['swatch', 'swatch-clickable', wood.safeName].join(' ')

        return (
          <li className={classes} id={wood.safeName} key={index} title={wood.name} onClick={this.onChangeWood.bind(this)} data-toggle="tooltip"/>
        )
      })

      let MosaicWoods = _.map(mosaicWoods, (wood, index) => {
        let classes = ['swatch', 'swatch-clickable', wood.safeName].join(' ')

        return (
          <li className={classes} id={wood.safeName} key={index} title={wood.name} onClick={this.onChangeWood.bind(this)} data-toggle="tooltip"/>
        )
      })

      WoodTabs = (
        <div className="wood-tabs">
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
