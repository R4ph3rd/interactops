const { clipboard, keyboard, Key } = require("@nut-tree/nut-js");
const path                         = require('path'); 
const fs                           = require('fs'); // required for file serving
const archiver                     = require('archiver'); // to zip folders
const { v1: uuidv1 }               = require('uuid');

const socketSendings = require('../websocket/sendings');
const notifier       = require('node-notifier');
const { getRequestAction } = require("./access");

const assetsFolder = __dirname + '/../store/assets/';


function randomFileName(ext){
    return uuidv1() + (ext || '.png');
}

function readWriteFile ({buff, fileName}) {
    var data =  Buffer.from(buff);
    
    console.log('file exists ?', fs.existsSync(assetsFolder + fileName));

    fs.writeFile(assetsFolder + fileName, data, 'binary', function (err) {
        if (err) {
            console.log("There was an error writing the image")
        } else {
            console.log("The sheel file was written")
        }
    })
};

function zipFolder ({sourceDir}){

    var output = fs.createWriteStream(assetsFolder + path.basename(sourceDir) + '.zip');
    var archive = archiver('zip');
    
    output.on('close', function () {
        // console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');

        socketSendings.sendStream({path : assetsFolder + path.basename(sourceDir) + '.zip', streamName: path.basename(sourceDir)})
    });
    
    archive.on('error', function(err){
        throw err;
    });
    
    archive.pipe(output);
    
    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(sourceDir, false);
    
    // append files from a sub-directory and naming it `new-subdir` within the archive
    archive.directory('subdir/', 'new-subdir');
    
    archive.finalize();
}


module.exports = {
    getData: async ({content, socketId, fileName = undefined}) => {
        if (Buffer.isBuffer(content)){
            readWriteFile({buff: content, fileName});
            console.log('File to download'.magenta, fileName)
        } else if(typeof content == "string"){
            await clipboard.copy(content);
            notifier.notify({
                title:'Interactops',
                subtitle: 'Data incoming',
                message:'Data received from socket' + socketId + ' copied in clipboard : ' + content,
                icon: path.join(__dirname, '../store/assets/icons/get.svg'),
                timeout: 3
            });
            console.log('Data received from socket'.magenta + socketId.magenta + ' copied in clipboard : '.magenta + content)
        } else {
            console.log('data received : ', content)
        }

        socketSendings.sendMessage({message: 'Thanks !', socketId})
        
        // console.log('Data incoming copied in clipboard : ', await clipboard.paste())
    },
    getStream: async ({stream, fileName}) => {
        console.log('file exists ?', fs.existsSync(assetsFolder + fileName));
        if(fileName){
            if (!fs.existsSync(assetsFolder + fileName)){
                var filename = assetsFolder + fileName;
            } else {
                var filename = assetsFolder + randomFileName('.zip');
            }
        } else {
            var filename = randomFileName();
        }

        stream.pipe(fs.createWriteStream(filename));
        stream.on('end', () => {
            console.log('Stream file received !')
            socketSendings.sendMessage({message: 'Thanks !', socketId});
        })
    },
    copySend: async () => {
        await keyboard.pressKey(Key.RightControl)
        await keyboard.pressKey(Key.C)
        await keyboard.releaseKey(Key.C)
        await keyboard.releaseKey(Key.RightControl)

        const copied = await clipboard.paste().then(str => {
            return str.replace(`x-special/nautilus-clipboard\ncopy\nfile://`, '').trim()
        });

        const ext = path.extname(copied);
        const dir = path.dirname(copied);
        const base = path.basename(copied);

        if(fs.existsSync(copied)){
            const stats = fs.statSync(copied)

            if (stats.isFile()){
                fs.readFile(copied, function(err, buf){
                    console.log('file is initialized', buf);
                    socketSendings.send({data: buf, fileName : base})
                });
            } else if (stats.isDirectory()){
                zipFolder({sourceDir: copied});
            }

        } else {
            console.log('------------------------------'.green)
            console.log('Copied to clipboard : ' + copied.green);
            console.log('------------------------------'.green)
    
            socketSendings.send({data : copied});
        }

        notifier.notify({
            title:'Interactops',
            subtitle: 'Data copied',
            message:'Data copied and sended to socket server',
            icon: path.join(__dirname, '../store/assets/icons/send.svg'),
            timeout: 3
        });
    },
    requestDownload: () => {
        socketSendings.requestDownload();
    },
}