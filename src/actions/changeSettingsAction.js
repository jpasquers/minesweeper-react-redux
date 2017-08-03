export const changeSize = (newSize) => {
    return {
        type: "CHANGE_BOARD_SIZE",
        size: newSize
    }
}

export const changeNumMines = (newNumMines) => {
    return {
        type: "CHANGE_NUM_MINES",
        numMines: newNumMines
    }
}

export const resetBoard = () => {
    return {
        type: "RESET_BOARD"
    }
}