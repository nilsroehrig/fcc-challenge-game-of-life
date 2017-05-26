import React from 'react';
import ReactDOM from 'react-dom';
import Cell from '../components/cell/Cell';
import Board from '../components/board/Board';
import Controls from '../components/controls/Controls';
import { calculateNextBoard, initializeBoard } from './GameLogic';
import State from './State';

let handlers = {
    handleCellClick: null
};

function renderGame(handlers) {
    let cells = State.board.reduce((acc, row, y) => {
        return acc.concat(row.reduce((innerAcc, cell, x) => {
            let handler = () => {
                handlers.handleCellClick(x, y);
            }
            innerAcc.push(<Cell alive={cell.valueOf()} key={x + 'x' + y} onClick={handler} />);
            return innerAcc;
        }, []));
    }, []);

    ReactDOM.render((
        <div className={`game game--${State.size}`}>
            <header className="page-header"><h1 className="headline">Game of Life</h1></header>
            <div className="game-wrapper">
                <Board cells={cells} size={State.size} />
                <Controls {...State.controls} />
            </div>
            <footer className="page-footer">
                Built in 2017 by&nbsp;
                <a href="http://nroehrig.de">Nils Röhrig</a>&nbsp;
                as a&nbsp;
                <a href="https://freecodecamp.com">freeCodeCamp</a>&nbsp;
                challenge
            </footer>
        </div>
    ), document.querySelector('#root'));
}

function startGame() {
    renderGame(handlers);
    State.setIntervalId(setInterval(() => {
        State.setBoard(calculateNextBoard(State.board));
        State.increaseGeneration();
        renderGame(handlers);
    }, State.intervalTime));
}

function handleClear(e) {
    clearInterval(State.intervalId);
    State.board = initializeBoard(State.width, State.height);
    State.resetGeneration();
    renderGame(handlers);
}

function handlePause(e) {
    clearInterval(State.intervalId);
}

function handleStart(e) {
    startGame();
}

function handleCellClick(x, y) {
    State.setCell(x, y);
    renderGame(handlers);
}

export function start() {
    State.init({
        controls: {
            generation: 0,
            buttons: [{
                label: 'Clear',
                handleClick: handleClear
            }, {
                label: 'Pause',
                handleClick: handlePause
            }, {
                label: 'Start',
                handleClick: handleStart
            }]
        }
    });

    handlers = {
        handleCellClick: handleCellClick
    };

    State.setBoard(initializeBoard(State.width, State.height, true));
    startGame(State);
}