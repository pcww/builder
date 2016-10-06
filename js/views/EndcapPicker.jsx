import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import accessories from '../accessories.json'

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class EndcapPicker extends React.Component {
  onEndcapChange (event) {
    let currentVals = this.props.board.get('endcaps')

    let color = event.currentTarget.value === 'nutcover' ?
      'stainless' : this.props.board.get('endcaps').color // force stainless for nutcovers

    this.props.board.set('endcaps', Object.assign(currentVals, { color: color, type: event.currentTarget.value }))
    this.forceUpdate()
  }

  onColorChange (event) {
    let currentVals = this.props.board.get('endcaps')

    let color = event.currentTarget.getAttribute('data-value')
    if (currentVals.type === 'nutcover')
      color = 'stainless'

    this.props.board.set('endcaps', Object.assign(currentVals, { color: color }))
    this.forceUpdate()
  }

  onBrandingChange (event) {
    debugger;
    let currentVals = this.props.board.get('endcaps')
    let branding = event.currentTarget.value

    this.props.board.set('endcaps', Object.assign(currentVals, { branding: branding }))
    this.forceUpdate()
  }

  render () {
    let board = this.props.board
    let endcap = board.get('endcaps')
    let endcapType = endcap.type
    let endcapColor = endcap.color
    let endcapBranding = endcap.branding

    let endcapName = accessories.endcaps[endcapType].name
    let endcapDescription = accessories.endcaps[endcapType].description

    let Colors = Object.keys(accessories['endcap-colors']).map((key, index) => {
      let isDisabled = key !== 'stainless' && endcapType === 'nutcover'
      let color = accessories['endcap-colors'][key]
      let classes = classNames('color-swatch', 'color-'+key, {
        'swatch-clickable': !isDisabled,
        'selected': key === endcapColor,
        'disabled': isDisabled
      });
      let tooltipText = (key !== 'stainless' && endcapType === 'nutcover') ? '' : color.name
      let tooltip = <Tooltip id={index}>{tooltipText}</Tooltip>

      let swatch = (
        <li className={classes} key={index} data-value={key} onClick={this.onColorChange.bind(this)}>
          <i className="fa fa-check-circle fa-2x"></i>
        </li>
      )

      if (isDisabled) {
        return swatch
      }
      else {
        return (
          <OverlayTrigger
            key={index}
            overlay={tooltip} placement="top"
            delayShow={300} delayHide={150}
          >
            {swatch}
          </OverlayTrigger>
        )
      }

    })

    let brandingName = accessories['endcaps-branding'][endcapBranding].name
    let brandingDescription = accessories['endcaps-branding'][endcapBranding].description

    return (
      <div id="endcap-picker">
        <fieldset>
          <legend>Endcap Type</legend>
          <div className="media">
            <div className="media-left">
              <img className="media-object swatch swatch-big" src={'/assets/endcaps/' + endcapType + '.jpg'} alt="..."/>
            </div>
            <div className="media-body">
              {endcapType}
              <div className="row">
                <div className="col-xs-6">
                  <h4 className="media-heading">{endcapName}</h4>
                  <p className="small">{endcapDescription}</p>
                </div>
                <div className="col-xs-6">
                  <div className="radio">
                    <label>
                      <input type="radio" name="endcapOption" id="endcap-button" value="button" onChange={this.onEndcapChange.bind(this)} checked={endcapType === 'button'}/>
                      {accessories.endcaps['button'].name}
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" name="endcapOption" id="endcap-nutcover" value="nutcover" onChange={this.onEndcapChange.bind(this)} checked={endcapType === 'nutcover'}/>
                      {accessories.endcaps['nutcover'].name}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>


        <hr/>

        <fieldset>
          <legend>Choose Endcap Color</legend>
          <ul className="color-swatch-picker" role="menu">
            {Colors}
          </ul>
        </fieldset>

        <fieldset>
          <legend>Choose Endcap Branding</legend>
          <div className="media">
            <div className="media-left">
              <img className="media-object swatch swatch-big" src={'/assets/branding/' + endcapBranding + '.jpg'} alt="..."/>
            </div>
            <div className="media-body">
              {endcapBranding}
              <div className="row">
                <div className="col-xs-6">
                  <h4 className="media-heading">{brandingName}</h4>
                  <p className="small">{brandingDescription}</p>
                </div>
                <div className="col-xs-6">
                  <div className="radio">
                    <label>
                      <input type="radio" name="endcapBrandingOption" id="endcap-button" value="none" onChange={this.onBrandingChange.bind(this)} checked={endcapBranding === 'none'}/>
                      {accessories['endcaps-branding']['none'].name}
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" name="endcapBrandingOption" id="endcap-button" value="pineclifflogo" onChange={this.onBrandingChange.bind(this)} checked={endcapBranding === 'pineclifflogo'}/>
                      {accessories['endcaps-branding']['pineclifflogo'].name}
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" name="endcapBrandingOption" id="endcap-nutcover" value="pcwartlogo" onChange={this.onBrandingChange.bind(this)} checked={endcapBranding === 'pcwartlogo'}/>
                      {accessories['endcaps-branding']['pcwartlogo'].name}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    )
  }
}
