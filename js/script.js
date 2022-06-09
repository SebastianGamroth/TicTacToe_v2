let fiels = [];
let fielsArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let winner;
let gameOver = false;
let currentShape = 'cross';
let lineID;

function fillShape(id) {
    if (!fiels[id] && !gameOver) {
        if (currentShape == 'cross') {
            currentShape = 'circle';
            document.getElementById('player-1').classList.remove('player-inactive');
            document.getElementById('player-2').classList.add('player-inactive');
        } else {
            currentShape = 'cross';
            document.getElementById('player-1').classList.add('player-inactive');
            document.getElementById('player-2').classList.remove('player-inactive');
        }

        fiels[id] = currentShape;
        draw(id);
        checkForWin();
    }
}

function draw(id) {
    document.getElementById(currentShape + '-' + id).classList.remove('d-none');
}

function checkForWin() {
    for (let i = 0; i < fielsArray.length; i++) {
        let elem = fielsArray[i];
        checkFiels(elem[0], elem[1], elem[2], i);
    }

    if (winner) {
        gameOver = true;

        setTimeout(function () {
            document.getElementById('game-over').classList.remove('d-none');
            document.getElementById('restart-btn').classList.remove('d-none');
        }, 500);
    }
}

function checkFiels(nr1, nr2, nr3, i) {
    if (fiels[nr1] == fiels[nr2] && fiels[nr2] == fiels[nr3] && fiels[nr1]) {

        if (i <= 2) {
            document.getElementById('line-' + i).style.transform = 'scaleX(1)';
        }
        if (i >= 3 && i <= 5) {
            console.log(i)
            document.getElementById('line-' + i).style.transform = 'rotate(90deg) scaleX(1)';
        }
        if (i == 6) {
            document.getElementById('line-' + i).style.transform = 'rotate(45deg) scaleX(1.2)';
        }
        if (i == 7) {
            document.getElementById('line-' + i).style.transform = 'rotate(-45deg) scaleX(1.2)';
        }

        lineID = i;
        winner = fiels[nr1];
        return winner;
    }
}

function restart() {
    gameOver = false;
    fiels = [];
    winner = false;
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');

    document.getElementById('line-' + lineID).style.transform = '';

    for (let i = 0; i < 9; i++) {
        document.getElementById('circle-' + i).classList.add('d-none');
        document.getElementById('cross-' + i).classList.add('d-none');
    }
}