'use client';

export default function Button({ text, onClick, color }) {
    const backgroundColorString = {
        'blue': 'rounded-full bg-blue-400 hover:bg-blue-200 w-[100px] h-[100px]',
        'red': 'rounded-full bg-red-400 hover:bg-red-200 w-[100px] h-[100px]',
        'green': 'rounded-full bg-green-400 hover:bg-green-200 w-[100px] h-[100px]',
    };

    return (
        <div>
            <button className={`${backgroundColorString[color]}`} onClick={onClick}>{text}</button>
        </div>
    );
}