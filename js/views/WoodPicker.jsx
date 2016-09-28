import React from 'react'
import ReactDOM from 'react-dom'

import woods from '../woods.json'

export default class WoodPicker extends React.Component {
  onChangeWood (event) {
    let value = event.currentTarget.id

    this.props.strip.set('wood', value)
    //we were calling passed in updateState func that did setState({wood: value}), but since the parent (StripPanel) doesnt use that state param itself, it's sort of pointless. Just call forceUpdate()
    this.forceUpdate()
  }

  render () {
    let currentWood = this.props.strip.get('wood')
    let previewClasses = ['swatch', currentWood].join(' ')
    let woodObj = woods[currentWood] || 'Unknown'

    let Woods = Object.keys(woods).map((key, index) => {
      let wood = woods[key]
      let classes = ['swatch', 'swatch-clickable', wood.safeName].join(' ')

      return (
        <li className={classes} id={wood.safeName} key={index} title={wood.name} onClick={this.onChangeWood.bind(this)} />
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
