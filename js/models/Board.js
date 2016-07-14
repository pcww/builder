import BaseModel from 'models/Base'

export default BaseModel.extend({
  defaults: {
    name: 'test',
    strips: []
  },

  url : function() {
    return this.urlRoot + (this.id ? '/board/' + this.id : '/board')
  }

})
