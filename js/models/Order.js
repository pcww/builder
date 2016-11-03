import BaseModel from 'models/Base'

export default class Order extends BaseModel {
//  parse (response, xhr) {
//    response.strips.forEach((strip, index) => {
//      strip.id = index
//    })
//
//    this.get('strips').reset(response.strips)
//
//    delete response.strips
//
//    return response
//  }

  url () {
    return this.urlRoot + '/order/' + this.get('id') + '/' + this.get('hash')
  }

  verify () {
    console.log('verifying!')
  }
}
