/*
* @Author: inksmallfrog
* @Date:   2017-04-24 07:13:12
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-24 08:46:23
*/

'use strict';
require ('styles/game.scss')
import React from 'react';

class Grid extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = (e) => {
            if(!this.props.chess.state){
                this.props.playChess();
            }
            e.stopPropagation();
            e.preventDefault();
        }
    }
    render(){
        return(
            <div className="grid" onClick={this.handleClick}>{this.props.chess.state}</div>
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
                {this.props.chesses.map((value, index)=>{
                    return <Grid key={index} chess={value} playChess={this.props.play(index)}/>
                })}
            </div>
        )
    }
}

class StatePanel extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h4>{this.props.gameState}</h4>
                <ul></ul>
            </div>
        )
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        let chesses = Array.apply(null, new Array(9)).map((value, index) => {
           return {
                id: index,
                state: ''
           }
        });
        this.state = {
            chesses: chesses,
            gameState: 'X'
        }
    }

    checkWinner(){
        const chesses = this.state.chesses;
        const winStates = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ];
        let winner;
        winStates.some((winState) => {
            if(chesses[winState[0]].state != ''
                && chesses[winState[0]].state == chesses[winState[1]].state
                && chesses[winState[0]].state == chesses[winState[2]].state){
                winner = chesses[winState[0]].state;
                return true;
            }
            return false;
        });
        if(winner){
            this.setState({
                gameState: 'Winner is ' + winner
            })
            return true;
        }
        return false;
    }

    play(index){
        return ()=>{
            let state = this.state.gameState;
            if(state == 'X' || state == 'O'){
                let chesses = this.state.chesses.slice();
                chesses[index].state = state;
                this.setState({
                    chesses: chesses,
                    gameState: state == 'X' ? 'O' : 'X'
                })
                this.checkWinner();
            }
        }
    }

    render(){
        return(
            <section>
                <Board chesses={this.state.chesses} play={this.play.bind(this)}/>
                <StatePanel gameState={this.state.gameState}/>
            </section>
        )
    }
}

export default Game