import './DiceGame.css';
import './App.css';
import Dice from "./Dice";
import React,{useState, useEffect} from 'react';
import ScoreTemplate from './ScoreTemplate';

function DiceGame() {
    const [areDicesRolling, setAreDicesRolling] = useState(false);
    const [playerFirstDiceCurrentNumber, setPlayerFirstDiceCurrentNumber] = useState(0);
    const [playerSecondDiceCurrentNumber, setPlayerSecondDiceCurrentNumber] = useState(0);
    const [computerFirstDiceCurrentNumber, setComputerFirstDiceCurrentNumber] = useState(0);
    const [computerSecondDiceCurrentNumber, setComputerSecondDiceCurrentNumber] = useState(0);
    const [playerFirstDiceRollingNumber, setPlayerFirstDiceRollingNumber] = useState(1);
    const [playerSecondDiceRollingNumber, setPlayerSecondDiceRollingNumber] = useState(1);
    const [computerFirstDiceRollingNumber, setComputerFirstDiceRollingNumber] = useState(1);
    const [computerSecondDiceRollingNumber, setComputerSecondDiceRollingNumber] = useState(1);
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
        if(!areDicesRolling) {
            getComputerScore();
            getComputerScore();
            addOnePointToTheWinner();
        } else {
            const rollingIntervalId = setInterval(() => {
                setPlayerFirstDiceRollingNumber(getRandomDiceResult());
                setPlayerSecondDiceRollingNumber(getRandomDiceResult());
                setComputerFirstDiceRollingNumber(getRandomDiceResult());
                setComputerSecondDiceRollingNumber(getRandomDiceResult());
            }, 200);

            return () => clearInterval(rollingIntervalId);
        }
    },[areDicesRolling]);

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
            <div>
                <div className="PlayerDices">
                    Your dices:
                    <ScoreTemplate rollingDices={areDicesRolling}
                     rollingNumber={playerFirstDiceRollingNumber}
                     currentNumber={playerFirstDiceCurrentNumber}></ScoreTemplate>
                     <ScoreTemplate rollingDices={areDicesRolling}
                     rollingNumber={playerSecondDiceRollingNumber}
                     currentNumber={playerSecondDiceCurrentNumber}></ScoreTemplate>
                    Your result: {areDicesRolling === false ? getPlayerScore() : '...'}
                </div>
                <div className="ComputerDices">
                    Computer dices:
                    <ScoreTemplate rollingDices={areDicesRolling}
                     rollingNumber={computerFirstDiceRollingNumber}
                     currentNumber={computerFirstDiceCurrentNumber}></ScoreTemplate>
                     <ScoreTemplate rollingDices={areDicesRolling}
                     rollingNumber={computerSecondDiceRollingNumber}
                     currentNumber={computerSecondDiceCurrentNumber}></ScoreTemplate>
                    Computer result: {areDicesRolling === false ? getComputerScore() : '...'}
                </div>
                {areDicesRolling === false ? <div className="WinnerContainer">
                    {getWinner()}
                </div> : <div/>}
            </div>
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
