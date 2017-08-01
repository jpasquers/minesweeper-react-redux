export const clickSquare = (sqr) => {
    return {
        type: "CLICK_SQUARE",
        row: sqr.row,
        col: sqr.col
    }
}