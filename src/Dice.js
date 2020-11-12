import './Dice.css';

function Dice(props) {

    const renderNumber = () => {
        switch (props.currentNumber) {
            case 1: return <div>*</div>;
            case 2: return <div>**</div>
            case 3: return <div>***</div>
            case 4: return <div>****</div>
            case 5: return <div>*****</div>
            case 6: return <div>******</div>
        }
    }

    return (
        <div className="Dice">
            {renderNumber()}
        </div>
    );
}

export default Dice;
