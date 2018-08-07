//Create a list that holds all of your cards
var cardDeck =[...document.getElementsByClassName('card')];
//create variables for needed elements
var deck = document.querySelector('.deck');
var stars = document.querySelector('.stars');
let moves = document.querySelector('.moves');
let counter = 0;
let openCards = []
/*
* Display the cards on the page
*   - shuffle the list of cards
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
window.onload = function(){
  var shuffledDeck = shuffle(cardDeck);
  shuffledDeck.forEach(function(item) {
    deck.appendChild(item);
  });
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

function bounce(e) {
  e.classList.toggle('bounce');
}

function shake(e) {
  e.classList.add('shake');
}

function spin(e) {
  //all cards spin upon winning
}
function match(){
  if(openCards[0].innerHTML === openCards[1].innerHTML){
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    //openCards.forEach(bounce);
    counter++;
    openCards = [];
  }else{
    setTimeout(() => {
      noMatch();
    }, 1000);
  }
}

function noMatch(){
  openCards.forEach(changeClass);
  //openCards.forEach(shake);
  counter++;
  openCards = []
}

deck.addEventListener('click', function(event){
  const e = event.target;
  if(e.classList.contains('card')
  && openCards.length < 2
  && !openCards.includes(e)
  && !e.classList.contains('match')){
    changeClass(e);
    addToOpen(e);
  }
}, false);


/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
