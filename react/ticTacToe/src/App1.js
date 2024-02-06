import React, {useState} from "react";
import './app.css'


const user = {
    name: 'zs',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
    age: 16,
}

const products = [
    {title: 'Cabbage', isFruit: false, id: 1},
    {title: 'Garlic', isFruit: false, id: 2},
    {title: 'Apple', isFruit: true, id: 3},
];


function MyButton() {
    return (
        <div>
            {
                user.name > 18 ? <p>已成年</p> : <p>未成年</p>
            }
            <button>登录</button>
        </div>

    )
}

function MyButton2() {
    function handleClick() {
        alert(user.name + ' ,你点击了按钮!')
    }

    return (
        <button onClick={handleClick}>
            点我
        </button>

    )
}

function MyButton3() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div>
            <br/>
            <br/>
            <button onClick={handleClick}>
                {user.name + '点击了 ' + count + ' 次'}
            </button>
            <br/>
            <br/>
        </div>
    )
}


function ShowAvatar() {
    return (
        <div>
            <h1>{user.name}</h1>
            <p className="paragraph">hahhaaaaa</p>
            <img
                className="avatar"
                src={user.imageUrl}
                alt={'photo of ' + user.name}
                style={{
                    width: user.imageSize,
                    height: user.imageSize
                }}
            />
        </div>
    )
}

function ProductList() {
    const listProducts = products.map(
        product =>
            <li key={product.id}>{product.title}</li>
    );
    return (
        <div>
            <br/>
            <ul>{listProducts}</ul>
        </div>

    )
}


function ShoppingList() {
    const listProducts = products.map(
        product =>
            <li
                key={product.id}
                style={{
                    color: product.isFruit ? 'green' : 'red'
                }}
            >
                {product.title}

            </li>
    );
    return (
        <div>
            <br/>
            <ul>{listProducts}</ul>
        </div>

    )
}

function MyButton4({count,onClick}) {
    return (
        <div>
            <br/>
<button onClick={onClick}>{'这个按钮被'+user.name + ' 点击了 '+ count+ ' 次!'}</button>
        </div>
    )
}


export default function App1() {
    const [count,setCount]=useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    return (
        <>
            <ShowAvatar/>
            <MyButton/>
            <ProductList/>
            <ShoppingList/>
            <MyButton2/>
            <MyButton3/>
            <MyButton3/>
            <MyButton4 count={count} onClick={handleClick}/>
            <MyButton4 count={count} onClick={handleClick}/>
        </>
    )
}