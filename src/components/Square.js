import React, { Component } from 'react';
import './Square.css';
export class Square extends Component {

  mineLogo(square) {
    if (square.isClicked) {
      if (square.isMine) {
        return <span>X</span>
      } else {
        return <span>{square.surroundingMines}</span>
      }
    }
    else {
      return <span></span>
    }
  }


  render() {
    return (
        <button className="square-btn" onClick={this.props.clickSquare}>
            {this.mineLogo(this.props.square)}
        </button>
    );
  }
}