import { createField } from './GameLogic';

export const State = {
    init(obj) {
        let defaults = {
            width: 50,
            height: 30,
            board: [],
            intervalId: null,
            size: 'sm',
            intervalTime: 100,
            controls: {
                generation: 0,
                buttons: []
            }
        };
        let merge = Object.assign(defaults, obj);
        let keys = Object.keys(merge);
        keys.forEach(key => this[key] = merge[key]);
    },

    increaseGeneration() {
        this.controls.generation = this.controls.generation + 1;
    },

    resetGeneration() {
        this.controls.generation = 0;
    },

    setBoard(newBoard) {
        this.board = newBoard;
    },

    setIntervalId(intervalId) {
        this.intervalId = intervalId;
    },

    setCell(x, y) {
        let newBoard = this.board.map(row => row.slice());

        if (newBoard[y][x].valueOf() === 1) {
            newBoard[y][x] = createField(0);
        } else {
            newBoard[y][x] = createField(1);
        }
        
        this.setBoard(newBoard);
    }
};

export default State;