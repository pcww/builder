import Backbone from 'backbone'
import BaseCollection from 'collections/Base'

export default class Strips extends BaseCollection {
  _bindEvents () {
    this.on('change', function (model, options) {
      if (!model.changed.rendered) {
        model.set('rendered', false)
      }
    })
  }

  initialize () {
    this._bindEvents()
  }
}
