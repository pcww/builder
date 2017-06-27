import '../scss/app.scss'
import '../scss/lib.scss'
import 'bootstrap/dist/js/npm.js'

import React from 'react'
import ReactDOM from 'react-dom'

import Builder from 'views/Builder.jsx'
import Verification from 'views/Verification.jsx'

let component
let queryParams = {}
let renderTarget = document.querySelector('div[role="application"]')

location.search.replace('?', '').split('&').forEach(item => {
  let itemSplit = item.split('=')

  if (itemSplit.length === 2) {
    queryParams[itemSplit[0]] = itemSplit[1].toLowerCase() === 'false' ? false : itemSplit[1]

  } else if (itemSplit.length === 1) {
    if (itemSplit[0]) {
      queryParams[itemSplit[0]] = true
    }
  }
})

console.log('queryParams: ', queryParams)

if (queryParams.verify) {
  // Verify from email
  component = <Verification id={queryParams.order} hash={queryParams.hash} verify={true} />

} else if (queryParams.hash) {
  // Preview wuth order - displays dialog box "order's on the way bro"
  component = <Builder order={queryParams.order} hash={queryParams.hash} preview={true} />

} else {
  // share link ingress (from facebook/twitter) - basic readonly preview mode
  component = <Builder id={queryParams.id || 1} preview={queryParams.preview} />
}

ReactDOM.render(
  component,
  renderTarget
)
