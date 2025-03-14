import {useState} from 'react'

function Square({value, onSquareClick}){
  return <button className="square" onClick={onSquareClick}>{value}</button> // value: props
}

// all states in board to determine winner later
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null)) // shared state (parent with children - board with squares)

  // 'onSomething' for props which represent events and 'handleSomething' for the function definitions which handle those events
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice() // creates a copy (immutability)
    // Avoiding direct data mutation lets you keep previous versions of the data intact, and reuse them later
    if(xIsNext){
      nextSquares[i] = 'X'
    }else{
      nextSquares[i] = 'O'
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }
  const winner  = calculateWinner(squares)
  let status
  if(winner){
    status = "Winner: "+winner
  }else{
    status = "Next player: "+(xIsNext? "X": "O")
  }
  return( //  => arrow function
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)}></Square> 
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}></Square>
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}></Square>
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}></Square>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}></Square>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}></Square>
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}></Square>
      </div>
    </>
  )
}

function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i]
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return squares[a];
    }
  }
  return null;
}