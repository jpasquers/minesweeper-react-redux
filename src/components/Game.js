import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Square} from './Square';
import {clickSquare, flagSquare} from '../actions/clickSquareAction';
import { GameStatuses } from '../constants/GameStatuses';
import { resetBoard } from '../actions/changeSettingsAction';


class GameComponent extends Component {

  render() {
    return (
      <div>
        {this.renderStatus()}
        {this.renderSquareRows()}
      </div>
    );
  }

  renderStatus() {
    if (this.props.status == GameStatuses.DEFEAT) {
      return (
        <div>
          You lost! click here to play again
          <button onClick={this.props.restartGame}> Play again </button>
        </div>
      )
    }
    else if (this.props.status == GameStatuses.VICTORY) {
      return (
        <div>
          Congrats, you won! click here to play again
          <button onClick={this.props.restartGame}> Play again </button>
        </div>
      )
    }
    else {
      return (
        <div> Ur in game right now </div>
      )
    }
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
      return <Square 
        key={j} 
        square={sqr} 
        leftClickSquare={() => this.props.registerLeftClick(sqr)}
        rightClickSquare={(e) => {e.preventDefault(); this.props.registerRightClick(sqr); }}/>
    })
  }
}

const mapStateToProps = (state) => {
  return {
    squares: state.squares,
    status: state.gameStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerLeftClick: (sqr) => {
      dispatch(clickSquare(sqr));
    },
    restartGame: () => {
      dispatch(resetBoard());
    },
    registerRightClick: (sqr) => {
      dispatch(flagSquare(sqr));
    }
  }
}



export const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameComponent);



