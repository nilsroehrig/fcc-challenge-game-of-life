export function createField(alive = 0) {
    return {
        alive: alive,
        valueOf: () => alive,
        toString: () => String(alive)
    }
}

export function initializeBoard(width, height, random = false) {
    let board = [];
    for (let h = 0; h < height; h++) {
        board[h] = [];
        for (let w = 0; w < width; w++) {
            board[h][w] = createField(random ? Math.floor(Math.random() * 2) : 0);
        }
    }
    return board;
}

function calculateNextField(field, x, y, board) {
    let boardWidth = board[0].length;
    let boardHeight = board.length;

    let sum = 0;

    for (let h = y - 1; h <= y + 1; h++) {
        for (let w = x - 1; w <= x + 1; w++) {
            let newX = (w < 0) ? w + boardWidth : ((w >= boardWidth) ? w - boardWidth : w);
            let newY = (h < 0) ? h + boardHeight : ((h >= boardHeight) ? h - boardHeight : h);
            sum += board[newY][newX];
        }
    }

    let newValue;

    if (sum === 4) {
        newValue = field.alive;
    } else if (sum === 3) {
        newValue = 1;
    } else {
        newValue = 0;
    }

    return createField(newValue);
}

export function calculateNextBoard(board) {
    return board.map((item, y) => item.map((innerItem, x) => calculateNextField(innerItem, x, y, board)));
}