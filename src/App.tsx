import { useState } from 'react';
import { PlayButton } from './components/PlayButton';
import InputForm from './components/InputForm';
import LetterLines from './components/LetterLines';
import Man from './components/Man';

// template literal example yay :)
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
    // make copies of exsisting 
    let updatedCorrectLetters = correctLetters.slice();
    let updatedWrongLetters = wrongLetters.slice();

    // if current input letter is found in wordToGuess
    if(inputArray.includes(input)){

      // when letter is found in wordToGuess, place letters in corresponding spots in correctLetters
      inputArray.forEach((letter, index) => {
        if(input === letter){
          updatedCorrectLetters[index] = input;
        }
      })
      setCorrectLetters(updatedCorrectLetters);
      // need to loop over to add letters where blank spaces exsist
      console.log('letter found in wordToGuess');
    // if current input letter is not found in wordToGuess to guess, do this
    } else {
      // Dont add a repeat of a letter to list
      if(!updatedWrongLetters.includes(input)){
        updatedWrongLetters.push(input);
        setWrongLetters(updatedWrongLetters);
      }
      console.log('letter not found!')
    }

    console.log('correct letters with letters joined: ' + updatedCorrectLetters.join(''));

    if(updatedCorrectLetters.join('') === wordToGuess){
      setCurrentScreen('won');
    }

    console.log('wrong letter amount: ' + updatedWrongLetters.length);
    if(updatedWrongLetters.length === 6){
      setCurrentScreen('lost');
    }

    console.log('_________________________');
  }

  const resetGame = () => {
    setCurrentScreen('start');
    setWordToGuess('');
    setCorrectLetters([]);
    setWrongLetters([]);
  }


  // make these pages their own file?
  const renderSwitch = () => {
    switch(currentScreen) {
      case ('playing'):
        return (
          <div>
            <Man wrongLetters={wrongLetters}/>
            <LetterLines correctLetters={correctLetters}/>
            <InputForm checkLetter={checkLetter}/>
            {wrongLetters.map((letter,index) => {
              return (
                <div key={index}>{letter}</div>
              )
            })}
          </div>
        )

      case('won'):
          return (
            <div>
              <Man wrongLetters={wrongLetters}/>
              <h3>You won! The word was {wordToGuess}.</h3>
              <h4>Play again?</h4>
              <button onClick={() => resetGame()}>Play</button>
            </div>
          )

      case('lost'):
          return (
            <div>
              <Man wrongLetters={wrongLetters}/>
              <h3>You lost! The word was {wordToGuess}.</h3>
              <h4>Play again?</h4>
              <button onClick={() => resetGame()}>Play</button>
            </div>
          )

      default:
        return <PlayButton playHangman={playHangman}/>;
    }
  };

  return (
    <div>
      {renderSwitch()}
    </div>
  );
}

export default App;
