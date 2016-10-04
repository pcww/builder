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
  // _bindEvents () {
  //   this.listenTo(this, 'change:width', () => {
  //     this.get('strips').forEach(strip => {
  //       strip.set('rendered', false)
  //     })
  //   })
  //
  //   this.listenTo(this.get('strips'), 'change:size', this._updateWidth)
  //   this.listenTo(this, 'sync', this._updateWidth)
  // }


  _bindEvents () {
    this.listenTo(this, 'change:width', () => {
      this._rerenderStrips()
    })

    this.listenTo(this.get('strips'), 'change:size', this._updateWidth)
    this.get('strips').on('change add remove', () => {
      this._rerenderStrips()
      this._updateWidth()
    })
    this.listenTo(this, 'sync', this._updateWidth)
  }

  _currentWidth () {
    let width = 0;
    this.get('strips').forEach(strip => {
      width += sizes[strip.get('size')]
    })
    return width
  }

  _rerenderStrips () {
    console.log('_rerenderStrips', this.get('strips').length)
    // this.get('strips').forEach(strip => {
    //   strip.set('rendered', false, {silent: true})
    // })
    this.set('redraw', true)
  }

  _updateWidth () {
    let width = 0
    console.log('_updateWidth', this.get('strips').width)

    // Current Width
    width = this._currentWidth()

    console.log("width: ", width)

    if (width > maxWidth) {
      // throw error somehow
      this.get('strips').pop();
      console.log("Max Width Achieved")
    } else {
      this.set('width', width)
      console.log("New Width: ", width)
    }
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
    this.get('strips').reset(response.strips)

    delete response.strips

    return response
  }

  url () {
    return this.urlRoot + (this.id ? '/board/' + this.id : '/board')
  }
}
