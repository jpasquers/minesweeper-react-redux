import { BoardUtil } from '../model/BoardUtil';
import { SquareModel } from '../model/SquareModel';
import { GameStatuses } from '../constants/GameStatuses';

const initialState = {
    settings: {
        size: 5,
        numMines: 5
    },
    gameStatus: GameStatuses.IN_GAME,
    squares: BoardUtil.makeNewBoard(5,5)
}

export function reduce(state = initialState, action) {
    switch(action.type) {
        case "CLICK_SQUARE":
            if (state.squares[action.row][action.col].isMine) {
                return Object.assign({}, state, {
                    gameStatus: GameStatuses.DEFEAT
                })
            }
            else {
                var newSquares = BoardUtil.changeSquareValue(state.squares, action.row, action.col);
                if (BoardUtil.gameWon(newSquares)) {
                    return Object.assign({}, state, {
                        gameStatus: GameStatuses.VICTORY,
                        squares: newSquares
                    })
                }
                else {
                    return Object.assign({}, state, {
                        squares: newSquares
                    });
                }   
            }
        case "FLAG_SQUARE":
            var newSquares = BoardUtil.flagSquare(state.squares, action.row, action.col)
            if (BoardUtil.gameWon(newSquares)) {
                return Object.assign({}, state, {
                    gameStatus: GameStatuses.VICTORY,
                    squares: newSquares
                })
            }
            else {
                return Object.assign({}, state, {
                    squares: newSquares
                })
            }
            
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
        case "RESET_BOARD":
           var newSquares = BoardUtil.makeNewBoard(state.settings.size, state.settings.numMines);
           return Object.assign({}, state, {
               squares: newSquares,
               gameStatus: GameStatuses.IN_GAME
           })
        default:
            return state
    }
}