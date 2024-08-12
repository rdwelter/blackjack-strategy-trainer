'use client';

import Hand from './components/hand';
import Controls from './components/controls';
import { useState } from 'react';

export default function Page() {
	const [dealerCards, setDealerCards] = useState([0, 1]);
	const [playerCards, setPlayerCards] = useState([2, 3]);
	const [gamePhase, setGamePhase] = useState('Player');

	return (
		<div id='container' className='bg-[#487860] h-screen'>
			<Hand currHand={dealerCards} isDealer={true} gamePhase={gamePhase} />
			<Hand currHand={playerCards} isDealer={false} gamePhase={gamePhase} />
			<Controls />
		</div>
	);
}