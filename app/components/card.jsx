import Image from 'next/image';

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const cards = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

const getCardString = (cardNum) => {
    if (cardNum === -1) {
        return 'back';
    }
    return suits[Math.floor(cardNum / 13)] + '_' + cards[cardNum % 13];
};

const getCardPath = (cardNum) => {
    const cardString = getCardString(cardNum);
    return `/cards/${cardString}.png`;
};

export default function Card({ cardNum, showBack }) {
    if (showBack) {
        return (
            <div className='p-1'>
                <Image src={getCardPath(-1)} width="140" height="200" alt={getCardString(-1)} />
            </div>
        );
    }
    return (
        <div className='p-1'>
            <Image src={getCardPath(cardNum)} width="140" height="200" alt={getCardString(cardNum)} />
        </div>
    );
}