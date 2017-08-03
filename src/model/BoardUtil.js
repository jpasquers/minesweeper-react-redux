import {SquareModel } from './SquareModel';

export class BoardUtil {

    static makeNewBoard(size, numMines) {
        var squares = BoardUtil.initSquares(size);
        BoardUtil.addMines(squares, numMines);
        BoardUtil.calcSurroundingMines(squares);
        return squares;
    }

    static initSquares(size) {
        var squares = new Array(size);
        for (var i=0; i< size; i++) {
            squares[i] = new Array(size);
            for (var j=0; j<size; j++) {
                squares[i][j] = new SquareModel(i,j);
            }
        }
        return squares;
    }

    static addMines(squares, numMines) {
        console.log(squares);
        let positions = new Set();
        squares.map((row, i) => {
            row.map((col, j) => {
                positions.add([i, j]);
                return col;
            })
            return row;
        })

        for (var i=numMines; i>0; i--) {
            var randNum = Math.floor(Math.random() * positions.size);
            var positionsAsArray = Array.from(positions);
            var rowCol = positionsAsArray[randNum];
            positions.delete(rowCol);
            squares[rowCol[0]][rowCol[1]].isMine = true;
        }
    }

    static calcSurroundingMinesOneCell(squares, row, col) {
        var count = 0;
        BoardUtil.forAllSurroundingCells((i, j) => {
            if (squares[i][j].isMine) count++;
        }, row, col, squares.length)
        return count;
    }

    static calcSurroundingMines(squares) {
        for (var i=0; i< squares.length; i++) {
            for (var j=0; j< squares[0].length; j++) {
                squares[i][j].surroundingMines = BoardUtil.calcSurroundingMinesOneCell(squares,i, j);
            }
        }
    }

    static forAllSurroundingCells (callFn, row, col, size) {
        for (var i=row-1; i<row+2; i++) {
            for (var j=col-1; j<col+2; j++) {
                if (i<0 || j<0 || i>=size || j>=size || (i===row && j===col)) {
                    continue;
                }
                callFn(i, j);
            }
        }
    }

    static recursivelyRevealEmptySpots = (squares, row, col) => {

        BoardUtil.forAllSurroundingCells((i, j) => {
            if (squares[i][j].isClicked) {
                return;
            } 
            else {
                squares[i][j].isClicked = true;
                if (squares[i][j].surroundingMines === 0) {
                    BoardUtil.recursivelyRevealEmptySpots(squares, i, j);
                }
            }
        }, row, col, squares.length)
    }

    static changeSquareValue(squares,row, col) {
        var newSquares = squares.slice();
        newSquares[row][col].isClicked = true;
        if (newSquares[row][col].surroundingMines === 0 && !newSquares[row][col].isMine) {
            BoardUtil.recursivelyRevealEmptySpots(newSquares, row, col)
        }
        return newSquares;
    }

    static gameWon(squares) {
        var gameWon = true;
        for (var i=0; i< squares.length; i++) {
            for (var j=0; j<squares[i].length; j++) {
                var square = squares[i][j];
                if ((square.isMine && !square.isFlagged) || (!square.isMine && !square.isClicked)) {
                    gameWon = false;
                }
            }
        }

        return gameWon;
    }

    static flagSquare(squares, row, col) {
        var newSquares = squares.slice();
        newSquares[row][col].isFlagged = !newSquares[row][col].isFlagged;
        return newSquares;
    }
}