import React, { Component } from 'react';
import './Square.css';
export class Square extends Component {

  mineLogo(square) {
    if (square.isClicked) {
        return <span>{square.surroundingMines}</span>
    }
    else if (square.isFlagged) {
      return <span>F</span>
    }
    else {
      return <span></span>
    }
  }


  render() {
    return (
        <button className="square-btn" onClick={this.props.leftClickSquare} onContextMenu={this.props.rightClickSquare}>
            {this.mineLogo(this.props.square)}
        </button>
    );
  }
}