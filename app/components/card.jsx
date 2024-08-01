import Image from 'next/image';

export default function Card({ id }) {
    return (
        <div className='p-1'>
            <Image src={`/cards/${id}.png`} width="140" height="200" />
        </div>
    );
}