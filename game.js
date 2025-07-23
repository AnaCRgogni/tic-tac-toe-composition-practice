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

        // Crea el objeto board y le asigna el prototipo
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

    // No crea objetos por lo que no necesita un prototipo

    function humanTurn(board, player) {
        let i, j;
        do {
            i = parseInt(prompt('Escribe la fila (0-2):'));
            // Si no es un numero, es menor que 0 o mayor que 2, siga pidiendo el prompt
        } while (isNaN(i) || i < 0 || i > 2);

        do {
            j = parseInt(prompt('Escribe la columna (0-2):'));
        } while (isNaN(j) || j < 0 || j > 2);

        board.matrix[i][j] = player.markerType;
    }

    function checkMatrixRows() {

    }

    function checkMatrixDiagonals() {
        
    }

    function machineTurn(board, player) {
        let i, j;

    }

    function checkWinner() {

    }

    return {
        humanTurn,
        machineTurn,
        checkMarkCount,
        checkWinner
    };
})();

const humanPlayer = PlayerModule.createPLayer('Human', 'O', 0);
const machinePlayer = PlayerModule.createPLayer('Machine', 'X', 0);
humanPlayer.logPlayer();
machinePlayer.logPlayer();

const myBoard = BoardModule.createBoard();
// Este metodo esta disponible por prototipo, no por closures
myBoard.logBoard(); 

LogicModule.humanTurn(myBoard, humanPlayer);
myBoard.logBoard();
LogicModule.machineTurn(myBoard, machinePlayer);