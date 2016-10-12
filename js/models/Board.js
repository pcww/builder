import Backbone from 'backbone'
import BaseModel from 'models/Base'
import StripsCollection from 'collections/Strips'
import constants from '../constants.json'

let sizes = constants.SIZES

export default class Board extends BaseModel {
  _bindEvents () {
    this.listenTo(this, 'sync', this._updateWidth)
    this.listenTo(this, 'change:length', this._rerenderStrips)
    this.listenTo(this, 'change:width', this._rerenderStrips)

    let strips = this.get('strips')

    this.listenTo(strips, 'reset', this._rerenderStrips)
    this.listenTo(strips, 'change:size', this._updateWidth)
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
    console.log("width: ", width)
    return width
  }

  _rerenderStrips() {
    this.set('redraw', true)
  }

  _updateLength (length) {
    this.set('length', length)
  }

  _updateWidth () {
    this.set('width', this._currentWidth())
  }

  constructor (data, options) {
    super(data, options)
    this._updateWidth()
    this._updateLength(24)
    this._bindEvents()
  }

  get defaults () {
    return {
      handle: 'none',
      length: 0,
      name: 'test',
      strips: new StripsCollection,
      width: 0
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
