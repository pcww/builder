import React from 'react'

export default class StepPagination extends React.Component {
  handleClick (event) {
    console.log('clicked!', event.target.classList.contains('next'))
  }

  render () {
    return (
      <nav class="fuckit">
        <button className="btn btn-default previous" onClick={this.handleClick}>
          <i className="fa fa-chevron-circle-left"></i>
          Back
        </button>

        <button className="btn btn-default next" onClick={this.handleClick}>
          Next
          <i className="fa fa-chevron-circle-right"></i>
        </button>
      </nav>
    )
  }
}
