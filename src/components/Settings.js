import React, { Component } from 'react';
import { changeSize, changeNumMines, resetBoard } from '../actions/changeSettingsAction';
import {connect} from 'react-redux';

class SettingsComponent extends Component {
  render() {
    return (
        <div className="settings-container">
          <select value={this.props.size} onChange={this.props.handleSizeChange}>
            <option value="5">5x5</option>
            <option value="10">10x10</option>
            <option value="20">20x20</option>
            <option value="50">50x50</option>  
          </select>

          <input type="text" value={this.props.numMines} onChange={this.props.handleNumMinesChange}/>

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