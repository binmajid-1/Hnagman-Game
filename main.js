// select letter container
let letterContainer = document.querySelector(".letters");

// create letters
let letters = "abcdefghijklmnopqrstuvwxyz";

// Array from letters
let lettersArray = Array.from(letters);

lettersArray.forEach((letter) => {
  // create span
  let span = document.createElement("span");

  // create text node and append letter to it
  let text = document.createTextNode(letter.toUpperCase());

  span.className = "letter-box";

  //append text node to span
  span.append(text);

  //Append span to letter container
  letterContainer.appendChild(span);
});

// object of categories

let words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// get random property

let allKeys = Object.keys(words);

// get random index deppend of keys
let randomKeyIndex = Math.floor(Math.random() * allKeys.length);

// get random property name
let randomPropName = allKeys[randomKeyIndex];

// get array of prop name
let randomArrayValues = words[randomPropName];

// get random index of array
let randomValueIndex = Math.floor(Math.random() * randomArrayValues.length);

// get random word from array
let randomWord = randomArrayValues[randomValueIndex];

// set Category
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// get array form chosen word
let arrayFromWord = Array.from(randomWord);

// get result letter container
let resultLetter = document.querySelector(".result-letters");

arrayFromWord.forEach((letter) => {
  // create span
  let span = document.createElement("span");

  // add class to empty letter or space
  if (letter === " ") {
    span.className = "has-space";
  }

  // append span to letters container
  resultLetter.append(span);
});

let guessSpans = document.querySelectorAll(".result-letters span");

// the draw
let theDraw = document.querySelector(".hangman-draw");

// wrong tries
let wrongTries = 0;
let finish = 0;

document.addEventListener("click", (ev) => {
  let theStatus = false;

  if (ev.target.className === "letter-box") {
    // add clicked class to clicked span
    ev.target.classList.add("clicked");

    // get value of clicked letter
    let theClickedLetter = ev.target.innerHTML.toLowerCase();

    // chosen word
    let theChosenWord = Array.from(randomWord.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // check if clicked letter is in the word
      if (theClickedLetter == wordLetter) {
        theStatus = true;
        finish++;

        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex == spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    if (theStatus === false) {
      // increase wrong tries
      wrongTries++;

      // add class num of wrong tries to draw
      theDraw.classList.add(`wrong-${wrongTries}`);

      // play fail sound
      document.getElementById("fail").play();

      if (wrongTries === 8) {
        endGame();

        letterContainer.classList.add("finished");
      }
    } else {
      // play success sound
      document.getElementById("success").play();

      if (finish === theChosenWord.length) {
        // create popup div
        let div = document.createElement("div");

        // create text popup
        let myText = document.createTextNode(
          `Congratulations, You Got It In: ${wrongTries + 1} Tries`
        );

        div.append(myText);

        div.className = "popup";

        document.body.appendChild(div);
        letterContainer.classList.add("finished");
      }
    }
  }
});

// end game function
function endGame() {
  // create popup div
  let div = document.createElement("div");

  // create text popup
  let myText = document.createTextNode(`Game Over, The Word Is: ${randomWord}`);

  div.append(myText);

  div.className = "popup";

  document.body.appendChild(div);
}
