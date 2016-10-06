import React from 'react'
import ReactDOM from 'react-dom'

import woods from '../woods.json'

export default class WoodPicker extends React.Component {
  onChangeWood (event) {
    let value = event.currentTarget.id

    this.props.strip.set('wood', value)
    this.props.updateState({}) // using the passed in updateState forces this component and the StripPanel parent to re-render.
    this.forceUpdate()
  }

  render () {
    let currentWood = this.props.strip.get('wood')
    let previewClasses = ['swatch', 'swatch-big', currentWood].join(' ')
    let woodObj = woods[currentWood] || 'Unknown'

    let Woods = Object.keys(woods).map((key, index) => {
      let wood = woods[key]
      let classes = ['swatch', 'swatch-clickable', wood.safeName].join(' ')

      return (
        <li className={classes} id={wood.safeName} key={index} title={wood.name} onClick={this.onChangeWood.bind(this)} data-toggle="tooltip"/>
      )
    })

    return (
      <div className="wood-picker">
        <div className="dropdown">
          <a id="preview" className={previewClasses} data-toggle="dropdown"></a>
          <span className="color-name">{woodObj.name}</span><br/>
          <a className="dropdown-toggle btn btn-sm btn-primary" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Change Wood</a>
          <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
            {Woods}
          </ul>
        </div>
      </div>
    )
  }
}
