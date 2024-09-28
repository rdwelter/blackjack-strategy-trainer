'use client';

import Hand from './components/hand';
import Controls from './components/controls';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Shoe } from './lib/shoe';

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
	for (let card = 0; card < thisHand.length; card++) {
		const valueNum = thisHand[card] % 13;
		// console.log("Found card " + valueNum);
		sum += getCardValue[valueNum];
		if (valueNum === 0) {
			numAces += 1;
		}
	}
	// console.log("There are " + numAces + " aces");
	while (numAces > 0 && sum > 21) {
		sum -= 10;
		numAces -= 1;
	}
	// console.log(sum);
	return sum;
}

const isSoft17 = (thisHand) => {
	let sum = 0;
	let aces = 0;
	for (let card = 0; card < thisHand.length; card++) {
		const valueNum = thisHand[card] % 13;
		sum += getCardValue[valueNum];
		if (valueNum === 0) {
			aces += 1;
		}
	}
	if (aces > 0) {
		return sum === 17;
	}
	return false;
}

export default function Page() {
	const shoeRef = useRef(new Shoe(2));
	const [dealerCards, setDealerCards] = useState([0, 1]);
	const [playerCards, setPlayerCards] = useState([[2, 3]]);
	const [gamePhase, setGamePhase] = useState('START');
	const [currentHand, setCurrentHand] = useState(0);
	const intervalRef = useRef();
	const doubleRef = useRef(false);
	const dealerFinishedRef = useRef(false);
	const dealerDrawnCardRef = useRef(null);

	const dealCard = useCallback(() => shoeRef.current.dealCard(), []);
	// const replaceCard = useCallback((card) => shoeRef.current.replaceCard(card), []);

	const playerHands = playerCards.map((currHand, ind) =>
		<li key={'' + ind} className='flex-1 p-[10px]'>
			<Hand currHand={currHand} isDealer={false} displayIndicator={gamePhase === 'Player' && currentHand === ind} gamePhase={gamePhase} />
		</li>
	);

	function dealNewHand() {
		if (gamePhase === 'START' || gamePhase === 'END') {
			clearInterval(intervalRef.current);
			doubleRef.current = false;
			shoeRef.current.shuffle();
			const newDealerCards = [dealCard(), dealCard()];
			const newPlayerCards = [[dealCard(), dealCard()]];
			setDealerCards(newDealerCards);
			setPlayerCards(newPlayerCards);
			setGamePhase('Player');
			setCurrentHand(0);
		}
	}

	function playerHit() {
		if (gamePhase === 'Player') {
			const newCard = dealCard();
			setPlayerCards(currCards => {
				const newCards = [...currCards];
				newCards[currentHand] = [...newCards[currentHand], newCard];
				// console.log("Getting hand value from hit function");
				let handValue = getHandValue(newCards[currentHand]);
				if (handValue === 21) {
					setTimeout(playerStand, 0);
				}
				else if (handValue > 21) {
					setTimeout(() => setGamePhase('END'), 0);
				}
				return newCards;
			});
		}
	}

	function playerStand() {
		if (gamePhase === 'Player') {
			setGamePhase('Dealer');
			const dealerPlayInt = setInterval(() => {
				dealerDrawnCardRef.current = dealCard();
				setDealerCards(currCards => {
					// console.log("Getting hand value from stand function");
					if (getHandValue(currCards) > 16 && !isSoft17(currCards)) {
						setGamePhase('END');
						clearInterval(dealerPlayInt);
						dealerFinishedRef.current = true;
						return currCards;
					}
					else {
						const newCards = [...currCards, dealerDrawnCardRef.current];
						return newCards;
					}
				});
			}, 700);
			intervalRef.current = dealerPlayInt;
		}
	}

	function playerDouble() {
		if (gamePhase === 'Player' && playerCards[currentHand].length === 2) {
			const newCard = dealCard();
			setPlayerCards(currCards => {
				const newCards = [...currCards];
				newCards[currentHand] = [...newCards[currentHand], newCard];
				return newCards;
			});
			doubleRef.current = true;
		}
	}

	useEffect(() => {
		if (gamePhase === 'Player' && doubleRef.current === true) {
			doubleRef.current = false;
			// console.log("Getting value from double function");
			if (getHandValue(playerCards[currentHand]) > 21) {
				setGamePhase('END');
			}
			else {
				playerStand();
			}
		}
	}, [gamePhase, playerCards, currentHand]);

	useEffect(() => {
		if (dealerFinishedRef.current === true) {
			dealerFinishedRef.current = false;
			if (dealerDrawnCardRef.current) {
				shoeRef.current.replaceCard(dealerDrawnCardRef.current);
				dealerDrawnCardRef.current = null;
			}
		}
	});

	function playerSplit() {
		if (gamePhase === 'Player') {
			;
		}
	}

	return (
		<div id='container' className='bg-[#487860] h-screen'>
			<Hand currHand={dealerCards} isDealer={true} displayIndicator={false} gamePhase={gamePhase} />
			<ul className='flex justify-center w-screen'>{playerHands}</ul>
			<Controls newHandFunc={dealNewHand} hitFunc={playerHit} standFunc={playerStand} doubleFunc={playerDouble} />
		</div>
	);
}