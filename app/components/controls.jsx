import Button from './button';

export default function Controls({ newHandFunc, hitFunc, standFunc, splitFunc, doubleFunc }) {
    return (
        <div className='flex justify-center p-2 space-x-2'>
            <Button text='New Hand' onClick={newHandFunc} color='blue' />
            <Button text='Stand' onClick={standFunc} color='green' />
            <Button text='Split' onClick={splitFunc} color='yellow' />
            <Button text='Double' onClick={doubleFunc} color='yellow' />
            <Button text='Hit' onClick={hitFunc} color='red' />
        </div>
    );
}