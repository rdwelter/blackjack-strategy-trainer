export default function Betbox({ bankroll, currBet, setCurrBet }) {
    return (
        <div className='flex justify-center space-x-2'>
            <p>${bankroll}</p>
            <input type="number" value={currBet} min="5" max="1000" onChange={e => setCurrBet(() => {
                if (e.target.value < 5) {
                    return 5;
                }
                if (e.target.value > 1000) {
                    return 1000;
                }
                return e.target.value;
            })} required />
        </div>
    );
}