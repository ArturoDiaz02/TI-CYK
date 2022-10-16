import * as machine from "./State.js"

$(document).ready(function() {
    let states;
    changeView("homePane");

    $('.exitBtn').click(function() {
        changeView("homePane");

    });
    
    $('#submitBtn').click(function (states, inputs) {
        states = $('#inputStates').val().split(',');

        if(states[0] === ''){
            $('#states').val('');
        }else{
            machine.getInitialStates(states);
            changeView("tableView");
            loadHTML("#table", machine.createTable());


        }
    });

    $('#submitTable').click(function () {
        let keys = Object.keys(machine.state);

        for(let i = 0; i < keys.length; i++){
            let array = $('#'+keys[i]+i).val().split('/');
            for(let j = 0; j < array.length; j++){
                machine.state[keys[i]].transactions[array[j]] = j;

            }

        }

        let string = $('#mString').val();

        if(machine.CYK(string)){
            alert("The string is accepted ✅");
        }else{
            alert("The string is not accepted 🚫");
        }

        $('#mString').val("");

    });

});

/**
 * This method allows us to change the current view 
 * @param {String} objective its the name of the new view
 */
function changeView(objective){
    $(".view").hide();
    $(".view").each(
        function() {
            if($(this).attr("id") === objective){
                $(this).show();
            }
        }
    );
}


/**
 * This method will allow us to add to a html element a new html code to modify the view.
 * @param {String} element name of the element to modify
 * @param {String} HTML is the html code of which the element will be composed. 
 */
function loadHTML(element, HTML){
    $(element).html(HTML);
}











