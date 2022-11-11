/**
 * @type {{S: {transactions: {}}}} this is the states.
 */
export var state = {
    'S': {
        transactions: {}
    }
};

/**
 * This method prepares the states from the data entered by the user.
 * @param {{}} states all the states entered by the user
 */
export function getInitialStates(states){
    state = {
        'S': {
            transactions: {}
        }
    };

    let machine = state;

    for(let i = 0; i < states.length; i++){
        machine[states[i].toUpperCase()] = {
            transactions: {}

        };

    }

}

/**
 * This method allows to verify if a string is accepted by the language.
 * @param string is the string to be verified.
 * @returns {boolean} true if the string is accepted, false otherwise.
 */
export function CYK(string){
    let n =  parseInt(string.length);
    let j = 0;
    let matrix = createArray(n);

    //acepta la cadena vacia si en S esta lambda
    if(string == "" && "?" in state['S'].transactions){return true}

    //initialization
    for (let i = 0; i < n; i++) {
        addKey(string.charAt(i), matrix, i, j);
    }

    //repeat and end
    for (j = 1; j < n; j++) {

        for (let k = 1; k <= j; k++) {

            for (let i = 0; i < n - j; i++) {

                let letter = [];
                let b = matrix[k-1][i].split(",");
                let c = matrix[j-k][i+k].split(",");

                //Cartesian product
                b.forEach(function (item) {
                    c.forEach(function (item2) {
                        letter.push(item + item2);
                    });
                });

                //add key
                letter.forEach(function (item) {
                    addKey(item, matrix, i, j);
                });

            }

        }

    }

    //verify if the string is accepted
   // console.log(matrix);
    return matrix[n-1][0].includes("S") ? true : false;

}

/**
 * This method allows to add a key to the matrix.
 * @param letter is the letter to look for in the states.
 * @param matrix is the matrix to add the key.
 * @param i is the column of the matrix.
 * @param j is the row of the matrix.
 */
function addKey(letter, matrix, i, j){
    Object.keys(state).forEach(function (item) {
        Object.keys(state[item].transactions).forEach(function (item2) {
            if (item2.indexOf(letter) != -1 && !matrix[j][i].includes(item)) {
                if(matrix[j][i] === ""){
                    matrix[j][i] = item;
                }else{
                    matrix[j][i] += "," + item;
                }
            }
        });

    });

}


/**
 * This method allows to create an array of arrays.
 * @param x is the size of the array.
 * @returns {any[][]} the array of arrays.
 */
function createArray(x) {
    let arr = Array.apply(null, Array(x)).map(e => Array(x));

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < x; j++) {
            arr[i][j] = "";
        }
    }

    return arr
}

/**
 * This method allows to create the html code of the table from the states.
 */
export function createTable(){
    let html = '';
    html += '<table><tbody>';

    for (let i = 0; i < Object.keys(state).length; i++) {
        html += "<tr><th>" + Object.keys(state)[i]+ "</th>";

        html += '<td><input class="align-items-center" type="text" placeholder="aA/bB" id=' + Object.keys(state)[i]+i  + ' ></td>';

        html += "</tr>";
    }
    html += "</tbody></table>";

    return html;
}