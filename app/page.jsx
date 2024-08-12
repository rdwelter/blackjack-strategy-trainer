import Card from './components/card';
import Controls from './components/controls';

export default function Page() {
	return (
		<div id='container' className='bg-[#487860] h-screen'>
			<div id='dealer-hand' className='flex justify-center align-center p-2'>
				<Card cardNum={0} showBack={false} />
				<Card cardNum={1} showBack={true} />
			</div>
			<div id='player-hand' className='flex justify-center align-center p-2'>
				<Card cardNum={2} showBack={false} />
				<Card cardNum={3} showBack={false} />
			</div>
			<Controls />
		</div>
	);
}