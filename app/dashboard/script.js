const dashboard = document.getElementById('dashboard');
const socket = io();

let gestures = []
let detectedGesture = '';

socket.on('gestures-values', ({data}) => {
    // console.log('gesture values', data)
    /* if (gestures.length == 0){
        gestures = data.filter(x => typeof x == 'number')
        // console.log(gestures)

        createDashboard();
    }
 */
})

socket.on('gesture-detected', ({data}) => {
    detectedGesture = data;
    console.log('detected gesture' , detectedGesture)

    if (data != 'none'){
        if (!Object.keys(gestures).includes(data.split('/')[1])){
            gestures[data.split('/')[1]] = 0;
    
            addGesture(data.split('/')[1]);
        }
    
        turnOn(data);
    }
})


const clear = () => {
    gestures = []
}


const addGesture = (name) => {
    let el = document.createElement('div');
    el.classList.add('gesture');
    el.id = name;
    el.innerHTML = `
        <h2>${name}</h2>
        <div class="pin"></div>
    `;

    dashboard.appendChild(el);
}

const createDashboard = () => {
    let i = 1;
    for (let gesture of gestures){
        let el = document.createElement('div');
        el.classList.add('gesture');
        el.innerHTML = `
            <h2>Gesture ${i}</h2>
            <div class="pin"></div>
        `;

        dashboard.appendChild(el);
        i ++;
    }
}

const turnOn = (gestureName) => {
    Array.from(dashboard.children).forEach(child => {
        child.classList.remove('active');
    })

    if (gestureName){
        let g = document.getElementById(gestureName.split('/')[1]);
        g.classList.add('active')
    }

    if (!g){
        const i = detectedGesture.split('/')[1];
        const gestureDom = dashboard.children[i];
        gestureDom.classList.add('active');
    }
}