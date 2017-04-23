/*
* @Author: inksmallfrog
* @Date:   2017-04-24 07:13:12
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-24 07:51:01
*/

'use strict';
require ('styles/game.scss')
import React from 'react';

class Grid extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <span className="grid" >{this.props.value}</span>
        )
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="grids-panel">
                {this.props.chess.map((value, index)=>{
                    console.log(value);
                    return <Grid key={index} state={value}/>
                })}
            </div>
        )
    }
}

class StatePanel extends React.Component{
    render(){
        return(
            <div>
                <h4>Some State</h4>
                <ul></ul>
            </div>
        )
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        //The size of Gameboard is 3 * 3
        this.state = {
            chess: [].fill.call(new Array(9), '')
        }
    }
    render(){
        return(
            <section>
                <Board chess={this.state.chess}/>
                <StatePanel />
            </section>
        )
    }
}

export default Game