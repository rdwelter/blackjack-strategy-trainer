import Card from './card.jsx';

export default function Hand({ currHand, isDealer, displayIndicator, gamePhase, winner }) {
    const currCards = currHand.map((currCard, ind) => 
        <li key={currCard + ', ' + ind}>
            <Card cardNum={currCard} showBack={gamePhase === 'START' || isDealer && ind === 1 && gamePhase === 'Player'} />
        </li>
    );

    const displayWinner = () => {
        if (winner === 'player') {
            return 'You Win';
        }
        if (winner === 'dealer') {
            return 'You Lose';
        }
        if (winner === 'push') {
            return 'Push';
        }
        return winner;
    };

    return (
        <div className='justify-center align-center'>
            <ul className='flex justify-center align-center p-2'>{currCards}</ul>
            <p className='flex justify-center text-4xl text-[#ffff00]'><b>{displayIndicator ? '^' : ''}</b></p>
            <p className='flex justify-center text-4xl text-[#ffff00]'><b>{displayWinner()}</b></p>
        </div>
    );
}