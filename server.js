/*
* @Author: inksmallfrog
* @Date:   2017-04-24 08:59:35
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-24 09:13:18
*/

'use strict';
let express = require('express');
let path = require('path');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'dist')));

io.on('connection', (socket)=>{
    console.log('a user connected');
});

http.listen(3000, ()=>{
    console.log('listening on *:3000');
})
