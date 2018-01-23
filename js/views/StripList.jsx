import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'





import StripPanel from 'views/StripPanel.jsx'






class StripList extends React.Component {
  render () {
    const {
      removeStrip,
      strips,
    } = this.props

    return (
      <ol
        aria-multiselectable="true"
        className="sortable-list panel-group"
        id="strip-list"
        role="tablist">
        {strips.map((strip, key) => {
          return (
            <StripPanel
              canRemoveStrip={() => strips.length > 1}
              cid={strip.cid}
              index={key}
              key={key}
              removeStrip={removeStrip}
              strip={strip} />
          )
        })}
      </ol>
    )
  }
}





export default SortableContainer(StripList)