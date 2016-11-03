import '../scss/app.scss'
import '../scss/lib.scss'
import 'bootstrap/dist/js/npm.js'

import React from 'react'
import ReactDOM from 'react-dom'

import Builder from 'views/Builder.jsx'
import Verification from 'views/Verification.jsx'

let queryParams = {}

location.search.replace('?', '').split('&').forEach(item => {
  let itemSplit = item.split('=')

  queryParams[itemSplit[0]] = itemSplit[1]
})

if (queryParams.verify) {
  ReactDOM.render(
    <Verification id={queryParams.order} hash={queryParams.hash} verify="false" />,
    document.querySelector('div[role="application"]')
  )
} else if (queryParams.hash) {
  ReactDOM.render(
    <Builder id={queryParams.order} hash={queryParams.hash} preview="true" />,
    document.querySelector('div[role="application"]')
  )
} else {
  ReactDOM.render(
    <Builder id={queryParams.id || 1} />,
    document.querySelector('div[role="application"]')
  )
}
