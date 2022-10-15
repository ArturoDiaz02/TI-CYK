export var state = {
    'S': {
        transactions: {}
    }
};

/**
 * This method prepares the states from the data entered by the user.
 * @param {{}} states all the states of the machine Mealy
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
 * This method allows to create the html code of the table for the mealy machine from the states and inputs.
 * @param {array} states all the states of the machine Mealy
 * @param {array} inputs all the inputs of the machine Mealy
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


export function CYK(string){
    let n =  parseInt(string.length);
    let j = 0;
    let matrix = createArray(n);

    //iniciar la matriz
    for (let i = 0; i < n; i++) {
        let letter = string.charAt(i);
        addKey(letter, matrix, i, j);

    }

    //repetir

    for (j = 1; j < n; j++) {

        for (let k = 1; k <= j; k++) {

            for (let i = 0; i < n - j; i++) {

                let letter = [];
                let b = matrix[k-1][i].split(",");
                let c = matrix[j-k][i+k].split(",");

                for (let m = 0; m < b.length; m++) {
                    for (let l = 0; l < c.length; l++) {
                        letter.push(b[m]+c[l]);
                    }
                }

                if (letter.length > 1){
                    for (let k = 0; k < letter.length; k++) {
                        addKey(letter[k], matrix, i, j);
                    }


                }else{
                    addKey(letter[0], matrix, i, j);
                }

            }



        }

    }

    if (matrix[n-1][0].includes('S')){
        return true;
    }else{
        return false;
    }

}

function addKey(letter, matrix, i, j){
    for (let k = 0; k < Object.keys(state).length; k++) {
        let key = Object.keys(state)[k];

        if(letter in state[key].transactions){
            if (matrix[j][i].includes(key) === false){
                if(matrix[j][i] === ""){
                    matrix[j][i] = key;
                }else{
                    matrix[j][i] += "," + key;
                }
            }


        }


    }


}

function createArray(x) {
    let arr = Array.apply(null, Array(x)).map(e => Array(x));

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            arr[i][j] = "";
        }
    }

    return arr
}