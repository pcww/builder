import Backbone from 'backbone'
import BaseModel from 'models/Base'

export default class EndcapLogos extends BaseModel {
  constructor (data, options) {
    super(data, options)
  }

  parse (response, xhr) {
    return response
  }

  url () {
    return this.urlRoot + '/designs'
  }
}
