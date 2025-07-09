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
            this.matrix.forEach(row => console.log(row));
        }
    };

    // Factory function para crear el board
    function createBoard() {
        let matrix = [];
        for (let i = 0; i < 3; i++) {
            matrix[i] = [];
            for (let j = 0; j < 3; j++) {
                matrix[i][j] = ' ';
            }
        }

        // Crea el objeto board y le asigna el prototipo
        const board = Object.create(boardProto);
        board.matrix = matrix;
        return board;
    }

    // Expone solo la factory function, ejemplo de privacy 
    return {
        createBoard
    };
})();

const PlayerModule = (function () {

    const PlayerProto = {

    };

    return {

    };
})();

const LogicModule = (function () {

    const LogicProto = {

    };

    return {

    };
})();

const myBoard = BoardModule.createBoard();
// Este metodo esta disponible por prototipo, no por closures
myBoard.logBoard(); 