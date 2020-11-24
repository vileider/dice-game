import './DiceGame.css';
import './App.css';
import Dice from "./Dice";
import React,{useState, useEffect} from 'react';

function DiceGame() {
    const [areDicesRolling, setAreDicesRolling] = useState(false);
    const [playerFirstDiceCurrentNumber, setPlayerFirstDiceCurrentNumber] = useState(0);
    const [playerSecondDiceCurrentNumber, setPlayerSecondDiceCurrentNumber] = useState(0);
    const [computerFirstDiceCurrentNumber, setComputerFirstDiceCurrentNumber] = useState(0);
    const [computerSecondDiceCurrentNumber, setComputerSecondDiceCurrentNumber] = useState(0);
    const [scoreBoardPlayerScore, setScoreBoardPlayerScore] = useState(0);
    const [scoreBoardComputerScore, setScoreBoardComputerScore] = useState(0);
    const getRandomDiceResult = () => Math.floor(Math.random() * 6) + 1;

    function randomizeDices() {
        setAreDicesRolling(true);
        const dicesRollingTimeout = 2000;
        setTimeout(() => {
            setPlayerFirstDiceCurrentNumber(getRandomDiceResult());
            setPlayerSecondDiceCurrentNumber(getRandomDiceResult());
            setComputerFirstDiceCurrentNumber(getRandomDiceResult());
            setComputerSecondDiceCurrentNumber(getRandomDiceResult());
            setAreDicesRolling(false);
        }, dicesRollingTimeout);
    }
    function startTheRound(){
        randomizeDices();
        console.log(scoreBoardComputerScore, scoreBoardPlayerScore); 
    } 
    useEffect(() => {
        if(!areDicesRolling){
        console.log([areDicesRolling],scoreBoardComputerScore,scoreBoardPlayerScore);
        getComputerScore();
        getComputerScore();
        addOnePointToTheWinner();
        }
        },[areDicesRolling
            ])
    function getPlayerScore() {
        return playerFirstDiceCurrentNumber + playerSecondDiceCurrentNumber;
    }
    function getComputerScore() {
        return computerFirstDiceCurrentNumber + computerSecondDiceCurrentNumber ;  
    }
    function getWinner() {
        if (getPlayerScore() > getComputerScore()) {
            return <div>You won!</div>;
        } else if (getPlayerScore() < getComputerScore()) {
            return <div>Computer won!</div>;
        } else {
            return <div>Draw!</div>;
        }  
    }
    function resetGame(hardReset){
        setPlayerFirstDiceCurrentNumber(0)
        setPlayerSecondDiceCurrentNumber(0)
        setComputerFirstDiceCurrentNumber(0)
        setComputerSecondDiceCurrentNumber(0)
        if(hardReset){
            setScoreBoardComputerScore(0);
            setScoreBoardPlayerScore(0);
        }    
    }
    function addOnePointToTheWinner()
    {   
        if(getComputerScore() > getPlayerScore()){
       // return  
       console.log('komputer wygral',getPlayerScore(),getComputerScore());
             setScoreBoardComputerScore(scoreBoardComputerScore + 1);
        }
        if (getPlayerScore() > getComputerScore()){
            console.log('player',getPlayerScore(),getComputerScore());
            setScoreBoardPlayerScore(scoreBoardPlayerScore + 1);
         } else {
             console.log('something wrong');
        } 
    }
    return (
        <>
        <div className="DiceGame">
            {areDicesRolling === false ? <div>
                <div className="PlayerDices">
                    Your dices:
                    <Dice currentNumber={playerFirstDiceCurrentNumber}></Dice>
                    <Dice currentNumber={playerSecondDiceCurrentNumber}></Dice>
                    Your result: {getPlayerScore()}
                </div>
                <div className="ComputerDices">
                    Computer dices:
                    <Dice currentNumber={playerFirstDiceCurrentNumber}></Dice>
                    <Dice currentNumber={playerSecondDiceCurrentNumber}></Dice>
                    Computer result: {getComputerScore() }
                </div>
                <div className="WinnerContainer">
                    {getWinner()}
                </div>
            </div> : <div>Dices are rolllling....</div>}
            <div className="ThrowButton">
                <button disabled={areDicesRolling} 
                onClick={startTheRound}>Throw dice</button>
                <button onClick={resetGame}>Reset Game</button>
            </div>
        </div>
        
        <div className="Score">
            
          computer score...  {scoreBoardComputerScore}<br/>
          player score.... {scoreBoardPlayerScore}
        </div>
        </>
    );
}

export default DiceGame;
