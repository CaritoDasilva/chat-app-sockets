const User = require('../models/user.model');
const socket = require('socket.io');

const userConnected = async (id, isOnline) => {
    const userUpdated = await User.findOneAndUpdate({ _id: id }, {isOnline: isOnline}, {new: true})
    return userUpdated;
}

const getUsers = async () => {
    const users = await User.find();
    return users;
}

module.exports.socketEvents = async (server, cors) => {
    const io = socket(server, { cors: true });
    io.on("connection", async (socket) => {
        await userConnected(socket.handshake.query['id'], true);
        io.emit('users-list', await getUsers());
        socket.on('disconnect', async () => {
            await userConnected(socket.handshake.query['id'], false)
            io.emit( 'users-list', await getUsers())
            console.log('cliente desconectado', socket.handshake.query['name'])
        })
    });


}