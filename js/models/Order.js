import BaseModel from 'models/Base'

export default class Order extends BaseModel {
  getFacebookLink () {
    return `https://www.facebook.com/sharer/sharer.php?u=${this.getShareLink()}`
  }

  getShareLink () {
    return `http://builder.pinecliffwoodworks.com/?id=${encodeURIComponent(this.get('board_id'))}&preview=true`
  }

  getTweetLink () {
    let text = encodeURIComponent(`Check out my super sweet new cutting board from @pinecliffwoods!\n${this.getShareLink()}`)

    return `https://twitter.com/intent/tweet?text=${text}`
  }

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
      success: (response) => {
        this.set(response)
      },
      url: this.urlRoot + '/order-verify'
    })
  }
}
