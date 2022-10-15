export var state = {
    'S': {
        transactions: {
            0: 'A'
        }
    }
};

/**
 * This method prepares the states from the data entered by the user.
 * @param {{}} states all the states of the machine Mealy
 */
export function getInitialStates(states){
    let machine = state;

    for(let i = 0; i < states.length; i++){
        machine[states[i].toUpperCase()] = {
            transactions: {}

        };

    }

    console.log(machine);
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

        html += '<td><input class="align-items-center" type="text" id=' + Object.keys(state)[i]+i  + '></td>';

        html += "</tr>";
    }
    html += "</tbody></table>";

    html += '<span>Enter the string you want to check</span>';
    html += '<input width="50px" class="form-control" type="text" id= "mString">';

    return html;
}


export function CYK(string){
    

}