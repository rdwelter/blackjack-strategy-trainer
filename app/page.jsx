'use client';

import Hand from './components/hand';
import Controls from './components/controls';
import { useState } from 'react';

export default function Page() {
	const [dealerCards, setDealerCards] = useState([0, 1]);
	const [playerCards, setPlayerCards] = useState([2, 3]);
	const [gamePhase, setGamePhase] = useState('START');

	function dealNewHand() {
		let newHand = [];
		while (newHand.length < 4) {
			let newCard = Math.floor(Math.random() * 52);
			while (newHand.includes(newCard)) {
				newCard = Math.floor(Math.random() * 52);
			}
			newHand.push(newCard);
		}
		const dealerHand = newHand.slice(0, 2);
		const playerHand = newHand.slice(2, 4);
		setDealerCards(dealerHand);
		setPlayerCards(playerHand);
		setGamePhase('Player');
	}

	return (
		<div id='container' className='bg-[#487860] h-screen'>
			<Hand currHand={dealerCards} isDealer={true} gamePhase={gamePhase} />
			<Hand currHand={playerCards} isDealer={false} gamePhase={gamePhase} />
			<Controls newHandFunc={dealNewHand} />
		</div>
	);
}