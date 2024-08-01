import Image from 'next/image';

export default function Card({ id }) {
    return (<Image src={`/cards/${id}.png`} width="140" height="200" />);
}