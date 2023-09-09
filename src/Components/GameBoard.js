import React, { useEffect, useRef, useState } from 'react';
import moveS from '../sound/move.mp3';
import foodS from '../sound/food.mp3';
import gameOverS from '../sound/game over.mp3';



function GameBoard({snakeArr,setSnakeArr,highScore,setHighScore,difficulty,volume}) {
  let moveSound = new Audio(moveS);
  let foodSound = new Audio(foodS);
  let gameOverSound = new Audio(gameOverS);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [food, setFood] = useState({ x: 5, y: 9 });

  function speed(){
    let changeSpeed;
    if(difficulty===1){
      difficulty="easy"
    }
    switch(difficulty){
      case "easy":
      changeSpeed=300;
      break;

      case "medium":
      changeSpeed=200;
      break;

      case "hard":
      changeSpeed=100;
      break;

      default:
      break;
    }

    return changeSpeed;
  }

  function setGrid(){
    let grid = [];
    let row = 1;
    for(let i = 0; i<18; i++){
      for(let j = 0; j<18; j++){
    let col = j+1;
        grid.push(<div className='cell' 
        key={i * 18 + j}
          style={{
            gridRowStart: row,
            gridColumnStart: col,
          }}
        ></div>)
      }
      row++;
    }
    return grid;
  }

  function changePosition(x, y) {
    if(x!==y){
      const newSnakeArr = [...snakeArr];

      for (let i = snakeArr.length - 2; i >= 0; i--) {
        newSnakeArr[i + 1] = { ...newSnakeArr[i] };
      }
  
      newSnakeArr[0] = { x: snakeArr[0].x + x, y: snakeArr[0].y + y };
  
      setSnakeArr(newSnakeArr);      
    }
    
  }
  function moveSnake(e) {
   moveSound.play();
        switch (e.key) {
          case 'ArrowUp':
            if(!(direction.y===1)){
              setDirection({ x: 0, y: -1 });
            }
            break;
          case 'ArrowDown':
            if(!((direction.y===-1) || ((direction.x===0)&&(direction.y===0)))){
              setDirection({ x: 0, y: 1 });
            }
            break;
          case 'ArrowRight':
            if(!(direction.x===-1)){
              setDirection({ x: 1, y: 0 });            
            }
            break;
          case 'ArrowLeft':
            if(!(direction.x===1)){
            setDirection({ x: -1, y: 0 });
            }
            break;
          default:
            break;
        }
        
    
  }
  function isCollapse(){
    let collapse = false;
    //collapse with itself
    for(let i = 1; i<snakeArr.length; i++){
      if(snakeArr[0].x==snakeArr[i].x-direction.x && snakeArr[0].y==snakeArr[i].y-direction.y){
        return true;
      }
    }
    
    //collapse with border
if(snakeArr[0].x>18 || snakeArr[0].y>18 || snakeArr[0].x<=0 || snakeArr[0].y<=0){
  return true;
}

    return false;
  }

  function generateNewFoodPosition(){
    //random postion and avoid the snake postion
    const newFood = {x:Math.floor((Math.random()*18)+1),y:Math.floor((Math.random()*18)+1)}//1(because of +1) to 18(exclusive)  
    for(let i = 0; i<snakeArr.length; i++){
      if(snakeArr[i].x==newFood.x && snakeArr[i].y==newFood.y){
        generateNewFoodPosition();
      }
    }
    return newFood;
  }

function trackSnake(){
  if(isCollapse()){
  gameOverSound.play();
    setDirection({x:0,y:0});
    setSnakeArr([{ x: 10, y: 10 }, { x: 10, y: 11 }]);
    const newFood = generateNewFoodPosition();
    setFood(newFood);
      if(((snakeArr.length)-2)>highScore){
          setHighScore(((snakeArr.length)-2))
          localStorage.setItem("highscore",(snakeArr.length)-2)
  }
    return;
  }
  if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
    foodSound.play();
  const newHead = {x:snakeArr[0].x+direction.x,y:snakeArr[0].y+direction.y};
  const newsnakeArr = [newHead,...snakeArr];
  setSnakeArr(newsnakeArr);
  const newFood = generateNewFoodPosition();
    setFood(newFood);
  }
}

  useEffect(() => {
    function volumeControle(){
      moveSound.volume=volume;
      foodSound.volume=volume;
      gameOverSound.volume=volume;
    }
    volumeControle(volume)
    window.addEventListener('keydown', moveSnake);

    const gameInterval = setInterval(() => {
      changePosition(direction.x, direction.y);
      trackSnake();
      
    }, speed()); 

    return () => {
      window.removeEventListener('keydown', moveSnake);
      clearInterval(gameInterval);
    };
  }, [direction, snakeArr]);




  return (
    <div className='game-board'>
      {setGrid()}
      {snakeArr.map((ele, index) => (
        <div
          className={` ${index === 0 ? 'head' : 'snake-segment'}`}
          key={index}
          style={{
            gridRowStart: ele.y,
            gridColumnStart: ele.x,
          }}
        ></div>
      ))}
      <div
        className='food'
        style={{
          gridRowStart: food.y,
          gridColumnStart: food.x,
        }}
      ></div>
    </div>
  );
}

export default GameBoard;
