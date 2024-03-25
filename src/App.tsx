import { useState } from 'react';
import { PlayButton } from './components/PlayButton';
import InputForm from './components/InputForm';
import LetterLines from './components/LetterLines';
import Man from './components/Man';

// template literal example yay :)
type CurrentScreenType = 'start' | 'playing' | 'won' | 'lost';

function App() {
  const words: string[] = ['corn', 'corgi', 'coo', 'phone', 'book', 'nook'];
  const [ word, setWord ] = useState('');
  const [ wrongLetters, setWrongLetters ] = useState<string[]>([]);
  const [ correctLetters, setCorrectLetters ] = useState<string[]>([]);
  const [ currentScreen, setCurrentScreen ] = useState<CurrentScreenType>('start');

  const playHangman = () => {
    // pick a random word from the array of words
    const wordToSet = words[Math.floor(Math.random() * words.length)];
    setWord(wordToSet);
    setCorrectLetters(Array(wordToSet.length).fill(' '));
    setCurrentScreen('playing');
  }

  const checkLetter = (input: string) => {
    const inputArray = Array.from(word);

    // ! if 4 letters are wrong, and 5th letter entered is correct, we lose
    // ! FIX ME


    let lettersInPosition = correctLetters.slice();
    let updatedWrongLetters = wrongLetters.slice();

    // if current input letter is found in word(word state), do this
    if(inputArray.includes(input)){
      // when letter is found in word, place letters in corresponding spots in correctLetters

      inputArray.forEach((letter, index) => {
        if(input === letter){
          lettersInPosition[index] = input;
        }
      })
      setCorrectLetters(lettersInPosition);
      // need to loop over to add letters where blank spaces exsist
      console.log('letter found in word');
    // if current input letter is not found in word to guess, do this
    } else {
      // Dont add a repeat of a letter to list
      if(!updatedWrongLetters.includes(input)){
        updatedWrongLetters.push(input);
        setWrongLetters(updatedWrongLetters);
      }
      console.log('letter not found!')
    }

    console.log('correct letters with letters joined: ' + lettersInPosition.join(''));

    if(lettersInPosition.join('') === word){
      setCurrentScreen('won');
    }

    // ! if 4 letters are wrong, and 5th letter entered is correct, we lose
    // ! FIX ME
    console.log('wrong letter amount: ' + updatedWrongLetters.length);
    if(updatedWrongLetters.length === 6){
      setCurrentScreen('lost');
    }

    console.log('_________________________');
  }

  const resetGame = () => {
    setCurrentScreen('start');
    setWord('');
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
            <LetterLines word={word} correctLetters={correctLetters}/>
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
              <h3>You won! The word was {word}.</h3>
              <h4>Play again?</h4>
              {/* clear word, wrong letters, correctLetters IN THIS FN (so move it!) */}
              <button onClick={() => resetGame()}>Play</button>
            </div>
          )

      case('lost'):
          return (
            <div>
              <Man wrongLetters={wrongLetters}/>
              <h3>You lost! The word was {word}.</h3>
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
