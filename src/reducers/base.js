import { BoardUtil } from '../model/BoardUtil';
import { SquareModel } from '../model/SquareModel';

const initialState = {
    settings: {
        size: 5,
        numMines: 5
    },
    squares: BoardUtil.makeNewBoard(5,5)
}

export function reduce(state = initialState, action) {
    switch(action.type) {
        case "CLICK_SQUARE":
            var newSquares = BoardUtil.changeSquareValue(state.squares, action.row, action.col);
            return Object.assign({}, state, {
                squares: newSquares
            });
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
           var newSquares = BoardUtil.makeNewBoard(state.settings.size, state.settings.numMines);
           return Object.assign({}, state, {
               squares: newSquares
           })
        default:
            return state
    }
}