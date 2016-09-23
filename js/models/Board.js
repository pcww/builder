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

  _rerenderStrips() {
    console.log('_rerenderStrips', this.get('strips').length)
    // this.get('strips').forEach(strip => {
    //   strip.set('rendered', false, {silent: true})
    // })
    this.set('redraw', true)
  }

  _updateWidth () {
    let width = 0
    console.log('_updateWidth', this.get('strips').width)
    this.get('strips').forEach(strip => {
      width += sizes[strip.get('size')]
    })

    console.log("width: ", width)

    if (width > maxWidth) {
      // throw error somehow
      console.log("testing max width")
    } else {
      this.set('width', width)
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
      width: 0
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
