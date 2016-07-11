// import React from 'react'
// import ReactDOM from 'react-dom'
//
// import BoardDataModel from './boardDataModel.json'
//
// let Strip = React.createClass({
//   render: function () {
//     let classList = ['strip', this.props.size, this.props.wood].join(' ')
//
//     return (
//       <div className={classList}></div>
//     )
//   }
// })
//
// let Board = React.createClass({
//   render: function () {
//     let strips = this.props.data.map(function(strip) {
//       return (
//         <Strip key={performance.now()} size={strip.size} wood={strip.wood}></Strip>
//       );
//     });
//
//     return (
//       <div className="board">
//         {strips}
//       </div>
//     );
//   }
// });
//
// ReactDOM.render(
//   <Board data={BoardDataModel.strips} />,
//   document.querySelector('body')
// );

import '../scss/app.scss'
import '../scss/lib.scss'
import 'bootstrap/dist/js/npm.js'

import THREE from 'three.js'
import React from 'react'
import ReactDOM from 'react-dom'

import BoardDataModel from './boardDataModel.json'
import Board from 'views/Board'
import Wizard from 'views/Wizard.jsx'

window.onload = function () {
  window.board = new Board(BoardDataModel, 'main')

  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize(){
      window.board.resize();
      // camera.aspect = window.innerWidth / window.innerHeight;
      // camera.updateProjectionMatrix();
      // renderer.setSize( window.innerWidth, window.innerHeight );
  }




  // Some bullshit for the board UI mockups
  // $('.swatch-clickable').each(function () {
  //   $(this).attr('title', $(this).attr('id'));
  // });
  // $('.swatch-clickable').tooltip();
  //
  // $(".swatch-clickable").click(function() {
  //   let woodClass = $(this).attr('class').split(' ').pop();
  //
  //   $("#preview").attr('class', ['swatch', woodClass].join(' '));
  //   $('.swatch-mini').first().attr('class', ['swatch swatch-mini', woodClass].join(' '));
  //   $("#color-name").html($(this).attr("id"));
  //   $("#color-field").val($(this).attr("id"))
  // });
  //
  //
  // $('.next-step').click(function() {
  //     $('section[type="step"]').each(function() {
  //         debugger;
  //         if ($(this).offset().left > $('body').width()) { //offscreen
  //             $(this).animate({
  //                 left: '0',
  //                 right: '0'
  //
  //             }, 500 );
  //         } else {
  //             $(this).animate({ //onscreen
  //                 left: '150%',
  //                 right: '-150%'
  //             }, 500 );
  //         }
  //
  //     });
  //
  //     $('menu[type="toolbar"]').animate({
  //       scrollTop: 0
  //     }, 'fast');

      // $('menu[type="toolbar"]').scrollTop(0); // immediate scroll

  // });

} //window.onload

ReactDOM.render(
  <Wizard data={BoardDataModel} />,
  document.querySelector('menu[type="toolbar"]')
);
