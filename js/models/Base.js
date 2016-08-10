import Backbone from 'backbone'

export default class Base extends Backbone.Model {
  get urlRoot () {
    return 'http://linux.pinecliffwoodworks.com/wp-json/board-builder/v1'
  }
}
