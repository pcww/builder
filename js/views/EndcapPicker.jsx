import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import accessories from '../accessories.json'
import EndcapPatternPicker from 'views/EndcapPatternPicker.jsx'

import { Collapse, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding               : '1.5rem',
    transform             : 'translate(-50%, -50%)'
  }
};

const modalImages = [
  'unsplash1',
  'unsplash2',
  'unsplash3'
]

export default class EndcapPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brandingModalIsOpen: false,
      modalIsOpen: false,
      colorWheelModalIsOpen: false,
      colorWheelModalImage: 1,
      imageIndex: 0
    }
  }

  componentWillMount () { }

  // Modal Setup
  openModal () {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal () {
    this.setState({
      modalIsOpen: false
    })
  }

  previousImage () {
    let newImageIndex = parseInt(this.state.imageIndex)
    newImageIndex -= 1
    newImageIndex += modalImages.length
    newImageIndex %= modalImages.length

    this.setState({
      imageIndex: newImageIndex
    })
  }

  nextImage () {
    let newImageIndex = parseInt(this.state.imageIndex)
    newImageIndex += 1
    newImageIndex %= modalImages.length

    this.setState({
      imageIndex: newImageIndex
    })
  }

  // End Modal Setup

  onEndcapChange (event) {
    let endcaps = this.props.board.get('endcaps')

    let color = event.currentTarget.value === 'nutcover' ?
      'stainless' : endcaps.get('color') // force stainless for nutcovers

    endcaps.set('color', color)
    endcaps.set('type', event.currentTarget.value)
    this.forceUpdate()
  }

  onColorChange (event) {
    let endcaps = this.props.board.get('endcaps')

    let color = event.currentTarget.getAttribute('data-value')
    if (endcaps.get('type') === 'nutcover') {
      color = 'stainless'
    }

    endcaps.set('color', color)
    this.forceUpdate()
  }

  onBrandingChange (event) {
    let endcaps = this.props.board.get('endcaps')
    let branding = event.currentTarget.value

    endcaps.set('branding', branding)
    this.forceUpdate()
  }

  showEndcapModal () {
    return true
  }


  render () {
    let board = this.props.board
    let endcap = board.get('endcaps').toJSON()
    let endcapType = endcap.type
    let endcapColor = endcap.color
    let endcapBranding = endcap.branding
    let endcapSelectedPattern = endcap.chooseapattern || false

    let endcapName = accessories.endcaps[endcapType].name
    let endcapDescription = accessories.endcaps[endcapType].description

    let Colors = Object.keys(accessories['endcap-colors']).map((key, index) => {
      let isDisabled = key !== 'stainless' && endcapType === 'nutcover'
      let color = accessories['endcap-colors'][key]
      let classes = classNames('color-swatch', 'endcap-color-swatch', 'color-'+key, {
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
    let chooseapatternPath = endcap.chooseapattern
    let brandingImagePath = (endcapBranding === 'chooseapattern') ?
      (chooseapatternPath ?
        `/assets/endcap-designs/${chooseapatternPath}` :
        '/assets/branding/chooseapattern.jpg') :
      `/assets/branding/${endcapBranding}.jpg`

    return (
      <div id="endcap-picker">
        <fieldset>
          <legend>Endcap Type</legend>
          <div className="media">
            <div className="media-left" onClick={this.openModal.bind(this)}>
              <img className="media-object swatch swatch-big" src={'/assets/endcaps/' + endcapType + '.jpg'} alt="..."/>
            </div>

            <Modal show={this.state.modalIsOpen} onHide={this.closeModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>{endcapName}</Modal.Title>
              </Modal.Header>

              <Modal.Body style={{ textAlign: 'center' }}>
                <img style={{ maxWidth: '100%' }} src={'/assets/endcaps/' + endcapType + '-large.jpg'} alt="..."/>
              </Modal.Body>

              <Modal.Footer>
                <p>{endcapDescription}</p>
              </Modal.Footer>
            </Modal>

            <div className="media-body">
              <div className="row">
                <div className="col-xs-12">
                  <h4 className="media-heading">{endcapName}</h4>
                  <p>{endcapDescription}</p>
                </div>
                <div className="col-xs-12">
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
          <legend>Choose Endcap Color&nbsp;
            <OverlayTrigger
                overlay={<Tooltip id="endcap-color-wheel-show-tooltip">Show Color Wheel</Tooltip>} placement="top"
                delayShow={300} delayHide={150}
              >
                <i style={{cursor: 'pointer'}} className="fa fa-question-circle" onClick={() => this.setState({ colorWheelModalIsOpen: true })}></i>
            </OverlayTrigger>
          </legend>
          <ul className="color-swatch-picker" role="menu">
            {Colors}
          </ul>

          <Modal
            show={this.state.colorWheelModalIsOpen}
            onHide={() => this.setState({ colorWheelModalIsOpen: false })} className="full-width-modal">
            <Modal.Header closeButton>
              <Modal.Title>Endcap Color Options</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ textAlign: 'center' }}>
              <p>
                { this.state.colorWheelModalImage == 1 ? <img style={{ maxWidth: '100%' }} src={'/assets/endcap-colors/ColorWheel.solids.jpg'} alt="..."/> : null }
                { this.state.colorWheelModalImage == 2 ? <img style={{ maxWidth: '100%' }} src={'/assets/endcap-colors/ColorWheel.labeled.jpg'} alt="..."/> : null }
              </p>
              <div>
                <a className={"btn btn-sm " + (this.state.colorWheelModalImage==1 ? 'btn-primary' : 'btn-default')} onClick={() => { this.setState({colorWheelModalImage: 1 }) }}>Solid Colors</a>&nbsp;
                <a className={"btn btn-sm " + (this.state.colorWheelModalImage==2 ? 'btn-primary' : 'btn-default')} onClick={() => { this.setState({colorWheelModalImage: 2 }) }}>Labeled Colors</a>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <p>These are the color options available for button type endcaps. Nutcovers will always come in stainless, but still support engraved logos.</p>
            </Modal.Footer>
          </Modal>

        </fieldset>

        <fieldset>
          <legend>Choose Endcap Branding</legend>
          <div className="media">
            <div className="media-left" onClick={() => this.setState({ brandingModalIsOpen: true })}>
              <img className="media-object swatch swatch-big" src={brandingImagePath} alt="Selected Endcap Pattern"/>
            </div>

            <Modal show={this.state.brandingModalIsOpen} onHide={() => this.setState({ brandingModalIsOpen: false })}>
              <Modal.Header closeButton>
                <Modal.Title>{brandingName}</Modal.Title>
              </Modal.Header>

              <Modal.Body style={{ textAlign: 'center' }}>
                <img style={{ maxWidth: '100%' }} src={brandingImagePath} alt="..."/>
              </Modal.Body>

              <Modal.Footer>
                <p>{brandingDescription}</p>
              </Modal.Footer>
            </Modal>

            <div className="media-body">
              <div className="row">
                <div className="col-xs-12">
                  <h4 className="media-heading">{brandingName}</h4>
                  <p>{brandingDescription}</p>
                </div>
                <div className="col-xs-12">
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
                      <input type="radio" name="endcapBrandingOption" id="endcap-button" value="pcwartlogo" onChange={this.onBrandingChange.bind(this)} checked={endcapBranding === 'pcwartlogo'}/>
                      {accessories['endcaps-branding']['pcwartlogo'].name}
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" name="endcapBrandingOption" id="endcap-button" value="chooseapattern" onChange={this.onBrandingChange.bind(this)} checked={endcapBranding === 'chooseapattern'}/>
                      {accessories['endcaps-branding']['chooseapattern'].name}
                    </label>

                  </div>
                </div>
              </div>
            </div>

            <Collapse in={endcapBranding === 'chooseapattern'}>
              <div>
                { endcapBranding === 'chooseapattern' ? (<EndcapPatternPicker board={this.props.board} updateState={this.setState.bind(this)}/>) : null }
              </div>
            </Collapse>

          </div>
        </fieldset>
      </div>
    )
  }
}
