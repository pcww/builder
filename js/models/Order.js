import BaseModel from 'models/Base'

export default class Order extends BaseModel {
  url () {
    return this.urlRoot + '/order/' + this.get('id') + '/' + this.get('hash')
  }

  verify () {
    return $.ajax({
      data: {
        order_id: this.get('id'),
        verify_hash: this.get('hash')
      },
      method: 'post',
      url: this.urlRoot + '/order-verify'
    })
  }
}
