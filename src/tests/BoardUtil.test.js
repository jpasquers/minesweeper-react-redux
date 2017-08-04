
import React from 'react';
import ReactDOM from 'react-dom';
import {BoardUtil } from '../model/BoardUtil';



describe("initSquares ", () => {


    it("size less than 0 returns an empty array", () => {
        var squares = BoardUtil.initSquares(-1);
        expect(squares.length).toEqual(0);
    })

    it("each square has the proper row and column", () => {
        var squares = BoardUtil.initSquares(5);
        for (var i=0; i<5; i++) {
            for (var j=0; j<5; j++) {
                expect(squares[i][j].row).toEqual(i);
                expect(squares[i][j].col).toEqual(j);
            }
        }
    })

})

describe("getAllBoardPositions", () => {
    var squares;
    beforeEach(() => {
        squares = BoardUtil.initSquares(5);
    })

    it("returns a set of 25 items from a size 5 array", () => {
        var positions = BoardUtil.getAllBoardPositions(squares);
        expect(positions.size).toEqual(25);

    })
})

describe("addMines", () => {
    var squares;
    beforeEach(() => {
        squares = BoardUtil.initSquares(5);
    })

    it("the number of mines is equal to numMines", () => {
        var expectedNumMines = 10;
        BoardUtil.addMines(squares, expectedNumMines);
        var actualNumMines = 0;
        squares.map((row) => {
            row.map((square) => {
                if (square.isMine) actualNumMines++;
            })
        })
        expect(actualNumMines).toEqual(expectedNumMines);
    })

    /*with 10 mines in 25 spots, the amount of different options
    is 25*24*23....*16. So the probability of them randomly occurring 
    all in the same spot is not significant*/
    it("the mine placement is different between two runs", () => {
        BoardUtil.addMines(squares, 10);
        var squares2 = BoardUtil.initSquares(5);
        BoardUtil.addMines(squares2, 10);

        var allMinesEqual = true;
        for (var i=0; i<5; i++) {
            for (var j=0; j<5; j++) {
                if (squares[i][j].isMine !== squares2[i][j].isMine) 
                    allMinesEqual = false;
            }
        }

        expect(allMinesEqual).toBe(false);
    })
})

describe("forAllSurroundingCells", () => {

    var count;
    var func;

    beforeEach(() => {
        count = 0;
        func = () => {
            count++;
        }
    })
    
    it("corner spot produces 3 calls", () => {
        BoardUtil.forAllSurroundingCells(func, 0, 0, 5);
        expect(count).toEqual(3);
        count = 0;
        BoardUtil.forAllSurroundingCells(func, 4, 4, 5);
        expect(count).toEqual(3);
    })

    it("side spot produces 5 calls", () => {
        BoardUtil.forAllSurroundingCells(func, 2, 0, 5);
        expect(count).toEqual(5);
        count = 0;
        BoardUtil.forAllSurroundingCells(func, 2, 4, 5);
        expect(count).toEqual(5);
    })

    it("non-corner non-edge produces 8 calls", () => {
        BoardUtil.forAllSurroundingCells(func, 2, 2, 5);
        expect(count).toEqual(8);
    })
})

describe("gameWon", () => {

    var squares;

    beforeEach(() => {
        squares = [
            [
                {
                    row: 0,
                    col: 0,
                    isMine: true,
                    isFlagged: true,
                    isClicked: false
                },
                {
                    row: 0,
                    col: 1,
                    isMine: false,
                    isFlagged: false,
                    isClicked: true
                }
            ],
            [
                {
                    row: 1,
                    col: 0,
                    isMine: true,
                    isFlagged: true,
                    isClicked: false
                },
                {
                    row: 1,
                    col: 1,
                    isMine: false,
                    isFlagged: false,
                    isClicked: true
                }
            ]
        ]
    })

    it("returns true on a won game", () => {
        expect(BoardUtil.gameWon(squares)).toBe(true);
    })

    it("if one mine isn't flagged, game isn't won", () => {
        squares[1][0].isFlagged = false;
        expect(BoardUtil.gameWon(squares)).toBe(false);
    })

    it("if one mine isn't clicked that's not a mine, game isn't won", () => {
        squares[1][1].isClicked = false;
        expect(BoardUtil.gameWon(squares)).toBe(false);
    })
})