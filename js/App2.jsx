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


  // So sorry!
  $('.swatch-clickable').each(function () {
    $(this).attr('title', $(this).attr('id'));
  });
  $('.swatch-clickable').tooltip();

  $(".swatch-clickable").click(function() {
    let woodClass = $(this).attr('class').split(' ').pop();

    $("#preview").attr('class', ['swatch', woodClass].join(' '));
    $('.swatch-mini').attr('class', ['swatch swatch-mini', woodClass].join(' '));
    $("#color-name").html($(this).attr("id"));
    $("#color-field").val($(this).attr("id"))
  });


}
