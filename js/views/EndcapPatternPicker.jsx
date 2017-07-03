import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, Tab } from 'react-bootstrap'
import EndcapLogosModel from 'models/EndcapLogos'

import woods from '../woods.json'

export default class EndcapPatternPicker extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showWoods: false,
      logos: new EndcapLogosModel(),
      loaded: false,
    }

    this.mounted = false
    this.toggleChangeWoods = this.toggleChangeWoods.bind(this)
    // this._handleForeignClick = this._handleForeignClick.bind(this)
    this.request = null

  }

  toggleChangeWoods () {
    this.setState({
      showWoods: !this.state.showWoods
    })
  }

  componentWillMount () {
    let promise = new Promise((resolve, reject) => {
      this.request = this.state.logos.fetch({ success: resolve, error: reject })
    })
    .then(() => {
      setTimeout(() => {this.setState({loaded: true})}, 1000)
    })
    .catch((error) => {
      if (this.mounted) {
        console.log('error caught loading logos:', error)
        this.setState({ error: true })
      }
    })
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount () {
    this.mounted = false
    this.request.abort()

  }

  // componentWillUpdate (nextProps, nextState) {
  //   if (nextState.showWoods) {
  //     // Set a global event listener to handle closing popup on clicks outside the popup
  //     document.addEventListener('click', this._handleForeignClick)
  //   } else {
  //     document.removeEventListener('click', this._handleForeignClick)
  //   }
  // }
  //
  // // Then make sure to handle that listener appropriately, BRIAN.
  // _handleForeignClick (event) {
  //   // `this.el` should be equivalent to the element or container that you want to be remain clickable
  //   let targetIsThis = (event.target === this.elTab) || this.elTab.contains(event.target)
  //
  //   // `this.state.open` should be modified to match whatever property you're using to determine openness
  //   if (!targetIsThis && this.state.showWoods) {
  //     event.stopPropagation()
  //
  //     // Do something to close the thing here.
  //     this.toggleChangeWoods()
  //   }
  // }
  //
  //
  // onChangePattern (event) {
  //   let value = event.currentTarget.id
  //
  //   this.props.board.set('endcaps', Object.assign(currentVals, { chooseapattern: value }))
  //   this.props.updateState({}) // using the passed in updateState forces this component and the StripPanel parent to re-render.
  //   // this.toggleModal()
  //   this.forceUpdate()
  // }

  render () {
    // let currentWood = this.props.strip.get('wood')
    // let previewClasses = ['swatch', 'swatch-big', currentWood].join(' ')
    // let woodObj = woods[currentWood] || 'Unknown'
    // let WoodTabs = null
    //
    // if (this.state.showWoods) {
    //
    //   let genericWoods = _.filter(woods, (wood) => { return !wood.endgrain && !wood.mosaic })
    //
    //   let GenericWoods = _.map(genericWoods, (wood, index) => {
    //     let classes = ['swatch', 'swatch-clickable', wood.safeName].join(' ')
    //     console.log('')
    //
    //     return (
    //       <li className={classes} id={wood.safeName} key={index} title={wood.name} onClick={this.onChangePattern.bind(this)} data-toggle="tooltip"/>
    //     )
    //   })
    //
    //   WoodTabs = (
    //     <div
    //       className="wood-tabs"
    //       ref={ elTab => this.elTab = elTab }>
    //       <a className="fa fa-window-close close" onClick={this.toggleChangeWoods}></a>
    //       <Tabs defaultActiveKey={1} id="wood-tabs-bootstrap">
    //         <Tab eventKey={1} title="Basic">
    //           <ul className="wood-swatches">
    //             {GenericWoods}
    //           </ul>
    //         </Tab>
    //         <Tab eventKey={2} title="Mosaic">
    //           <ul className="wood-swatches">
    //             {MosaicWoods}
    //           </ul>
    //         </Tab>
    //         <Tab eventKey={3} title="Endgrain">
    //           <ul className="wood-swatches">
    //             {EndgrainWoods}
    //           </ul>
    //         </Tab>
    //       </Tabs>
    //     </div>
    //     )
    // }

    if (!this.state.loaded) {
      return (<div>Loading...</div>)

    } else {

      return (<div><pre>{JSON.stringify(this.state.logos, null, 2) }</pre></div>)

      // return (
      //   <div className="wood-picker">
      //     <div>
      //       <a id="preview" className={previewClasses} data-toggle="dropdown"></a>
      //       <span className="color-name">{woodObj.name}</span><br/>
      //       <a className="btn btn-sm btn-primary" onClick={this.toggleChangeWoods}>Change Wood</a>
      //       { this.state.showWoods ? WoodTabs : null }
      //     </div>
      //   </div>
      // )

    }

  }
}
