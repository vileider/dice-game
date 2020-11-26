import Dice from "./Dice";

function ScoreTemplate(props){
    
    const showResultsIfNotRolling = () => {     
                return <Dice currentNumber={props.rollingDices 
                    ? props.rollingNumber
                    : props.currentNumber}></Dice>
    }
    return (
        <div>       
               {showResultsIfNotRolling()}
        </div>
    );
}
export default ScoreTemplate;