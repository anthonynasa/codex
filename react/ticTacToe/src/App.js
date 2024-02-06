import {useState} from "react";


function Square({value, onSquareClick}) {
    return (
        <button
            className="square"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({xIsNext, squares, onPlay}) {
    function handleClick(i) {
        // 如果已有内容,或已经胜利,则返回
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        // 创建数组副本
        const nextSquares = squares.slice();
        // 交替显示 xo
        xIsNext === true ? nextSquares[i] = "x" : nextSquares[i] = "o";
        onPlay(nextSquares);
    }

    // 计算胜利者,更新状态
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
        // 3s后重置游戏
        // setTimeout(()=>onPlay(Array(9).fill(null)),3000);
    } else {
        status = "Next Player: " + (xIsNext ? "x" : "o")
    }
    return (
        <div>
            <div className="status">{status}</div>
            {Array(3).fill(null).map((_, row) => (
                    <div key={row} className="board-row">
                        {Array(3).fill(null).map((_, col) => {
                                const index = row * 3 + col;
                                return (
                                    <Square
                                        key={index}
                                        value={squares[index]}
                                        onSquareClick={() => handleClick(index)}

                                    />
                                )
                            }
                        )}
                    </div>
                )
            )}
        </div>

    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


export default function App() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    // 处理点击事件,像历史数组中添加新的数组
    function handlePlay(nextSquares) {
        const nexHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nexHistory);
        setCurrentMove(nexHistory.length - 1);
        setXIsNext(!xIsNext)
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0)
    }

    const moves = history.map((squares, move, arr) => {
        let description;
        move > 0 ? description = 'Go to move #' + move : description = 'Go to game start';
        console.log(squares + '-----\n' + move + '---------\n' + arr)
        return (
            <li key={move}>
                <p onClick={() => jumpTo(move)}>{description} </p>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>

    )
}


