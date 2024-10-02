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
	console.log(sum);
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

const isPair = (thisHand) => {
	if (thisHand.length === 2) {
		return thisHand[0] % 13 === thisHand[1] % 13;
	}
	return false;
}

const winningHand = (blackjack, dealerHand, playerHand) => {
	if (blackjack) {
		return 'player';
	}
	const dealerVal = getHandValue(dealerHand);
	const playerVal = getHandValue(playerHand);
	if (playerVal > 21) {
		return 'dealer';
	}
	if (dealerVal > 21) {
		return 'player';
	}
	if (playerVal === dealerVal) {
		return 'push';
	}
	return playerVal > dealerVal ? 'player' : 'dealer';
}

export default function Page() {
	const shoeRef = useRef(new Shoe(2));
	const [dealerCards, setDealerCards] = useState([0, 1]);
	const [playerCards, setPlayerCards] = useState([[2, 3]]);
	const [gamePhase, setGamePhase] = useState('START');
	const [currHandNum, setCurrHandNum] = useState(0);
	const numHandsRef = useRef(1);
	const intervalRef = useRef();
	const doubleRef = useRef(false);
	const dealerFinishedRef = useRef(false);
	const dealerDrawnCardRef = useRef(null);

	let blackjack = false;

	const dealCard = useCallback(() => shoeRef.current.dealCard(), []);

	const playerHands = playerCards.map((currHand, ind) =>
		<li key={'' + ind} className='flex-1 p-[10px]'>
			<Hand currHand={currHand} isDealer={false} displayIndicator={gamePhase === 'Player' && currHandNum === ind} gamePhase={gamePhase} winner={gamePhase === 'END' ? winningHand(blackjack, dealerCards, currHand) : ''} />
		</li>
	);

	function dealNewHand() {
		if (gamePhase === 'START' || gamePhase === 'END') {
			clearInterval(intervalRef.current);
			blackjack = false;
			doubleRef.current = false;
			numHandsRef.current = 1;
			shoeRef.current.shuffle();
			const newDealerCards = [dealCard(), dealCard()];
			const newPlayerCards = [[dealCard(), dealCard()]];
			if (getHandValue(newPlayerCards[0]) === 21) {
				blackjack = true;
			}
			setCurrHandNum(0);
			setDealerCards(newDealerCards);
			setPlayerCards(newPlayerCards);
			setGamePhase('Player');
		}
	}

	function playerHit() {
		if (gamePhase === 'Player') {
			const newCard = dealCard();
			setPlayerCards(currCards => {
				const newCards = [...currCards];
				newCards[currHandNum] = [...newCards[currHandNum], newCard];
				return newCards;
			});
		}
	}

	function playerStand() {
		if (gamePhase === 'Player') {
			setCurrHandNum(num => num + 1);
			if (currHandNum + 1 === numHandsRef.current) {
				dealerPhase();
			}
		}
	}

	function dealerPhase() {
		if (gamePhase === 'Player') {
			setGamePhase('Dealer');
			const dealerPlayInt = setInterval(() => {
				dealerDrawnCardRef.current = dealCard();
				setDealerCards(currCards => {
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
		if (gamePhase === 'Player' && playerCards[currHandNum].length === 2) {
			const newCard = dealCard();
			setPlayerCards(currCards => {
				const newCards = [...currCards];
				newCards[currHandNum] = [...newCards[currHandNum], newCard];
				return newCards;
			});
			doubleRef.current = true;
		}
	}

	useEffect(() => {
		if (dealerFinishedRef.current === true) {
			dealerFinishedRef.current = false;
			if (dealerDrawnCardRef.current) {
				shoeRef.current.replaceCard(dealerDrawnCardRef.current);
				dealerDrawnCardRef.current = null;
			}
		}
	});

	useEffect(() => {
		if (gamePhase === 'Player' && (doubleRef.current || getHandValue(playerCards[currHandNum]) >= 21)) {
			doubleRef.current = false;
			playerStand();
		}
	}, [playerCards])

	function playerSplit() {
		if (gamePhase === 'Player' && playerCards[currHandNum].length === 2 && isPair(playerCards[currHandNum])) {
			const newCard1 = dealCard();
			const newCard2 = dealCard();
			const pairCard = playerCards[currHandNum][1];
			numHandsRef.current += 1;
			setPlayerCards((currCards) => {
				let newCards = [...currCards];
				newCards[currHandNum].pop()
				newCards[currHandNum].push(newCard1);
				newCards.push([pairCard, newCard2]);
				return newCards;
			});
		}
		else {
			if (gamePhase !== 'Player') {
				console.log("Not correct phase");
			}
			if (playerCards[currHandNum].length !== 2) {
				console.log("More than 2 cards");
			}
			if (!isPair(playerCards[currHandNum])) {
				console.log("Not a pair");
			}
		}
	}

	return (
		<div id='container' className='bg-[#487860] h-screen'>
			<Hand currHand={dealerCards} isDealer={true} displayIndicator={false} gamePhase={gamePhase} />
			<ul className='flex justify-center w-screen'>{playerHands}</ul>
			<Controls newHandFunc={dealNewHand} hitFunc={playerHit} standFunc={playerStand} doubleFunc={playerDouble} splitFunc={playerSplit} />
		</div>
	);
}