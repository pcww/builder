import Backbone from 'backbone'

export default class Base extends Backbone.Model {
  get urlRoot () {
    return 'http://pinecliffwoodworks.com/wp-json/board-builder/v1'
  }
}
