import Card from './card.jsx';

export default function Hand({ currHand, isDealer, gamePhase }) {
    const currCards = currHand.map((currCard, ind) => 
        <li key={currCard + ', ' + ind}>
            <Card cardNum={currCard} showBack={isDealer && ind === 1 && gamePhase === 'Player'} />
        </li>
    );

    return <ul className='flex justify-center align-center p-2'>{currCards}</ul>;
}