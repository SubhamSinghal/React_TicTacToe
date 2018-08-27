import React from 'react';
import Board from './Board';
import './index.css';

class Game extends React.Component{

    state={
        history:[{          
                squares: Array(9).fill(null)
        }],

        stepNumber:0,
        xIsNext: true
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
       
        this.setState({
            history: history.concat([{
                squares: squares
              }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
          });

        console.log("Clicked");
        
    }

    isDrawMatch(square){

        for(let i = 0; i < square.length; i++){
           // if(square[i] != "X" || square[i] != "O")
           if(!square[i]){
               return false;
           }
                
        }

        return true;

    }

    calculateWinner(square){
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];

          for(let i = 0; i < lines.length; i++){

            const [a,b,c] = lines[i];
            if(square[a] && square[a] === square[b] && square[a] === square[c]){
                return square[a];
            }

          }

          return null;
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
    }

    render(){

        const history = this.state.history;
       
        const moves = history.map((step, move) => {
                const desc = move ?
                "Go to move #" + move :
                "Go to start ";

                return (

                    <li key={move}>
                        <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                    </li>
                );
        });

        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {

            if(this.isDrawMatch(current.squares)){
                status = "Match is Draw";
            } else{
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
            
        }   
        return (

            <div className="game">
                <div className="game-board">
                <Board squares={current.squares}
                onClick={(i)=>this.handleClick(i)} />
                </div>
                 <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>

           
        );
    }

}

export default Game;