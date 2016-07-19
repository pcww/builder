import '../scss/app.scss'
import '../scss/lib.scss'
// import 'bootstrap/dist/js/npm.js'

// import THREE from 'three.js'
import React from 'react'
import ReactDOM from 'react-dom'

// import BoardDataModel from './boardDataModel.json'
// import Board from 'views/Board'
// import Wizard from 'views/Wizard.jsx'
import Builder from 'views/Builder.jsx'

// window.onload = function () {
//   window.board = new Board(BoardDataModel, 'main')
//
//   window.addEventListener('resize', onWindowResize, false);
//
//   function onWindowResize(){
//     window.board.resize();
//   }
//
//   // Some bullshit for the board UI mockups
//   $('.swatch-clickable').tooltip();
//
//   $(".swatch-clickable").click(function() {
//     let woodClass = $(this).attr('class').split(' ').pop();
//
//     $("#preview").attr('class', ['swatch', woodClass].join(' '));
//     $('.swatch-mini').first().attr('class', ['swatch swatch-mini', woodClass].join(' '));
//   });
//
//   $('.next-step').click(function() {
//     $('section[type="step"]').each(function() {
//       debugger;
//       if ($(this).offset().left > $('body').width()) { //offscreen
//         $(this).animate({
//           left: '0',
//           right: '0'
//         }, 500 );
//
//       } else {
//         $(this).animate({ //onscreen
//           left: '150%',
//           right: '-150%'
//         }, 500 );
//       }
//     });
//
//     $('menu[type="toolbar"]').animate({
//       scrollTop: 0
//     }, 'fast');
//
//     $('menu[type="toolbar"]').scrollTop(0); // immediate scroll
//   });
// } // window.onload

let hash = window.location.hash.match(/#\/?id=(\d+)/)
let boardId = hash.length > 1 ? hash[1] : 1

ReactDOM.render(
  <Builder id={boardId} preview="false"/>,
  document.querySelector('div[role="application"]')
);
