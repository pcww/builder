import React from 'react'
import ReactDOM from 'react-dom'

import woods from '../woods.json'

export default class WoodPicker extends React.Component {
  render () {
    let previewClasses = ['swatch', this.props.currentWood].join(' ')
    let currentWood = woods[this.props.currentWood] || 'Unknown'

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
        <span id="color-name">{currentWood.name}</span>
        <div className="dropdown">
          <a className="dropdown-toggle btn btn-sm btn-default" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Change Wood</a>
          <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
            {Woods}
          </ul>
        </div>
      </div>
    )
  }
}
