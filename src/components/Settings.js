import React, { Component } from 'react';
import { changeSize, changeNumMines, resetBoard } from '../actions/changeSettingsAction';
import {connect} from 'react-redux';

class SettingsComponent extends Component {
  render() {
    return (
        <div className="settings-container">
          <table>
            <tr>
              <td>Grid Size:</td>
              <td>
                <select className="form-control" value={this.props.size} onChange={this.props.handleSizeChange}>
                  <option value="5">5 x 5</option>
                  <option value="10">10 x 10</option>
                  <option value="15">15 x 15</option>
                  <option value="20">20 x 20</option>  
                </select>
              </td>
            </tr>
            <tr>
              <td>Number Of Mines</td>
              <td>
                <input type="text" value={this.props.numMines} onChange={this.props.handleNumMinesChange}/>
              </td>
            </tr>
          </table>
          <button onClick={this.props.resetBoard}>Update (and reset) Board</button>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    size: state.settings.size,
    numMines: state.settings.numMines
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSizeChange: (event) => {
      dispatch(changeSize(event.target.value));
    },
    handleNumMinesChange: (event) => {
      dispatch(changeNumMines(event.target.value));
    },
    resetBoard: () => {
      dispatch(resetBoard());
    }
  }
}



export const Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsComponent);