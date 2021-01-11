const mutations = require('../store/mutations');
const store = require('../store');

module.exports = function(io, socket){
    // computer access sharing
    // will share a token acess, either view or collaboration. This will be set by host
    socket.on('share-access', data => {
        store.rooms.temp.token = data.token;
        store.rooms.temp.owner = socket.id;
        store.rooms.temp.requests = [];

        mutations.clearTemp(3000);
    })
	
	socket.on('request-access', () => {		
		if (store.rooms.temp.token){
			// socket.join(store.rooms.temp.socketId);

			socket.emit('get-access', {
				owner: store.rooms.temp.owner,
				token: store.rooms.temp.token,
			})

			socket.emit('send-message', {
				message: 'You joined another socket room. You are now allowed to collaborate with ' + store.rooms.temp.owner + ' on its desktop.'
			})

			socket.in(store.rooms.temp.owner).emit('send-message', {
				message : 'A new collaborator is connected ! You share now the PC with ' + socket.id
			})
		}
    });
}