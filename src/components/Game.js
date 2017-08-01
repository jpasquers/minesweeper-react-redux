import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Square} from './Square';

class GameCls extends Component {
  render() {
    return (
      <div>
        {this.renderSquares()}
      </div>
    );
  }

  renderSquares() {
    return this.props.squares.map(() => {
      return <Square/>
    })
  }
}

const mapStateToProps = (state) => {
  return {
    squares: state.squares
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}



export const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameCls);;



