const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = document.querySelector('.btn__reset');
const btnRestart = document.createElement('button');
const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');
const btnLetter = document.querySelectorAll('button');
const heart = document.getElementsByClassName('tries');
let missedTries = 0;

let phrasesArray = [
    'angel numbers',
    'manifest it',
    'ride the wave',
    'plant lady',
    'white noise',
    'sun and moon',
    'protect your energy'
];

btnReset.addEventListener('click', () => {
  overlay.style.display = "none";
  
});

function getRandomPhraseAsArray(phrases) {
  const randomNum = Math.floor(Math.random() * phrasesArray.length);
//   console.log(randomNum);
  const randomPhrase = phrasesArray[randomNum];
//   console.log(randomPhrase);
  const newArray = [];
  for (let i =0; i < randomPhrase.length; i++) 
  {
     newArray[i] = randomPhrase[i];
  }
  return newArray; 
}

const li = document.createElement('li');

function addPhraseToDisplay(array) {
 for (let i = 0; i < array.length; i++) {
     const li = document.createElement('li');
     li.textContent = array[i];
     phrase.appendChild(li);

     if (array[i] === ' ')
     {
       li.className = 'space';
     } else {
       li.className = 'letter';
     }
 }
}

function removePhraseFromDisplay(array) {
  let removeLI = document.querySelectorAll('.letter');
  let removeSpace = document.querySelectorAll('.space');

  for (let i = 0; i < removeLI.length ; i++) {
   removeLI[i].remove();
}

for (let i = 0; i < removeSpace.length ; i++) {

  removeSpace[i].remove();
}


}


function checkLetter(buttonClicked) {
  const listItems = document.querySelectorAll('li');
    let matchFound = 'null';
    for (let i=0; i < listItems.length; i++) {
        if(buttonClicked.textContent === listItems[i].textContent) {
           listItems[i].classList.add('show');
           matchFound = buttonClicked.textContent;
        } 
    }
    return matchFound;
}

let getPhrase = getRandomPhraseAsArray(phrasesArray);
// console.log(getPhrase);
addPhraseToDisplay(getPhrase);

function checkWin() {
  
    let letter = document.getElementsByClassName('letter');
    let show = document.getElementsByClassName('show');
    // console.log(letter.length, show.length);
    
    if ( letter.length === show.length ) {
        overlay.className = 'win';
        title.textContent = 'You won!';
        overlay.style.display = 'flex';
        // add a new button and button listener
        btnReset.style.display = "none";
        btnRestart.textContent = 'Restart Game';
        btnRestart.className = 'btn__reset';
        overlay.appendChild(btnRestart);
        
    }

    if ( missedTries > 4 ) {
        overlay.className = 'lose';
        title.textContent = 'You lost :(';
        overlay.style.display = 'flex';
        // add a new button and button listener
        btnReset.style.display = "none";
        btnRestart.textContent = 'Restart Game';
        btnRestart.className = 'btn__reset';
        overlay.appendChild(btnRestart);
        
    }

    
}



btnRestart.addEventListener('click', () => {
  overlay.style.display = "none";
  missedTries = 0; 
  removePhraseFromDisplay(getPhrase);
  getPhrase = getRandomPhraseAsArray(phrasesArray);
  addPhraseToDisplay(getPhrase);
  // console.log(getPhrase);

  for (let i=0; i < 5; i++){
    heart[i].firstChild.src = "images/liveHeart.png";
  }

  for ( let i=0; i < btnLetter.length; i++){
    btnLetter[i].classList.remove('chosen');
    btnLetter[i].removeAttribute('disabled');
  }
  
});



for ( let i=0; i < btnLetter.length; i++) {

    btnLetter[i].addEventListener('click', () => {
       if (btnLetter[i].className !== 'chosen') {
        btnLetter[i].className = 'chosen';
        btnLetter[i].disabled  = true;
       }
        if (checkLetter(btnLetter[i]) === 'null') {
          missedTries++;
          for (let i=0; i < missedTries; i++){
          heart[i].firstChild.src = "images/lostHeart.png";
          }
        }
        checkWin();
    
       
    });
    
    }
