import BaseModel from 'models/Base'

export default class Order extends BaseModel {
  parse (response, xhr) {
    if (response.order_id) {
      response.id = response.order_id

      delete response.order_id
    }

    return response
  }

  url () {
    return this.urlRoot + '/order/' + this.get('id') + '/' + this.get('hash')
  }

  verify () {
    let data = {
      order_id: this.get('id'),
      verify_hash: this.get('hash')
    }

    return $.ajax({
      contentType: 'application/json',
      data: JSON.stringify(data),
      method: 'post',
      processData: false,
      url: this.urlRoot + '/order-verify'
    })
  }
}
