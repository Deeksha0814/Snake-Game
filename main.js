// Steps:
// 1. Update the page.
// 2. game function ->
// - update the position of snake and food, write code for collision and if snake eat the food then grow its length and move forward
// - draw the snake and food
// 3. Add EventListeners for the movement of snake


// Declared variables-

let lastRenderTime=0;
const snakeSpeed=5;
let dir={x:0,y:0};                                               // Input direction
const board=document.getElementById('board');
let snakePositionArray=[{x:3,y:5}],
food= {x:10,y:10};
let score=0;

// Step 1: Update the page:
function main(currentTime){
    requestAnimationFrame(main);                                  // Calling the main function again and again 
    const seconds=(currentTime-lastRenderTime)/1000;              // 'Seconds' shows the time difference between the time it last render the page and the current time. ( /1000 => Converting miliseconds into seconds)
    if(seconds < 1/snakeSpeed){                                   // Checking if the time diffence is equal to the desired value(i.e. 1/speed = 1/5 = means 5times in 1second) or not.
        return;
    }
    lastRenderTime = currentTime;                                 // Updating the lastRender time value with the current time value

    playGame();                                                   // Calling the main play function
}


// Step 2: Main play function

// Collide function
function collide(snakearr){
    // 1. with its own body
   for(let i=1; i< snakePositionArray.length; i++){
    if(snakearr[i].x===snakearr[0].x && snakearr[i].y===snakearr[0].y){
        return true;
    }
   }

   // 2. If collided with the wall
   if ( snakearr[0].x >= 20 || snakearr[0].x <= 0 || snakearr[0].y >= 20 || snakearr[0].y <= 0) {
    return true;
  }

   return false;
}

function playGame(){

    // -> updating the board

    // 1. if snake get collided with the wall or its own body
    if(collide(snakePositionArray)){
         
        dir={x:0, y:0};                                                    
        alert("Game Over!! Press any key to play again");
        snakePositionArray={x:3,y:5}; 
        score=0;  
        location.reload();
    }

    // 2. When snake eats the food -> update the size of snake -> palce food somewhere else

    // After eating the food new block will be added
    // Unshift is used to add any something in the front of the array
    if(snakePositionArray[0].x === food.x && snakePositionArray[0].y === food.y){
        snakePositionArray.unshift({ x: snakePositionArray[0].x+dir.x,  y: snakePositionArray[0].y+dir.y });

        // Updating the score
        score++;
        let scoreCard=document.getElementById('scoreCard');
        scoreCard.innerHTML="Score: "+score;

        // Randomly allocating the food on the board
        food={
            x: Math.floor(Math.random()*20 +1), 
            y: Math.floor(Math.random()*20 +1)
        };
    }

    // 3. Move the snake

    // Upadting the last pos of snake to its latter one and the head will be updated with the new block in which the snake is mpving
    for(let i=snakePositionArray.length-2; i>=0; i--){
        snakePositionArray[i+1]={...snakePositionArray[i]}
    }
    snakePositionArray[0].x +=dir.x;
    snakePositionArray[0].y +=dir.y;

    
    // -> drawing the snake and food
    // 1. For snake:
    board.innerHTML="";
    snakePositionArray.forEach((e,index)=>{
        let snakeBody=document.createElement('div');
        snakeBody.style.gridRowStart= e.y;
        snakeBody.style.gridColumnStart= e.x;
        if(index===0){
            snakeBody.classList.add('head')
        }
        else{
            snakeBody.classList.add('snake')
        }
        board.appendChild(snakeBody);
    })

    // 2. For food:
    let foodBody=document.createElement('div');
    foodBody.style.gridRowStart=food.y;
    foodBody.style.gridColumnStart=food.x;
    foodBody.classList.add('food');
    board.appendChild(foodBody);
}


window.requestAnimationFrame(main);

// Step 3: Adding EventListeners for listening the arrow keys to move the snake

window.addEventListener('keydown', (e)=>{

    if(e.key == "ArrowUp" && dir.y!=1){
        dir.x=0;
        dir.y=-1;
    }

    if(e.key == "ArrowDown" && dir.y!=-1){
        dir.x=0;
        dir.y=1;
    }

    if(e.key == "ArrowLeft" && dir.x!=1){
        dir.x=-1;
        dir.y=0;
    }

    if(e.key == "ArrowRight" && dir.x!=-1){
        dir.x=1;
        dir.y=0;
    }
});




