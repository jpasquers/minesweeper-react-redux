import {SquareModel } from './SquareModel';

export class BoardModel {
    squares;
    size;
    numMines;

    constructor(size, numMines) {
        this.size = size;
        this.numMines = numMines;

        this.initSquares(this.size);
        this.addMines();
        this.calcSurroundingMines();
    }

    initSquares(size) {
        this.squares = new Array(size);
        for (var i=0; i< size; i++) {
            this.squares[i] = new Array(size);
            for (var j=0; j<size; j++) {
                this.squares[i][j] = new SquareModel(i,j);
            }
        }
    }

    addMines() {
        let positions = new Set();
        this.squares.map((row, i) => {
            row.map((col, j) => {
                positions.add([i, j]);
                return col;
            })
            return row;
        })

        for (var i=this.numMines; i>0; i--) {
            var randNum = Math.floor(Math.random() * positions.size);
            var positionsAsArray = Array.from(positions);
            var rowCol = positionsAsArray[randNum];
            positions.delete(rowCol);
            this.squares[rowCol[0]][rowCol[1]].isMine = true;
        }
    }

    calcSurroundingMinesOneCell(row, col) {
        var count = 0;
        this.forAllSurroundingCells((i, j) => {
            if (this.squares[i][j].isMine) count++;
        }, row, col)
        return count;
    }

    calcSurroundingMines() {
        for (var i=0; i< this.squares.length; i++) {
            for (var j=0; j< this.squares[0].length; j++) {
                this.squares[i][j].surroundingMines = this.calcSurroundingMinesOneCell(i, j);
            }
        }
    }

    forAllSurroundingCells (callFn, row, col) {
        for (var i=row-1; i<row+2; i++) {
            for (var j=col-1; j<col+2; j++) {
                if (i<0 || j<0 || i>=this.size || j>=this.size || (i===row && j===col)) {
                    continue;
                }

                callFn(i, j);
            }
        }
    }

    recursivelyRevealEmptySpots = (row, col) => {

        this.forAllSurroundingCells((i, j) => {
            if (this.squares[i][j].isClicked) {
                return;
            } 
            else {
                this.squares[i][j].isClicked = true;
                if (this.squares[i][j].surroundingMines === 0) {
                    this.recursivelyRevealEmptySpots();
                }
            }
        }, row, col)
    }

    changeSquareValue(row, col) {
        this.squares = this.squares.slice();
        this.squares[row][col].isClicked = true;
        if (this.squares[row][col].surroundingMines === 0 && !this.squares[row][col].isMine) {
            this.recursivelyRevealEmptySpots(this.squares, row, col, this.size)
        }
    }
}