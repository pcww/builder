import Backbone from 'backbone'
import BaseCollection from 'collections/Base'

export default class Strips extends BaseCollection {
  _bindEvents () {
    this.on('change:size', (model, options) => {
      this.collection.forEach(strip => {
        strip.set('rendered', false)
      })
    })

    this.on('change:wood', (model, options) => {
      if (!model.changed.rendered) {
        model.set('rendered', false)
      }
    })
  }

  initialize () {
    this._bindEvents()
  }
}
