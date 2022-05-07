const screens = ['loupe-oss.gif', 'Lucien_Bramare.png', 'oss_only.png', 'renecoty-oss.jpg'];
const screenContainer = document.getElementById("screens");
let index = 0;

function nextScreen() {
    index = index > screens.length - 1 ? 0 : index + 1;
    updateScreen();
    console.log('next')
}

function prevScreen() {
    index = index < 0 ? screens.length - 1 : index - 1;
    updateScreen();
    console.log('prev')
}

function updateScreen() {
    screenContainer.src = '../screens/' + screens[index];
}

function startVocal() {
    console.log('start vocal !')
}

function placeTracker() {
    console.log("balise !")
}

function confirm() {
    console.log('confirm !')
}