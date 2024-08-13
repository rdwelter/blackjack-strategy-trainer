'use client';

import Hand from './components/hand';
import Controls from './components/controls';
import { useState } from 'react';

const getCardValue = {
	0: 11,
	1: 2,
	2: 3,
	3: 4,
	4: 5,
	5: 6,
	6: 7,
	7: 8,
	8: 9,
	9: 10,
	10: 10,
	11: 10,
	12: 10
};

const getHandValue = (thisHand) => {
	let sum = 0;
	let numAces = 0;
	for (let i = 0; i < thisHand.length; i++) {
		const valueNum = thisHand[i] % 13;
		sum += getCardValue[valueNum];
		if (valueNum === 0) {
			numAces += 1;
		}
	}
	while (numAces > 0 && sum > 21) {
		sum -= 10;
		numAces -= 1;
	}
	return sum;
}

const generateNewCard = () => Math.floor(Math.random() * 52);

export default function Page() {
	const [dealerCards, setDealerCards] = useState([0, 1]);
	const [playerCards, setPlayerCards] = useState([2, 3]);
	const [gamePhase, setGamePhase] = useState('START');

	function dealNewHand() {
		let newHand = [];
		while (newHand.length < 4) {
			let newCard = generateNewCard();
			while (newHand.includes(newCard)) {
				newCard = generateNewCard();
			}
			newHand.push(newCard);
		}
		const dealerHand = newHand.slice(0, 2);
		const playerHand = newHand.slice(2, 4);
		setDealerCards(dealerHand);
		setPlayerCards(playerHand);
		setGamePhase(getHandValue(playerHand) < 21 ? 'Player' : 'Dealer');
	}

	function playerHit() {
		if (getHandValue(playerCards) < 21) {
			let newHand = [...playerCards];
			let newCard = generateNewCard();
			while (newHand.includes(newCard) || dealerCards.includes(newCard)) {
				newCard = generateNewCard();
			}
			newHand.push(newCard);
			console.log(getHandValue(newHand));
			setPlayerCards(newHand);
			setGamePhase(getHandValue(newHand) < 21 ? 'Player' : 'Dealer');
		}
	}

	return (
		<div id='container' className='bg-[#487860] h-screen'>
			<Hand currHand={dealerCards} isDealer={true} gamePhase={gamePhase} />
			<Hand currHand={playerCards} isDealer={false} gamePhase={gamePhase} />
			<Controls newHandFunc={dealNewHand} hitFunc={playerHit} />
		</div>
	);
}