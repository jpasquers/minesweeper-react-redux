import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Square} from './Square';
import {clickSquare} from '../actions/clickSquareAction';

class GameComponent extends Component {

  render() {
    return (
      <div>
        {this.renderSquareRows()}
      </div>
    );
  }

  renderSquareRows() {
    return this.props.squares.map((squareRow, i) => {
      return (
        <div key={i}>
          {this.renderSquaresInRow(squareRow)}
        </div>
      )
    })
  }

  renderSquaresInRow(squareRow) {
    return squareRow.map((sqr, j) => {
      return <Square key={j} square={sqr} clickSquare={() => this.props.registerClick(sqr)}/>
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
    registerClick: (sqr) => {
      dispatch(clickSquare(sqr));
    }
  }
}



export const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameComponent);



