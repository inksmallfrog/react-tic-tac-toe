/*
* @Author: inksmallfrog
* @Date:   2017-04-24 08:59:35
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-24 11:27:08
*/

'use strict';
let express = require('express');
let path = require('path');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

const ROOM_EMPTY = 0;
const ROOM_WAITING = 1;
const ROOM_PLAYING = 2;
let playing_rooms = [];
let waiting_rooms = [];
let empty_rooms = [];
let next_room_id = 0;
let room = {
    id: next_room_id++,
    state: ROOM_EMPTY
};

app.use(express.static(path.join(__dirname, 'dist')));

/*
 * 获取一个等待中房间
 * 若无等待中房间，则返回队列中空房间
 * 若无空房间，则返回新房间
 * @return<room>: state == ROOM_WAITING || state == ROOM_EMPTY
 */
function getWaitingOrEmptyRoom(){
    if(waiting_rooms.length > 0) return waiting_rooms.shift();
    else if(empty_rooms.length > 0) return empty_rooms.shift();
    else return {id: next_room_id++, state: ROOM_EMPTY};
}

function findRoomBySocket(socket){
    let res = playing_rooms.filter((room) => {
        return room.X == socket || room.O == socket;
    })
    if(res.length < 1){
        res = waiting_rooms.filter((room) => {
            return room.X == socket;
        })
    }
    if(res.length < 1) return null;
    else return res[0];
}

io.on('connection', (socket)=>{
    socket.join('room' + room.id);
    socket.game_peer = null;
    console.log('a user joined into room#' + room.id);
    if(room.state == ROOM_EMPTY){
        room.X = socket;
        room.state = ROOM_WAITING;
        waiting_rooms.push(room);
    }
    else if(room.state == ROOM_WAITING){
        room.state = ROOM_PLAYING;
        room.O = socket;
        room.X.game_peer = room.O;
        room.O.game_peer = room.X;
        room.X.emit('canPlay', 'X');
        room.O.emit('canPlay', 'O');
        playing_rooms.push(room);
        room=getWaitingOrEmptyRoom();
    }
    socket.on('play', (chess)=>{
        socket.game_peer.emit('play', chess);
    });
    socket.on('disconnect', () => {
        let room = findRoomBySocket(socket);
        if(room.state == ROOM_PLAYING){
            socket.game_peer.emit('losePeer');
            playing_rooms.splice(playing_rooms.indexOf(room), 1);
            room.state = ROOM_WAITING;
            waiting_rooms.push(room);
        }
        else{
            waiting_rooms.splice(waiting_rooms.indexOf(room), 1);
            room.state = ROOM_EMPTY;
            empty_rooms.push(room);
        }
    })
});

http.listen(3000, ()=>{
    console.log('listening on *:3000');
})
