import Backbone from 'backbone'
import BaseModel from 'models/Base'
import StripsCollection from 'collections/Strips'

export default class Board extends BaseModel {
  _bindEvents () {
    this.on('change:width', () => {
      this.get('strips').forEach(strip => {
        strip.set('rendered', false)
      })
    })
  }

  constructor (data, options) {
    super(data, options)
    this._bindEvents()
    this.set('strips', new StripsCollection)
  }

  get defaults () {
    return {
      name: 'test',
      strips: []
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
