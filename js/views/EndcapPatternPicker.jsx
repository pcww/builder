import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Collapse, Tabs, Tab } from 'react-bootstrap'
import EndcapLogosModel from 'models/EndcapLogos'

import woods from '../woods.json'

export default class EndcapPatternPicker extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      logos: new EndcapLogosModel(),
      loaded: false,
      showPicker: true
    }

    this.mounted = false
    this.selectPattern = this.selectPattern.bind(this)
    this.request = null

  }

  selectPattern (event) {
    let value = event.currentTarget.getAttribute('data-pattern')
    let currentVals = this.props.board.get('endcaps').set('chooseapattern', value)

    this.setState({showPicker: false})

    this.props.updateState({}) // using the passed in updateState forces this component and the parent to re-render.
    this.forceUpdate()
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
    // console.log('props: ', this.props)
  }

  componentWillUnmount () {
    this.mounted = false
    this.request.abort()

  }

  render () {
    if (!this.state.loaded) {
      return (<div id='endcap-pattern-picker' className="text-center"><i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i></div>)

    } else {
      // console.log('EndcapLogos --------------->' , JSON.stringify(this.state.logos))
      let PatternPicker = Object.keys(this.state.logos.attributes).map((folderName, index) => {
        let classes = ['swatch', 'swatch-clickable'].join(' ')

        let FolderPatterns = this.state.logos.get(folderName).map((fileName, index2) => {
          let inlineStyles = {
            backgroundImage: `url('/assets/endcap-designs/${folderName}/${fileName}')`
          }

          return (
            <li key={`${index}-${index2}`} className={classes} style={inlineStyles} data-pattern={`${folderName}/${fileName}`} onClick={this.selectPattern}></li>
          )
        })

        return (
          <section key={'pattern-section-'+index} className="clearfix">
            <h4>{folderName}</h4>
            <ul>
              {FolderPatterns}
            </ul>
          </section>
        )

      })

      return (
        <div>
          <div id='endcap-pattern-picker'>
            <Collapse in={!this.state.showPicker}>
              <div className="text-center">
                <Button onClick={ ()=> this.setState({ showPicker: !this.state.showPicker })} bsStyle="primary" bsSize="small">Change Pattern</Button>
              </div>
            </Collapse>
            <Collapse in={this.state.showPicker}>
              <div>
                {PatternPicker}
              </div>
            </Collapse>
          </div>
        </div>
      )

    }

  }
}
