export class SquareModel {
    row;
    col;
    isMine;
    isClicked;
    surroundingMines;

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isMine = false;
        this.isClicked = false;
        this.isFlagged = false;
        this.surroundingMines = 0;
    }

}