export const clickSquare = (sqr) => {
    //
    return {
        type: "CLICK_SQUARE",
        row: sqr.row,
        col: sqr.col
    }
}

export const flagSquare = (sqr) => {
    return {
        type: "FLAG_SQUARE",
        row: sqr.row,
        col: sqr.col
    }
}