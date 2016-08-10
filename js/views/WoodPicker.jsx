import React from 'react'
import ReactDOM from 'react-dom'

import woods from '../woods.json'

export default class WoodPicker extends React.Component {
  changeWood (event) {
    this.props.strip.set('wood', event.currentTarget.id)
  }

  render () {
    let currentWood = this.props.strip.get('wood')
    let previewClasses = ['swatch', currentWood].join(' ')
    let currentWoodObj = woods[currentWood] || 'Unknown'

    let Woods = Object.keys(woods).map((key, index) => {
      let wood = woods[key]
      let classes = ['swatch', 'swatch-clickable', wood.safeName].join(' ')

      return (
        <li className={classes} id={wood.safeName} key={index} title={wood.name} onClick={this.changeWood.bind(this)} />
      )
    })

    return (
      <div className="wood-picker">
        <div id="preview" className={previewClasses}></div>
        <span id="color-name">{currentWoodObj.name}</span>
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
