const screens = [
    'Onboarding 1.png',
    'Onboarding 2.png',
    'Onboarding 3.png',
    'Onboarding 4.png',
    'Onboarding 5.png',
    'Onboarding 6.png',
    'Onboarding 7.png',
    'Onboarding 8.png',
    'Onboarding 9.png',
    'Onboarding 10.png',
    'Onboarding 11.png',
    'Onboarding 14.png',
];
const vocalScreen = '';
const screenContainer = document.getElementById("screens");
let index = 0;

updateScreen({ prefix: 'tuto/' });

function nextScreen() {
    index = index > screens.length - 1 ? 0 : index + 1;
    updateScreen({ prefix: 'tuto/' });
    console.log('next')
}

function prevScreen() {
    index = index < 0 ? screens.length - 1 : index - 1;
    updateScreen({ prefix: 'tuto/' });
    console.log('prev')
}

function updateScreen({ screenName = null, prefix = '' }) {
    screenContainer.src = '../screens/' + prefix + (screenName ? screenName : screens[index]);
    console.log(screenName ? screenName : screens[index])
}

function startVocal() {
    console.log('start vocal !')
        // updateScreen({ screenName: vocalScreen});
}

function placeTracker() {
    console.log("balise !")
        // updateScreen({ screenName: trackerScreen});
}

function confirm() {
    console.log('confirm !')
        // updateScreen({ screenName: confirmScreen});
}