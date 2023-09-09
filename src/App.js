import './App.css';
// import './Test.css';
import GameBoard from './Components/GameBoard';
// import Test from './Test/Test';
import ScoreBoard from './Components/ScoreBoard';
import { useState } from 'react';

function App() {
  const [snakeArr, setSnakeArr] = useState([{ x: 10, y: 10 }, { x: 10, y: 11 }]);
  const initialHighScore = localStorage.getItem("highscore") || 0 ;
  const [highScore,setHighScore] = useState(initialHighScore);
  const [difficulty,setDifficulty] = useState(1);
  const [volume,setVolume] = useState(0.5);    


  return (
    <div className="App">
      <header className="App-header">
        <div className='row-div'>
          {/*         <Test
        snakeArr={snakeArr}
        setSnakeArr={setSnakeArr}
        highScore={highScore}
        setHighScore={setHighScore}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        volume={volume}
        setVolume={setVolume}
        />
       */}
        <GameBoard
        snakeArr={snakeArr}
        setSnakeArr={setSnakeArr}
        highScore={highScore}
        setHighScore={setHighScore}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        volume={volume}
        setVolume={setVolume}
        />
        <ScoreBoard
        snakeArr={snakeArr}
        highScore={highScore}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        volume={volume}
        setVolume={setVolume}
        />
        </div>
        <pre className='message'>{`Comming soon for small screens
untill that you can enjoy this game one large screens`
        }
        </pre>
      </header>
    </div>
  );
}

export default App;
