import '../scss/app.scss'
import '../scss/lib.scss'
import 'bootstrap/dist/js/npm.js'

import THREE from 'three.js'
import React from 'react'
import ReactDOM from 'react-dom'

import BoardDataModel from './boardDataModel.json'
import Board from 'views/Board'

window.onload = function () {
  window.board = new Board(BoardDataModel)
}
