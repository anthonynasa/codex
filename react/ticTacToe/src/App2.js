import {useState} from "react";

export default function App2() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1)
    }

    return (
        <div>
            <MyButton count={count} onClick={handleClick}/>
            <MyButton count={count} onClick={handleClick}/>
        </div>
    )
}

function MyButton({count, onClick}) {
    return (
        <div>
            <button onClick={onClick}>
                点击了 {count} 次
            </button>
        </div>
    )
}