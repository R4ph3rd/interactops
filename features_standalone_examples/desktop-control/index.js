// DEMO SEEEN ON THE VIDEO : https://www.youtube.com/watch?v=MpIyUJnU_Bk
"use strict";

const { keyboard, Key, mouse, left, right, up, down, screen } = require("@nut-tree/nut-js");
const {join} = require('path'); 

const demo = async () => {
    try{
        keyboard.config.autoDelayMs = 150;

        screen.config.ressourceDirectory = join(__dirname, 'assets');
        screen.config.autoHighlight = true;
        screen.config.highlightDuration = 1000;

        await keyboard.type(Key.LeftSuper);
        await keyboard.type('terminal');
        await keyboard.type(Key.Return);
        await keyboard.type('vim');
        await keyboard.type(Key.Return);
        await keyboard.type(Key.I);
        await keyboard.type('Hello this is nut.js on raphael"s desktop');
        await keyboard.type(Key.Return);
        await keyboard.type('This demo will now open a new tab in my browser and search nut.js on google');
        await keyboard.type(Key.Escape);
        await keyboard.type(':q!');
        await keyboard.type(Key.Return);
        await keyboard.type('exit');
        await keyboard.type(Key.Return);

        await mouse.move(straightTo(centerOf(screen.find('firefox.png'))));
        await mouse.leftClick();
        await screen.waitFor('firefox_start.png', 10000);
        await keyboard.type('google.com');
        await keyboard.type(Key.Return);
        await screen.waitFor('google.png', 30000);
        await keyboard.type('npm nut-tree/nut-js');
        await keyboard.type(Key.Return);
        
    } catch(e){
        console.error(e);
    }
}

demo();