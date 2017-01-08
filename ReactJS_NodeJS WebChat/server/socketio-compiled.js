'use strict';

/**
 * Created by zh355245849 on 2016/11/30.
 */
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    hosts: ['http://localhost:9200']
});

client.indices.create({
    index: "messages"
});

client.indices.putMapping({
    index: "messages",
    type: "document",
    body: {
        properties: {
            room: { type: "string" },
            message: { type: "string" }
        }
    }
});

module.exports = function (http) {
    var io = require('socket.io')(http);

    // Listen for a connection
    // usernames which are currently connected to the chat
    var usernames = {};

    // rooms which are currently available in chat
    var rooms = ['room1', 'room2', 'room3'];

    io.sockets.on('connection', function (socket) {

        // when the client emits 'adduser', this listens and executes
        socket.on('adduser', function (room) {

            // store the room name in the socket session for this client
            socket.room = room;

            // send client to room 1
            socket.join(socket.room);
            console.log("join room:   " + room);
        });

        // when the client emits 'sendchat', this listens and executes
        socket.on('sendchat', function (data) {
            // we tell the client to execute 'updatechat' with 2 parameters
            console.log("message  " + JSON.stringify(data));
            console.log(data.room);

            client.index({
                index: 'messages',
                type: 'document',
                id: 1,
                body: {
                    room: data.room,
                    message: data.message
                }
            }, function (err, resp) {
                // ...
                if (err) return;
                console.log(JSON.stringify(resp));
            });

            console.log(socket.adapter.rooms);
            socket.broadcast.emit('updatechat', data.message);
        });
    });
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(client, 'client', '/Users/zh355245849/WebChat/server/socketio.js');
}();

;

//# sourceMappingURL=socketio-compiled.js.map