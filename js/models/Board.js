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





export default class Board extends BaseModel {
  // _bindEvents () {
  //   this.listenTo(this, 'change:width', () => {
  //     this.get('strips').forEach(strip => {
  //       strip.set('rendered', false)
  //     })
  //   })
  //
  //   this.listenTo(this.get('strips'), 'change:size', this._updateLength)
  //   this.listenTo(this, 'sync', this._updateLength)
  // }


  _bindEvents () {
    this.listenTo(this, 'change:width', () => {
      this._rerenderStrips()
    })

    this.listenTo(this.get('strips'), 'change:size', this._updateLength)
    this.get('strips').on('change add remove', () => {
      this._rerenderStrips()
      this._updateLength()
    })
    this.listenTo(this, 'sync', this._updateLength)
  }

  _rerenderStrips() {
    console.log('_rerenderStrips', this.get('strips').length)
    // this.get('strips').forEach(strip => {
    //   strip.set('rendered', false, {silent: true})
    // })
    this.set('redraw', true)
  }

  _updateLength () {
    let length = 0
    console.log('_updateLength', this.get('strips').length)
    this.get('strips').forEach(strip => {
      length += sizes[strip.get('size')]
    })

    this.set('length', length)
  }

  constructor (data, options) {
    super(data, options)
    this._updateLength()
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
