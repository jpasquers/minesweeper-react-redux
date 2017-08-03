import { BoardModel } from '../model/BoardModel';
import { SquareModel } from '../model/SquareModel';

const initialState = {
    settings: {
        size: 5,
        numMines: 5
    },
    board: new BoardModel(5, 5)
}

export function reduce(state = initialState, action) {
    console.log(action.type);
    switch(action.type) {
        case "CLICK_SQUARE":
            state.board.changeSquareValue(action.row, action.col);
            return Object.assign({}, state);
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
           var board = new BoardModel(state.settings.size, state.settings.numMines);
           return Object.assign({}, state, {
               board: board
           })
        default:
            return state
    }
}