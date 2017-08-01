
const addMines = (board, numMines) => {
    let positions = new Set();
    board.map((row, i) => {
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
        board[rowCol[0]][rowCol[1]].isMine = true;
    }
}

const calcSurroundingMinesOneCell = (board, row, col, size) => {
    var count = 0;
    for (var i=row-1; i<row+2; i++) {
        for (var j=col-1; j<col+2; j++) {
            if (i<0 || j<0 || i>=size || j>=size || (i===row && j===col)) {
                continue;
            }
            if (board[i][j].isMine) count++;
        }
    }
    return count;
}

const calcSurroundingMines = (board, size) => {
    for (var i=0; i< board.length; i++) {
        for (var j=0; j< board[0].length; j++) {
            var numSurroundingMines = calcSurroundingMinesOneCell(board, i, j, size);
            board[i][j].surroundingMines = numSurroundingMines;
        }
    }
}

const buildNewBoard = (size, numMines) => {
    var newSquares = new Array(size);
    for (var i=0; i< size; i++) {
        newSquares[i] = new Array(size);
        for (var j=0; j<size; j++) {
            newSquares[i][j] = {
                row: i,
                col: j,
                isClicked: false,
                isMine: false,
                surroundingMines: 0
            }
        }
    }

    addMines(newSquares, numMines);
    calcSurroundingMines(newSquares, size);
    
    return newSquares;
}

const recursivelyRevealEmptySpots = (board, row, col, size) => {
    for (var i=row-1; i<row+2; i++) {
        for (var j=col-1; j<col+2; j++) {
            if (i<0 || j<0 || i>=size || j>=size || (i===row && j===col)) {
                continue;
            }
            if (board[i][j].isClicked) {
                continue;
            }
            else {
                board[i][j].isClicked = true;
                if (board[i][j].surroundingMines === 0) {
                    recursivelyRevealEmptySpots(board, i, j, size);
                }
            }
        }
    }
}

const changeSquareValue = (originalSquares, row, col, size) => {
    var nextSquares = originalSquares.slice();
    nextSquares[row][col].isClicked = true;
    if (nextSquares[row][col].surroundingMines === 0 && !nextSquares[row][col].isMine) {
        recursivelyRevealEmptySpots(nextSquares, row, col, size)
    }
    return nextSquares;
}


const initialState = {
    settings: {
        size: 5,
        numMines: 5
    },
    squares: buildNewBoard(5, 5)
}

export function reduce(state = initialState, action) {
    console.log(action.type);
    switch(action.type) {
        case "CLICK_SQUARE":
            var nextSquares = changeSquareValue(state.squares, action.row, action.col, state.squares.length);
            return Object.assign({}, state, {
                squares: nextSquares
            })
        case "CHANGE_BOARD_SIZE":
            return Object.assign({}, state, {
                settings: {
                    size: action.size,
                    numMines: state.settings.numMines
                }
            })
        case "CHANGE_NUM_MINES":
            return Object.assign({}, state, {
                settings: {
                    size: state.settings.size,
                    numMines: action.numMines
                }
            })
        case "UPDATE_BOARD":
           var newSquares = buildNewBoard(state.settings.size, state.settings.numMines);
           return Object.assign({}, state, {
               squares: newSquares
           })
        default:
            return state
    }
}