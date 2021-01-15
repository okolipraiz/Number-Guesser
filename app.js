/* 
GAME FUNCTION
- players must guess a number between a minimum and a max
- Players must they get a certain amount of guesses
- Notify the player of the guesses remaining
- let the player choose to play again
*/

//GAME VALUES
let min = 1,
    max = 10;
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;


//UI ELEMENTS
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//ASSIGN UI MIN & MAX
maxNum.textContent = max;
minNum.textContent = min;

//PLAY AGAIN
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
} )

//LISTEN FOR GUESS 
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value)

  //VALIDATE 
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please Enter a Number Between ${min} and ${max}`, 'red');
  }

//CHECK IF WON
if (guess === winningNum){
   //GAME OVER - WON
   
   gameOver(true, `${winningNum} is correct, YOU WIN :)`)

} else {
  //    WRONG GUESS
  guessesLeft -= 1;

  if(guessesLeft === 0){
      //GAME OVER - LOST
    gameOver(false, `Game Over, you lost. The correct number was ${winningNum} :(`, 'red'  );
   
  } else{
       // GAME CONTINUES - ANSWER WRONG
         
  //CHANGE BORDER COLOR
  guessInput.style.borderColor = 'red';

    //CLEAR INPUT
  guessInput.value = '';
      //GAME CONTINUES -ANSWER WRONG
  setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
  }
  }
  });

//GAME OVER
function gameOver(won, msg){
   let color;
   won === true ? color = 'green' : color = 'red'
   
    //DISABLE INPUT
    guessInput.disabled = true;
     //CHANGE BORDER COLOR
     guessInput.style.borderColor = color;
     //TEXT COLOR
     message.style.color = color;
     //SET MESSAGE
     setMessage(msg);

     //PLAY AGAIN
     guessBtn.value = 'Play Again';
     guessBtn.className += 'play-again';
}

//GET WINNING NUMBER
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//SET MESSAGE
function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;
}