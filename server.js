/*
* @Author: inksmallfrog
* @Date:   2017-04-24 08:59:35
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-24 10:16:27
*/

'use strict';
let express = require('express');
let path = require('path');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

const ROOM_EMPTY = 0;
const ROOM_WAITING_PEER = 1;
const ROOM_PLAYING = 2;
let playing_rooms = [];
let room = [];
let next_room_id = 0;
let next_room_state = ROOM_EMPTY;

app.use(express.static(path.join(__dirname, 'dist')));

io.on('connection', (socket)=>{
    socket.join('room' + next_room_id);
    console.log('a user joined into room#' + next_room_id);
    if(next_room_state == ROOM_EMPTY){
        next_room_state = ROOM_WAITING_PEER;
        room[0] = socket;
    }
    else if(next_room_state == ROOM_WAITING_PEER){
        next_room_state = ROOM_PLAYING;
        room[1] = socket;
        room[1].game_peer = room[0];
        room[0].game_peer = room[1];
        room[0].emit('canPlay', 'X');
        room[1].emit('canPlay', 'O');
        playing_rooms.push(room);
        room=[];
        ++next_room_id;
    }
    socket.on('play', (chess)=>{
        console.log(chess);
        socket.game_peer.emit('play', chess);
    })
});

http.listen(3000, ()=>{
    console.log('listening on *:3000');
})
