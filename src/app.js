/*
* @Author: inksmallfrog
* @Date:   2017-04-24 07:11:40
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-24 09:26:47
*/

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import IO from 'socket.io-client';
let socket = IO();

import Game from 'components/Game';

ReactDOM.render(<Game />, document.getElementById('app'));