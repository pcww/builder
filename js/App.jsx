import '../scss/app.scss'
import '../scss/lib.scss'
import 'bootstrap/dist/js/npm.js'

import React from 'react'
import ReactDOM from 'react-dom'

import Builder from 'views/Builder.jsx'

let hash = window.location.hash.match(/#\?id=(\d+)/)
let boardId = hash && hash.length > 1 ? hash[1] : 1

ReactDOM.render(
  <Builder id={boardId} preview="false"/>,
  document.querySelector('div[role="application"]')
);
