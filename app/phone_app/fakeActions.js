// DESKTOP AUTOMATION
function right(){
    console.log('right !')
}

function left(){
    console.log('left !')
}

function up(){
    console.log('up !')
}

function down(){
    console.log('down !')
}



//////////////// DATA SHARING /////////////////

function copySend(type){
    if (type){
        console.log('copy send to many!');
    } else {
        console.log('copy send to one!');
    }
}

function download(){
    console.log('download !');
}

//////////////// ACCESS //////////////
function access(type){
    if (type){
        console.log('share collaborator access');
    } else {
        console.log('share viewer access');
    }
}

function closeAccess(){
    console.log('Close access')
}