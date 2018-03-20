import React from 'react'
import ReactDOM from 'react-dom'
import constants from '../constants.json'
import accessories from '../accessories.json'
import woods from '../woods.json'
import { OverlayTrigger, Tooltip, Popover, Col, Row } from 'react-bootstrap'
import classNames from 'classnames'

let sizes = constants.SIZES

export default class SummaryStep extends React.Component {
  constructor (props) {
    super(props)

    this.onCustomChange = this.onCustomChange.bind(this)
    window.order = this.props.order
  }

  getEdge () {
    let board = this.props.board
    let edge = board.get('edge').profile
    let name = accessories.edges[edge].name
    let description = accessories.edges[edge].description

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch" src={'/assets/edges/' + edge + '.jpg'}/>
        </div>

        <div className="media-body">
          <h4 className="media-heading">
            {name}
          </h4>

          <p>
            {description}
          </p>
        </div>
      </div>
    )
  }

  getEndcaps () {
    let board = this.props.board
    let endcaps = board.get('endcaps').toJSON()
    let color = accessories['endcap-colors'][endcaps.color]
    let branding = accessories['endcaps-branding'][endcaps.branding]
    let description = accessories['endcaps'][endcaps.type].description
    let type = accessories['endcaps'][endcaps.type].name
    let chooseapatternPath = endcaps.chooseapattern
    let brandingImagePath = (endcaps.branding === 'chooseapattern') ?
      (chooseapatternPath ?
        `/assets/endcap-designs/${chooseapatternPath}` :
        '/assets/branding/chooseapattern.jpg') :
      `/assets/branding/${endcaps.branding}.jpg`

    let name = `${color.name} ${type}`
    let colorClasses = classNames('color-swatch', 'swatch', 'swatch-medium', 'endcap-color-swatch', 'color-'+endcaps.color, 'media-object')
    const colorTooltip = <Tooltip id={endcaps.color}>{color.name}</Tooltip>
    const logoClasses = 'media-object swatch swatch-medium'
    const logoTooltip = <Tooltip id={endcaps.branding}>{branding.name}</Tooltip>

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch" src={'/assets/endcaps/' + endcaps.type + '.jpg'}/>
        </div>

        <div className="media-body">
          <h4 className="media-heading">
            {name}
          </h4>

          <p>
            {description}
          </p>

          <div className="endcap-options">
            <legend className="small">Selected Options</legend>
            <OverlayTrigger
                overlay={colorTooltip}
                placement="top"
                delayShow={100} delayHide={150}>
                <div className={colorClasses}/>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={logoTooltip}
                placement="top"
                delayShow={100} delayHide={150}>
                <img className={logoClasses} src={brandingImagePath}/>
              </OverlayTrigger>
          </div>

        </div>

      </div>
    )
  }

  getFeet () {
    let board = this.props.board
    let type = board.get('feet').type
    let feet = accessories.feet[type]

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch" src={'/assets/feet/' + type + '.jpg'}/>
        </div>

        <div className="media-body">
          <h4 className="media-heading">
            {feet.name}
          </h4>

          <p>
            {feet.description}
          </p>
        </div>
      </div>
    )
  }

  getHandle () {
    let board = this.props.board
    let type = board.get('handle')
    let handle = accessories.handles[type]

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch" src={'/assets/handles/' + type + '.jpg'}/>
        </div>

        <div className="media-body">
          <h4 className="media-heading">
            {handle.name}
          </h4>

          <p>
            {handle.description}
          </p>
        </div>
      </div>
    )
  }

  getGroove () {
    let board = this.props.board
    let type = board.get('groove')
    let groove = accessories.grooves[type]

    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object swatch" src={'/assets/grooves/' + type + '.png'}/>
        </div>

        <div className="media-body">
          <h4 className="media-heading">
            {groove.name}
          </h4>

          <p>
            {groove.description}
          </p>
        </div>
      </div>
    )
  }

  getLayout () {
    let Strips = board.get('strips').map((strip, key) => {
      let styles = {
        flexGrow: sizes[strip.get('size')]
      }
      let wood = strip.get('wood')
      let woodName = woods[wood].name

      let popover = <Popover id="popover-trigger-focus" className="summary-wood">
          <div className={'swatch swatch-clickable ' +  woods[wood].safeName} />
          <h6>{woodName}</h6>
        </Popover>

      return (
        <OverlayTrigger
          key={key}
          overlay={popover}
          placement="top"
          delayShow={0} delayHide={0}>
          <div className={strip.get('wood')} key={strip.id} style={styles}></div>
        </OverlayTrigger>
      )
    })

    return (
      <div className="board-layout">
        {Strips}
      </div>
    )
  }

  getCustom () {
    let placeholderText = "(Optional) If you have any additional requests, we would love to hear them!"
    let value = (this.props.order) ? this.props.order.get('notes') : ''
    return (
      <textarea readOnly={this.props.preview} className="customText form-control" rows="15" placeholder={placeholderText} defaultValue={value} onChange={this.onCustomChange.bind(this)}></textarea>
    )
  }

  onCustomChange (event) {
    this.props.order.set('notes', event.currentTarget.value)
    this.forceUpdate()
  }

  render () {
    return (
      <div className="step-content">
        <fieldset>
          <legend>Layout</legend>
          {this.getLayout()}
          {this.props.showMaterialsModal &&
            <p class="text-center"><br/><a class="btn btn-xs btn-primary" onClick={this.props.showMaterialsModal}>Show Materials</a></p>
          }
        </fieldset>

        <fieldset>
          <legend>Endcaps</legend>
          {this.getEndcaps()}
        </fieldset>

        <fieldset>
          <legend>Handle</legend>
          {this.getHandle()}
        </fieldset>

        <fieldset>
          <legend>Edge</legend>
          {this.getEdge()}
        </fieldset>

        <fieldset>
          <legend>Groove</legend>
          {this.getGroove()}
        </fieldset>

        <fieldset>
          <legend>Feet</legend>
          {this.getFeet()}
        </fieldset>

        { !this.props.isSocialMediaIngress ?
          <fieldset>
            <div class="well well-sm">
              <legend>Purchase Information</legend>

              <div className="media">
                <div className="media-body">
                  <h4 className="media-heading">
                    Lead Time
                  </h4>

                  <p>Boards will typically be delivered <span class="label label-primary label-round">2 - 4 months</span> from the date your order is placed.</p>
                </div>
              </div>

              <div className="media">
                <div className="media-body">
                  <h4 className="media-heading">
                    Pricing
                  </h4>

                  <p>Prices will vary depending on board size. Please see the <span className="label label-primary label-round"><a href="/assets/Pricelist.pdf" target="_blank"><i className="fa fa-file-pdf-o" /> Price Table</a></span> to get an idea of how much your board will cost.</p>
                </div>
              </div>
            </div>
          </fieldset> : null
        }

        { !this.props.isSocialMediaIngress ?
          <fieldset>
            <legend>Custom Requests</legend>
            {this.getCustom()}
          </fieldset> : null
        }
      </div>
    )
  }
}
