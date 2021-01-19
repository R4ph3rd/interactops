const open           = require('open');
const path           = require('path'); 
const socketSendings = require('../websocket/sendings');
const {io}           = require('../server')
const notifier       = require('node-notifier');

const store     = require('../store');
const mutations = require('../store/mutations');
const screen    = require('./screen')

module.exports = {
    shareViewerAccess: () => {
        if (store.remote.token && store.remoteCastIsOpen){
            mutations.clearRemote();
            mutations.toggleCast(false);

            io.emit('screencast-ended');

            notifier.notify({
                title:'Interactops',
                subtitle: 'Close screen sharing',
                message:'Your remote screencast is closed.',
                icon: path.join(__dirname, '../store/assets/icons/view_end.svg'),
            });

        } else if (store.remote.isCasting){
            mutations.setTokens();

            notifier.notify({
                title:'Interactops',
                subtitle: 'Close screen sharing',
                message:'You closed your viewing access to remote users.',
                icon: path.join(__dirname, '../store/assets/icons/view_end.svg'),
            });
        } else {
            socketSendings.shareAccess({token: store.tokens.viewer, rights: 'viewer'});
            console.log('Sharing viewer access'.green)
            
            notifier.notify({
                title:'Interactops',
                subtitle: 'Sharing viewer acces',
                message:'You shared your viewer access token to the network.',
                icon: path.join(__dirname, '../store/assets/icons/view.svg'),
            });
        }
    },
    shareCollaboratorAccess: () => {
        if (store.remote.token && store.remoteCastIsOpen){
            mutations.clearRemote();
            console.log('Remote tokens and connection cleared.'.green)
        } else {
            socketSendings.shareAccess({token: store.tokens.collaborator, rights: 'collaborator'});
            console.log('Sharing collaborator access'.green)

            notifier.notify({
                title:'Interactops',
                subtitle: 'Sharing collaborator acces',
                message:'You shared your collaboration access token to the network.',
                icon: path.join(__dirname, '../store/assets/icons/collab_send.svg'),
                timeout: 3
            });
        }
    },
    requestAccess: () => {
        socketSendings.requestAccess();
    },
    requestAction: (action) => {
        socketSendings.requestAction({
            action,
            remoteSocket: store.remote.socket,
            remoteToken: store.remote.token
        });
    },
    requestCast: () => {
        socketSendings.requestCast({
            remoteSocket: store.remote.socket,
            remoteToken: store.remote.token
        })
    },
    getRequestAction: ({action, token, socketId}) => {
        if(module.exports.middleware({action, token, socketId})){
            // actions(action);
            return true;
        } else {
            socketSendings.sendMessage({
                socketId,
                message: "You're not allowed to perform this action on the remote computer."
            })

            return false;
        }
    },
    registerRemoteAccess: ({remoteToken, remoteSocket, rights}) => {
        mutations.setRemote({remoteSocket, remoteToken, rights});

        if (rights == 'viewer'){
            screen.getCast();
        }

        notifier.notify({
            title:'Interactops',
            subtitle: 'Received token access',
            message: `You received ${rights} access token from ${remoteSocket}`,
            timeout: 3
        });
    },
    closeAccess: (which) => {
        if (which){
            mutations.setTokens();

            notifier.notify({
                title:'Interactops',
                subtitle: 'Close access',
                message: `You ended your access to your computer`,
                timeout: 3
            });
        } else {
            mutations.clearRemote();
            mutations.toggleCast();

            notifier.notify({
                title:'Interactops',
                subtitle: 'Close remote access',
                message: `You closed your remote connection`,
                timeout: 3
            });
        }
    },
    middleware({action, token, socketId}){
        mutations.registerRequest({action, token, socketId});
        if (token == store.tokens.viewer && store.viewerRights.includes(action)){
            console.log('Viewer"s request authorized'.green)

            if (!store.remote.isCasting){
                mutations.toggleCastSharing(true);
            }
            return true;
        } else if (token == store.tokens.collaborator && store.collaboratorRights.includes(action)){
            console.log('Collaborator"s request authorized'.green)
            return true;
        } else {
            console.log('Request not authorized.'.red);
            return false;
        }
    }
}