import React from 'react'
import ReactDOM from 'react-dom'

import BoardDataModel from './boardDataModel.json'

let Strip = React.createClass({
  render: function () {
    let classList = ['strip', this.props.size, this.props.wood].join(' ')

    return (
      <div className={classList}></div>
    )
  }
})

let Board = React.createClass({
  render: function () {
    let strips = this.props.data.map(function(strip) {
      return (
        <Strip key={performance.now()} size={strip.size} wood={strip.wood}></Strip>
      );
    });

    return (
      <div className="board">
        {strips}
      </div>
    );
  }
});

ReactDOM.render(
  <Board data={BoardDataModel.strips} />,
  document.querySelector('body')
);
