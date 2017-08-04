import React, { Component } from 'react';
import './Square.css';
export class Square extends Component {

  squareLogo(square) {
    if (square.isClicked) {
        return <span className={"numMines-" + square.surroundingMines}>{square.surroundingMines}</span>
    }
    else if (square.isFlagged) {
      return <span className="glyphicon glyphicon-flag "></span>
    }
    else {
      return <span className=""></span>
    }
  }


  render() {
    var clickedClass = "";
    if (this.props.square.isClicked) {
      clickedClass = "clicked";
    }
    else {
      clickedClass = "unclicked";
    }
    return (
        <button className={"square-btn " + clickedClass} onClick={this.props.leftClickSquare} onContextMenu={this.props.rightClickSquare}>
            {this.squareLogo(this.props.square)}
        </button>
    );
  }
}