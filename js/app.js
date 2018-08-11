//Create a list that holds all of your cards
var cardDeck =[...document.getElementsByClassName('card')];
//create variables for needed elements
var deck = document.querySelector('.deck');
var stars = [...document.getElementsByClassName('fa-star')];
let moves = document.querySelector('.moves');
let restart = document.querySelector('.restart');
let replay = document.getElementById('replayBtn');
let counter = 0;
let time = 0;
let timer;
let matchedCards = 0;
let openCards = [];
/*
* Display the cards on the page
*   - shuffle the list of cards
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
window.onload = function startGame() {
  var shuffledDeck = shuffle(cardDeck);
  shuffledDeck.forEach(function(item) {
    deck.appendChild(item);
  });
    startTimer();
  }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//functions called from event listener
function changeClass(e){
  e.classList.toggle('open');
  e.classList.toggle('show');
}

function addToOpen(e){
  openCards.push(e);
  if (openCards.length === 2){
    match();
  }
}

//called from addToOpen
function match(){
  if(openCards[0].innerHTML === openCards[1].innerHTML){
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    openCards.forEach(bounce);
    changeMoves();
    matchedCards++;
    openCards = [];
  }else{
    setTimeout(() => {
      noMatch();
    }, 800);
  }
}

function noMatch(){
  openCards.forEach(changeClass);
  openCards.forEach(shake);
  changeMoves();
  openCards = []
}

//CSS Animations
function bounce(e) {
  e.classList.add('bounce');
  setTimeout(() => {
    e.classList.remove('bounce');
  }, 1000)
}

function shake(e) {
  e.classList.add('shake');
  setTimeout(() => {
    e.classList.remove('shake');
  }, 1000)
}

function spin(e) {
  e.classList.add('spin');
}

function changeMoves(){
  counter++
  moves.innerHTML = counter;
  switch(true){
    case (counter === 9):
    if(stars[0].classList.contains('fa-star')) {
      stars[0].classList.add('fa-star-o')
    };
    break;
    case (counter === 15):
    if(stars[1].classList.contains('fa-star')) {
      stars[1].classList.add('fa-star-o')
    };
    break;
    case (counter >= 20):
    if(stars[2].classList.contains('fa-star')) {
      stars[2].classList.add('fa-star-o')
    };
    break;
  }
}

function endGame(){
  if(matchedCards === 8) {
    setTimeout(() => {
      modal.style.display = "block";
    }, 2000);
    clearInterval(timer);
    cardDeck.forEach(spin);
    inputStats();
  }
}

//timer
function startTimer() {
  timer = setInterval(function(){
    time++;
    let min = Math.floor(time/100/60);
    let sec = Math.floor(time/100);
    if(min < 10) {
      min = "0" + min;
    }
    if(sec >= 60) {
      sec = sec % 60;
    }
    if(sec < 10) {
      sec = "0" + sec;
    }
    document.getElementById('timer').innerHTML = `${min}:${sec}`;
  }, 10);
}

//if user clicks on restart or replay button (in modal), the game reloads
restart.addEventListener('click', function() {
  location.reload();
})

replay.addEventListener('click', function() {
  location.reload();
})

deck.addEventListener('click', function(event){
  const e = event.target;
  if(e.classList.contains('card')
  && openCards.length < 2
  && !openCards.includes(e)
  && !e.classList.contains('match')){
    changeClass(e);
    addToOpen(e);
    endGame();
  }
}, false);

//modal stuff
let modal = document.getElementById('myModal');

let closeBtn = document.getElementsByClassName("close")[0];

//fills in the modal with appropriate information
function inputStats() {
  const stoppedTimer = document.getElementById('timer').innerHTML;
  const stars = document.querySelector('.stars').innerHTML;
  document.querySelector('.modal-moves').innerHTML = `Moves: ${counter}`;
  document.querySelector('.modal-time').innerHTML = `Time: ${stoppedTimer}`;
  document.querySelector('.modal-stars').innerHTML = `Stars: ${stars}`;
}

//closes the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

  //closes the modal if you click anywhere outside of the modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

  /*
  *General Instructions
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *  - if the list already has another card, check to see if the two cards match
  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  */
