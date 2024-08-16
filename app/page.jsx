'use client';

import Hand from './components/hand';
import Controls from './components/controls';
import { useState, useRef } from 'react';

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
	const [playerCards, setPlayerCards] = useState([[2, 3]]);
	const [gamePhase, setGamePhase] = useState('START');
	const intervalRef = useRef();

	const playerHands = playerCards.map((currHand, ind) =>
		<li key={'' + ind} className='flex-1 p-[10px]'>
			<Hand currHand={currHand} isDealer={false} gamePhase={gamePhase} />
		</li>
	);

	function dealNewHand() {
		clearInterval(intervalRef.current);
		let dealerHand = [];
		let playerHand = [[]];
		do {
			let newHand = [];
			while (newHand.length < 4) {
				let newCard = generateNewCard();
				while (newHand.includes(newCard)) {
					newCard = generateNewCard();
				}
				newHand.push(newCard);
			}
			dealerHand = newHand.slice(0, 2);
			playerHand[0] = newHand.slice(2, 4);
		} while (getHandValue(dealerHand) === 21 || getHandValue(playerHand[0]) === 21);
		setDealerCards(dealerHand);
		setPlayerCards(playerHand);
		setGamePhase('Player');
	}

	function playerHit() {
		if (gamePhase === 'Player' && getHandValue(playerCards[0]) < 21) {
			let newHand = [...playerCards];
			let newCard = generateNewCard();
			while (newHand[0].includes(newCard) || dealerCards.includes(newCard)) {
				newCard = generateNewCard();
			}
			newHand[0].push(newCard);
			// console.log(getHandValue(newHand));
			setPlayerCards(newHand);
			const newHandValue = getHandValue(newHand[0]);
			if (newHandValue === 21) {
				playerStand();
			}
			else {
				setGamePhase(newHandValue < 21 ? 'Player' : 'Dealer');
			}
		}
	}

	function playerStand() {
		setGamePhase('Dealer');

		intervalRef.current = setInterval(() => {
			setDealerCards(currCards => {
				if (getHandValue(currCards) > 16) {
					clearInterval(intervalRef.current);
					return currCards;
				}
				else {
					let newCard = generateNewCard();
					while (currCards.includes(newCard) || playerCards[0].includes(newCard)) {
						newCard = generateNewCard();
					}
					const newCards = [...currCards, newCard];
					return newCards;
				}
			})
		}, 700);
	}

	function playerDouble() {
		if (playerCards[0].length === 2) {
			playerHit();
			playerStand();
		}
	}

	return (
		<div id='container' className='bg-[#487860] h-screen'>
			<Hand currHand={dealerCards} isDealer={true} gamePhase={gamePhase} />
			<ul className='flex justify-center w-screen'>{playerHands}</ul>
			<Controls newHandFunc={dealNewHand} hitFunc={playerHit} standFunc={playerStand} doubleFunc={playerDouble} />
		</div>
	);
}