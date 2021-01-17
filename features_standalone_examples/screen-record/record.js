const screenshot = require('screenshot-desktop')
 
screenshot().then((img) => {
  // img: Buffer filled with jpg goodness
  // ...
  console.log(img)
}).catch((err) => {
  // ...
})

screenshot({ filename: 'shot.jpg' }).then((imgPath) => {
    // imgPath: absolute path to screenshot
    // created in current working directory named shot.png
  });