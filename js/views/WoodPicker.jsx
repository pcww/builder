import React from 'react'
import ReactDOM from 'react-dom'

import woods from '../woods.json'

export default class WoodPicker extends React.Component {
  render () {
    let previewClasses = ['swatch', this.props.currentWood].join(' ')

    let Woods = Object.keys(woods).map((key, index) => {
      let wood = woods[key]
      let classes = ['swatch', 'swatch-clickable', wood.safeName].join(' ')

      return (
        <li className={classes} id={wood.safeName} key={index} title={wood.name} />
      )
    })

    return (
      <div className="wood-picker">
        <div id="preview" className={previewClasses}></div>
        <a className="dropdown-toggle btn btn-default" data-toggle="dropdown">Change Wood</a>
        <ul className="dropdown-menu" role="menu">
          {Woods}
        </ul>
      </div>
    )
  }
}