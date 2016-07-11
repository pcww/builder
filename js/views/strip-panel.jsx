import React from 'react'
import ReactDOM from 'react-dom'

import BoardDataModel from './boardDataModel.json'

class StripPanel extends React.component {
  render () {
    let classList = ['strip', this.props.size, this.props.wood].join(' ')

    return (
      <div className={classList}></div>

        <div class="panel panel-default">
          <div class="panel-heading" role="tab" id="headingTwo">
            <h4 class="panel-title">
              <a class="collapsed" role="button" data-toggle="collapse" data-parent="#strip-list" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <i class="fa drag-handle fa-bars" aria-hidden="true"></i> Strip #2 <div class="swatch swatch-mini maple"></div>
              </a>
            </h4>
          </div>
          <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div class="panel-body">
              [...]
            </div>
          </div>
        </div>

    )
  }
}
