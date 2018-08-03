//Create a list that holds all of your cards
var cardDeck =[...document.getElementsByClassName('card')];
var table = document.querySelector('.deck');
var openCards = []
/*
* Display the cards on the page
*   - shuffle the list of cards
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
window.onload = function(){
  var shuffledDeck = shuffle(cardDeck);
  shuffledDeck.forEach(function(item) {
    table.appendChild(item);
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

window.addEventListener('load', onload, false);

function card_click(){
  this.classList.add('open', 'show');
  }

function addToOpen(){
  openCards.push(this);
}


for(var i = 0; i < cardDeck.length; i++){
  cardDeck[i].addEventListener('click', card_click);
  cardDeck[i].addEventListener('click', addToOpen);
  }


// var match = function() {
// 	if (font matches font) {
// 		do something
// 		call open deck function
// 	}else {
// 		flip cards over
// 	}
// }

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
