import { useState } from 'react';
import { PlayButton } from './components/PlayButton';
import InputForm from './components/InputForm';
import LetterLines from './components/LetterLines';
import Man from './components/Man';

type CurrentScreenType = 'start' | 'playing' | 'won' | 'lost';

function App() {
  const words: string[] = ['corn', 'corgi', 'coo', 'phone', 'book', 'nook'];
  const [ wordToGuess, setWordToGuess ] = useState('');
  const [ wrongLetters, setWrongLetters ] = useState<string[]>([]);
  const [ correctLetters, setCorrectLetters ] = useState<string[]>([]);
  const [ currentScreen, setCurrentScreen ] = useState<CurrentScreenType>('start');

  // runs on 'Play hangman' start, sets states to start playing
  const playHangman = () => {
    // pick a random word from the array of words
    const wordToSet = words[Math.floor(Math.random() * words.length)];
    setWordToGuess(wordToSet);
    setCorrectLetters(Array(wordToSet.length).fill(' '));
    setCurrentScreen('playing');
  }

  // runs when a letter is entered
  const checkLetter = (input: string) => {
    // make wordToGeuss into an array, each letter at the next index
    const inputArray = Array.from(wordToGuess);

    // make copies of exsisting correct and wrong letters
    let updatedCorrectLetters = correctLetters.slice();
    let updatedWrongLetters = wrongLetters.slice();

    // if current input letter is found in wordToGuess...
    if(inputArray.includes(input)){
      // place letter in corresponding spot in correctLetters
      inputArray.forEach((letter, index) => {
        if(input === letter){
          updatedCorrectLetters[index] = input;
        }
      })
      // and update the state with an updated correct letters array
      setCorrectLetters(updatedCorrectLetters);

      console.log('letter found in wordToGuess');
    } else {
      // add current letter to wrong letter array, but dont include duplicates, empty strings, uppercase, or spaces
      if((!updatedWrongLetters.includes(input)) && (input !== '') && (!updatedWrongLetters.includes(input.toLowerCase())) && (input !== ' ')){
        updatedWrongLetters.push(input);
        setWrongLetters(updatedWrongLetters);
      }
      console.log('letter not found!');
    }

    console.log('correct letters with letters joined: ' + updatedCorrectLetters.join(''));
    console.log('wrong letter amount: ' + updatedWrongLetters.length);

    // Win condition: if all letters in correct letter array combined equals to the wordToGuess
    if(updatedCorrectLetters.join('') === wordToGuess){
      setCurrentScreen('won');
    }

    // Lose condition: if wrong letters are guessed 6 times (if wrong letters array has a length of 6)
    if(updatedWrongLetters.length === 6){
      setCurrentScreen('lost');
    }
  }

  // resets states, or game envionment to play again
  const resetGame = () => {
    setCurrentScreen('start');
    setWordToGuess('');
    setCorrectLetters([]);
    setWrongLetters([]);
  }

  // Renders different screens based on current screen state
  const renderSwitch = () => {
    switch(currentScreen) {
      case ('playing'):
        return (
          <div className="playing-box">
            <Man wrongLetters={wrongLetters}/>
            <div className="letter-playing-box">
              <LetterLines correctLetters={correctLetters}/>
              <InputForm checkLetter={checkLetter}/>
              <div className="wrong-letters-box">
                {wrongLetters.map((letter,index) => {
                  return (
                    <div className="wrong-letter" key={index}>{letter}{(index !== wrongLetters.length -1) && ', '}</div>
                  )
                })}
              </div>
            </div>
          </div>
        )

      case('won'):
          return (
            <div className="playing-box">
              <Man wrongLetters={wrongLetters}/>
              <h3 className="words-center">You won! The word was {wordToGuess}.</h3>
              <h4 className="words-center">Play again?</h4>
              <button className="button" onClick={() => resetGame()}>Play</button>
            </div>
          )

      case('lost'):
          return (
            <div className="playing-box">
              <Man wrongLetters={wrongLetters}/>
              <h3 className="words-center">You lost! The word was {wordToGuess}.</h3>
              <h4 className="words-center">Play again?</h4>
              <button className="button" onClick={() => resetGame()}>Play</button>
            </div>
          )

      default:
        return <PlayButton playHangman={playHangman}/>;
    }
  };

  return (
    <div className="app">
      {renderSwitch()}
    </div>
  );
}

export default App;
