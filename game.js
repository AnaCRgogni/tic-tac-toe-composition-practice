// Patron modular: Se declara una unica variable local que corresponde con el nombre del modulo. 
// Contiene una funcion autoejecutable que devuelve un objeto con la funcionalidad que necesitamos. 
// Variables internas son propiedades y las funciones son metodos. 
// La funcion una vez autoiniciada, esta disponible en otras partes de la aplicacion. 

const BoardModule = (function () {
    // Define el prototipo

    // La forma BoardModule.prototype.logBoard = ... se usa cuando se definen clases o funciones constructoras tradicionales 
    // en JavaScript, no cuando se usa el patrón de módulo con IIFE y objetos literales.
    const boardProto = {
        logBoard() {
            // Solo se usa 'this' dentro de métodos que están en el prototipo
            this.matrix.forEach(row => console.log(row));
            console.log('');
        }
    };

    // Factory function para crear el board
    function createBoard() {
        let matrix = [];
        for (let i = 0; i < 3; i++) {
            matrix[i] = [];
            for (let j = 0; j < 3; j++) {
                // Row - Column
                matrix[i][j] = ' ';
            }
        }
        const board = Object.create(boardProto);
        board.matrix = matrix;
        // board is the object and matrix is a property inside of it
        return board;
    }

    // Expone solo la factory function, ejemplo de privacy 
    return {
        createBoard
    };
})();

const PlayerModule = (function () {
    const playerProto = {
        logPlayer() {
            console.log(`${this.playerType} has markers of the type: ${this.markerType} with a total counter of: ${this.markerCounter}`);
        }
    };

    function createPLayer(playerType, markerType, markerCounter) {
        const player = Object.create(playerProto);
        player.playerType = playerType;
        player.markerType = markerType;
        player.markerCounter = markerCounter;
        return player;
    }

    return {
        createPLayer
    };
})();

const LogicModule = (function () {
    function checkMatrixRows(board) {
        let results = [];
        for (let row = 0; row <= 2; row++) {
            let playerMarkCounter = 0;
            let emptyColumns = [];
            for (let column = 0; column <= 2; column++) {
                if (board.matrix[row][column] === 'O') {
                    playerMarkCounter++;
                } else if (board.matrix[row][column] === ' ') {
                    emptyColumns.push(column);
                }
            }
            results.push({ row, playerMarkCounter, emptyColumns });
        }
        return results;
    }

    function checkMatrixColumns(board) {
        let results = [];
        for (let col = 0; col <= 2; col++) {
            let playerMarkCounter = 0;
            let emptyRows = [];
            for (let row = 0; row <= 2; row++) {
                if (board.matrix[row][col] === 'O') {
                    playerMarkCounter++;
                } else if (board.matrix[row][col] === ' ') {
                    emptyRows.push(row);
                }
            }
            results.push({ col, playerMarkCounter, emptyRows });
        }
        return results;
    }

    function checkMatrixDiagonals(board) {
        // Diagonal principal
        let mainDiagCounter = 0;
        let mainDiagEmpty = [];
        for (let i = 0; i <= 2; i++) {
            if (board.matrix[i][i] === 'O') {
                mainDiagCounter++;
            } else if (board.matrix[i][i] === ' ') {
                mainDiagEmpty.push(i);
            }
        }

        // Diagonal secundaria
        let secDiagCounter = 0;
        let secDiagEmpty = [];
        for (let i = 0; i <= 2; i++) {
            if (board.matrix[i][2 - i] === 'O') {
                secDiagCounter++;
            } else if (board.matrix[i][2 - i] === ' ') {
                secDiagEmpty.push(i);
            }
        }
        return {
            main: { playerMarkCounter: mainDiagCounter, emptyIndexes: mainDiagEmpty },
            secondary: { playerMarkCounter: secDiagCounter, emptyIndexes: secDiagEmpty }
        };
    }

    function machineTurn(board, player) {
        // 1. Intentar ganar (buscar dos 'X' y un espacio)
        // Filas
        for (let row = 0; row < 3; row++) {
            let count = 0, empty = -1;
            for (let col = 0; col < 3; col++) {
                if (board.matrix[row][col] === player.markerType) count++;
                else if (board.matrix[row][col] === ' ') empty = col;
            }
            if (count === 2 && empty !== -1) {
                board.matrix[row][empty] = player.markerType;
                return;
            }
        }
        // Columnas
        for (let col = 0; col < 3; col++) {
            let count = 0, empty = -1;
            for (let row = 0; row < 3; row++) {
                if (board.matrix[row][col] === player.markerType) count++;
                else if (board.matrix[row][col] === ' ') empty = row;
            }
            if (count === 2 && empty !== -1) {
                board.matrix[empty][col] = player.markerType;
                return;
            }
        }
        // Diagonal principal
        {
            let count = 0, empty = -1;
            for (let i = 0; i < 3; i++) {
                if (board.matrix[i][i] === player.markerType) count++;
                else if (board.matrix[i][i] === ' ') empty = i;
            }
            if (count === 2 && empty !== -1) {
                board.matrix[empty][empty] = player.markerType;
                return;
            }
        }
        // Diagonal secundaria
        {
            let count = 0, empty = -1;
            for (let i = 0; i < 3; i++) {
                if (board.matrix[i][2 - i] === player.markerType) count++;
                else if (board.matrix[i][2 - i] === ' ') empty = i;
            }
            if (count === 2 && empty !== -1) {
                board.matrix[empty][2 - empty] = player.markerType;
                return;
            }
        }

        // 2. Bloquear al humano (buscar dos 'O' y un espacio)
        // Filas
        for (let row = 0; row < 3; row++) {
            let count = 0, empty = -1;
            for (let col = 0; col < 3; col++) {
                if (board.matrix[row][col] === humanPlayer.markerType) count++;
                else if (board.matrix[row][col] === ' ') empty = col;
            }
            if (count === 2 && empty !== -1) {
                board.matrix[row][empty] = player.markerType;
                return;
            }
        }
        // Columnas
        for (let col = 0; col < 3; col++) {
            let count = 0, empty = -1;
            for (let row = 0; row < 3; row++) {
                if (board.matrix[row][col] === humanPlayer.markerType) count++;
                else if (board.matrix[row][col] === ' ') empty = row;
            }
            if (count === 2 && empty !== -1) {
                board.matrix[empty][col] = player.markerType;
                return;
            }
        }
        // Diagonal principal
        {
            let count = 0, empty = -1;
            for (let i = 0; i < 3; i++) {
                if (board.matrix[i][i] === humanPlayer.markerType) count++;
                else if (board.matrix[i][i] === ' ') empty = i;
            }
            if (count === 2 && empty !== -1) {
                board.matrix[empty][empty] = player.markerType;
                return;
            }
        }
        // Diagonal secundaria
        {
            let count = 0, empty = -1;
            for (let i = 0; i < 3; i++) {
                if (board.matrix[i][2 - i] === humanPlayer.markerType) count++;
                else if (board.matrix[i][2 - i] === ' ') empty = i;
            }
            if (count === 2 && empty !== -1) {
                board.matrix[empty][2 - empty] = player.markerType;
                return;
            }
        }

        // 3. Si no hay jugada ganadora ni bloqueo, elige un campo vacío aleatorio
        let emptyCells = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board.matrix[row][col] === ' ') {
                    emptyCells.push([row, col]);
                }
            }
        }
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const [row, col] = emptyCells[randomIndex];
            board.matrix[row][col] = player.markerType;
        }
    }

    function checkWinner(board) {
        // Checa filas
        for (let row = 0; row <= 2; row++) {
            if (
                board.matrix[row][0] !== ' ' &&
                board.matrix[row][0] === board.matrix[row][1] &&
                board.matrix[row][1] === board.matrix[row][2]
            ) {
                const winnerMarker = board.matrix[row][0];
                const winnerName = winnerMarker === humanPlayer.markerType ? humanPlayer.playerType : machinePlayer.playerType;
                return winnerName;
            }
        }
        // Checa columnas
        for (let col = 0; col <= 2; col++) {
            if (
                board.matrix[0][col] !== ' ' &&
                board.matrix[0][col] === board.matrix[1][col] &&
                board.matrix[1][col] === board.matrix[2][col]
            ) {
                const winnerMarker = board.matrix[0][col];
                const winnerName = winnerMarker === humanPlayer.markerType ? humanPlayer.playerType : machinePlayer.playerType;
                return winnerName;
            }
        }
        // Checa diagonal principal
        if (
            board.matrix[0][0] !== ' ' &&
            board.matrix[0][0] === board.matrix[1][1] &&
            board.matrix[1][1] === board.matrix[2][2]
        ) {
            const winnerMarker = board.matrix[0][0];
            const winnerName = winnerMarker === humanPlayer.markerType ? humanPlayer.playerType : machinePlayer.playerType;
            return winnerName;
        }
        // Checa diagonal secundaria
        if (
            board.matrix[0][2] !== ' ' &&
            board.matrix[0][2] === board.matrix[1][1] &&
            board.matrix[1][1] === board.matrix[2][0]
        ) {
            const winnerMarker = board.matrix[0][2];
            const winnerName = winnerMarker === humanPlayer.markerType ? humanPlayer.playerType : machinePlayer.playerType;
            return winnerName;
        }
        // Checa empate
        let isDraw = true;
        for (let row = 0; row <= 2; row++) {
            for (let col = 0; col <= 2; col++) {
                if (board.matrix[row][col] === ' ') {
                    isDraw = false;
                }
            }
        }
        if (isDraw) {
            return 'draw';
        }
        // Si no hay ganador ni empate
        return null;
    }

    return {
        machineTurn,
        checkWinner
    };
})();

const UIModule = (function () {
    const boardDiv = document.getElementById('game-board');
    const messageDiv = document.getElementById('message');
    const restartBtn = document.getElementById('restart-btn');

    function renderBoard(board) {
        boardDiv.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.textContent = ''; // Limpia texto
                if (board.matrix[i][j] === 'O') {
                    cell.setAttribute('data-emoji', '🟢');
                } else if (board.matrix[i][j] === 'X') {
                    cell.setAttribute('data-emoji', '🍋');
                } else {
                    cell.setAttribute('data-emoji', '');
                }
                cell.addEventListener('click', onCellClick);
                boardDiv.appendChild(cell);
            }
        }
    }

    function onCellClick(e) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        if (myBoard.matrix[row][col] !== ' ') return;

        myBoard.matrix[row][col] = humanPlayer.markerType;
        renderBoard(myBoard);

        let winner = LogicModule.checkWinner(myBoard);
        if (winner) {
            endGame(winner);
            return;
        }

        LogicModule.machineTurn(myBoard, machinePlayer);
        renderBoard(myBoard);

        winner = LogicModule.checkWinner(myBoard);
        if (winner) {
            endGame(winner);
        }
    }

    function endGame(winner) {
        if (winner === 'draw') {
            messageDiv.textContent = "It's a draw!";
        } else {
            messageDiv.textContent = `${winner} wins!`;
        }
        Array.from(document.getElementsByClassName('cell')).forEach(cell => {
            cell.removeEventListener('click', onCellClick);
        });
        restartBtn.style.display = 'inline-block';
    }

    restartBtn.addEventListener('click', () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                myBoard.matrix[i][j] = ' ';
            }
        }
        messageDiv.textContent = '';
        restartBtn.style.display = 'none';
        renderBoard(myBoard);
    });

    return {
        renderBoard
    };
})();

const humanPlayer = PlayerModule.createPLayer('Human', 'O', 0);
const machinePlayer = PlayerModule.createPLayer('Machine', 'X', 0);
humanPlayer.logPlayer();
machinePlayer.logPlayer();

const myBoard = BoardModule.createBoard();
myBoard.logBoard(); 

UIModule.renderBoard(myBoard);
document.getElementById('message').textContent = 'Your turn. Click on a cell.';