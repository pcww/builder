import Backbone from 'backbone'
import BaseModel from 'models/Base'

export default class Board extends BaseModel {
  constructor (data, options) {
    super(data, options)
    this.set('strips', new Backbone.Collection)
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
