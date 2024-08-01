import Card from './components/card';

export default function Page() {
	return (
		<div id='container' className='bg-[#487860] h-screen'>
			<div id='dealer-hand' className='flex justify-center align-center p-2'>
				<Card id='diamonds_queen' />
			</div>
			<div id='player-hand' className='flex justify-center align-center p-2'>
				<Card id='diamonds_king' />
				<Card id='diamonds_ace' />
			</div>
		</div>
	);
}