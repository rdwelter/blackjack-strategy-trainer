const styleNames = {
    'red': 'rounded-full w-[90px] h-[90px] justify-center bg-red-500 hover:bg-red-700',
    'blue': 'rounded-full w-[90px] h-[90px] justify-center bg-blue-500 hover:bg-blue-700',
    'yellow': 'rounded-full w-[90px] h-[90px] justify-center bg-yellow-500 hover:bg-yellow-700',
    'green': 'rounded-full w-[90px] h-[90px] justify-center bg-green-500 hover:bg-green-700'
};

export default function Button({ text, color, onClick }) {
    return <button onClick={onClick} className={styleNames[color]}>{text}</button>;
}