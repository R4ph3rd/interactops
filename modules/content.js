module.exports = function(socket){
    // content sharing
	socket.on('share-content', ({data}) => {
		rooms.temp.socketId = socket.id;
		rooms.temp.data = data
        rooms.temp.requests = [];

        setTimeout( () => {
            archived.push(rooms.temp);
            rooms.temp = {};
		}, tempDelay)

		io.in('dashboard').emit('share', {
			socket: socket.id,
			share: 'content',
			data
		})
    })
    
    socket.on('request-content', () => {

		io.in('dashboard').emit('request', {
			socket: socket.id,
			request: 'content'
		})

		if (rooms.temp.data){
			rooms.temp.requests.push(socket.id);
		
			socket.emit('get-content', {
				content : rooms.temp.data
			})
		}
    })
}