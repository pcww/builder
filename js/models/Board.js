import Backbone from 'backbone'
import BaseModel from 'models/Base'
import StripsCollection from 'collections/Strips'

let sizes = {
  xxsmall: 0.25,
  xsmall: 0.375,
  small: 0.5,
  medium: 0.625,
  large: 1
}

let maxWidth = 13

export default class Board extends BaseModel {
  _bindEvents () {
    this.listenTo(this, 'sync', this._updateLength)
    this.listenTo(this, 'change:width', this._rerenderStrips)

    let strips = this.get('strips')

    this.listenTo(strips, 'reset', this._rerenderStrips)
    this.listenTo(strips, 'change:size', this._updateLength)
    this.listenTo(strips, 'change add remove', () => {
      this._rerenderStrips()
      this._updateWidth()
    })
  }

  _currentWidth () {
    let width = 0;
    this.get('strips').forEach(strip => {
      width += sizes[strip.get('size')]
    })
    return width
  }

  _rerenderStrips() {
    this.set('redraw', true)
  }

  _updateWidth () {
    this.set('width', this._currentWidth())
  }

  constructor (data, options) {
    super(data, options)
    this._updateWidth()
    this._bindEvents()
  }

  get defaults () {
    return {
      length: 0,
      name: 'test',
      strips: new StripsCollection,
      width: 0,
      handle: 'none'
    }
  }

  parse (response, xhr) {
    response.strips.forEach((strip, index) => {
      strip.id = index
    })

    this.get('strips').reset(response.strips)

    delete response.strips

    return response
  }

  url () {
    return this.urlRoot + (this.id ? '/board/' + this.id : '/board')
  }
}
