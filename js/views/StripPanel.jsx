import React from 'react'
import ReactDOM from 'react-dom'

export default class StripPanel extends React.Component {
  render () {
    let classes = ['swatch', 'swatch-mini', this.props.wood].join(' ')

    return (
      <div class="panel-group" id="strip-list" role="tablist" aria-multiselectable="true">
        <div class="panel panel-default">
          <div class="panel-heading" role="tab" id="headingOne">
            <h4 class="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#strip-list" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <i class="fa drag-handle fa-bars" aria-hidden="true"></i>
                {this.props.wood}
                <div className={classes}></div>
              </a>
            </h4>
          </div>
          <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">
              <fieldset>
                <legend>Wood Type</legend>

                <table class="wood-picker">
                  <tbody>
                    <tr>
                      <td style={{'paddingRight': '5px'}}>
                        <div id="preview" class="swatch purpleheart"></div>
                      </td>
                      <td>
                        <span id="color-name">Purpleheart</span><br />
                        <input id="color-field" defaultValue="Red" style={{'display': 'none'}} />
                        <div class="dropdown">
                          <a class="dropdown-toggle btn btn-default" data-toggle="dropdown" href="#" style={{'color': '#000'}}>Change Wood</a>
                          <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                            <table>
                              <tbody>
                                <tr>
                                  <td><div id="African Mohogany" class="swatch swatch-clickable african-mohogany"></div></td>
                                  <td><div id="Ash" class="swatch swatch-clickable ash"></div></td>
                                  <td><div id="Brazilian Cherry" class="swatch swatch-clickable brazilian-cherry"></div></td>
                                  <td><div id="Bubinga" class="swatch swatch-clickable bubinga"></div></td>
                                  <td><div id="Cherry" class="swatch swatch-clickable cherry"></div></td>
                                  <td><div id="Cocobolo" class="swatch swatch-clickable cocobolo"></div></td>
                                </tr>
                                <tr>
                                  <td><div id="Hickory" class="swatch swatch-clickable hickory"></div></td>
                                  <td><div id="Lacewood" class="swatch swatch-clickable lacewood"></div></td>
                                  <td><div id="Lyptus" class="swatch swatch-clickable lyptus"></div></td>
                                  <td><div id="Maple" class="swatch swatch-clickable maple"></div></td>
                                  <td><div id="Oak Red" class="swatch swatch-clickable oak-red"></div></td>
                                  <td><div id="Oak White" class="swatch swatch-clickable oak-white"></div></td>
                                </tr>
                                <tr>
                                  <td><div id="Padauk" class="swatch swatch-clickable padauk"></div></td>
                                  <td><div id="Purpleheart" class="swatch swatch-clickable purpleheart"></div></td>
                                  <td><div id="Walnut" class="swatch swatch-clickable walnut"></div></td>
                                  <td><div id="Wenge" class="swatch swatch-clickable wenge"></div></td>
                                  <td><div id="Yellowheart" class="swatch swatch-clickable yellowheart"></div></td>
                                  <td><div id="Zembrano" class="swatch swatch-clickable zembrano"></div></td>
                                </tr>
                              </tbody>
                            </table>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>

              <fieldset>
                <legend>Strip Width</legend>

                <label class="radio-inline">
                  <input id="strip-size-1" name="wood-size" type="radio" defaultValue="xsmall" defaultChecked="checked" />
                  Extra Extra Small
                </label>

                <label class="radio-inline">
                  <input id="strip-size-1" name="wood-size" type="radio" defaultValue="small" />
                  Extra Small
                </label>

                <label class="radio-inline">
                  <input id="strip-size-1" name="wood-size" type="radio" defaultValue="small" />
                  Small
                </label>

                <label class="radio-inline">
                  <input id="strip-size-1" name="wood-size" type="radio" defaultValue="medium" />
                  Medium
                </label>

                <label class="radio-inline">
                  <input id="strip-size-1" name="wood-size" type="radio" defaultValue="large" />
                  Large
                </label>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
