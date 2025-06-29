// const boardModule = function (dimension) {

//     function createBoard() {

//     }

//     const boardProto = {
//         logMatrix (dimension) {
//             const matrix = [];

//             for (let i = 0; i < dimenssion; i++) {

//             }

//             return
//         }
//     }
// }

// const board = boardModule.createBoard();
// console.log(board);




function createBoard(dimension) {

    let matrix = [];

    for (let i = 0; i < dimension; i++) {
        matrix[i] = [];
        for (let j = 0; j < dimension; j++) {
            matrix[i][j] = 'X' 
        }
    }

    return matrix; 
}

const board = createBoard(3);
// Arrays are printed in 1 row, but I want it to be displayed as a grid
board.forEach(row => console.log(row));

// Can also use .table() which prints a table with each index
console.table(createBoard(3));