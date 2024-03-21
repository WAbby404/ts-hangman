import { useState } from 'react';
import { PlayButton } from './components/PlayButton';
import InputForm from './components/InputForm';
import LetterLines from './components/LetterLines';
import Man from './components/Man';

function App() {
  const words: string[] = ['corn', 'corgi', 'coo', 'phone', 'book', 'nook']
  const [ gameFinished, setGameFinished ] = useState(false);
  const [ word, setWord ] = useState('');
  const [ wrongLetters, setWrongLetters ] = useState<string[]>([]);
  const [ correctLetters, setCorrectLetters ] = useState<string[]>([]);

  const playHangman = () => {
    // pick a random word from the array of words
    const wordToSet = words[Math.floor(Math.random() * words.length)];
    setWord(wordToSet);
    // console.log(wordToSet);
    setCorrectLetters(Array(wordToSet.length).fill(' '));
  }

  const checkLetter = (input: string) => {
    const inputArray = Array.from(word);

    // if letter is found, do this
      // add letter to correct spot, need a win condition: if all spots are not empty?
    if(inputArray.includes(input)){
      console.log(correctLetters);
      console.log('letter found in word');
      // when letter is found in word, place letters in corresponding spots in correctLetters
      let lettersInPosition = correctLetters.slice();
      inputArray.forEach((letter, index) => {
        if(input === letter){
          lettersInPosition[index] = input;
        }
      })
      setCorrectLetters(lettersInPosition);
      // need to loop over to add letters where blank spaces exsist
      console.log(lettersInPosition);
    // if letter is wrong, do this
    } else {
      const oldWrongLetters = wrongLetters.slice();
      // Dont add a repeat of a letter to list
      if(!oldWrongLetters.includes(input)){
        oldWrongLetters.push(input);
        setWrongLetters(oldWrongLetters);
      }
      console.log('letter not found!')
    }


    // win condition needs to be here!
    // if each index of correct letters has a letter in it, game won
    // display win message, grey out input box, display play again button

  }

  // const renderSwitch(word: string, gameFinished: boolean) => {
  //   switch(word, gameFinished) {
  //     case (word && !gameFinished):
  //       return (
  //         <div>
  //           <Man wrongLetters={wrongLetters}/>
  //           <LetterLines word={word} correctLetters={correctLetters}/>
  //           <InputForm checkLetter={checkLetter}/>
  //         </div>
  //       )
  //     default:
  //       return <PlayButton playHangman={playHangman}/>;
  //   }
  // };


  return (
    <div>
    {word ? 
      <div>
        <Man wrongLetters={wrongLetters}/>
        <LetterLines word={word} correctLetters={correctLetters}/>
        <InputForm checkLetter={checkLetter}/>
      </div>

      :
      <PlayButton playHangman={playHangman}/>
    }
    {wrongLetters.map((letter,index) => {
      return (
        <div key={index}>{letter}</div>
      )
    })}
    </div>
  );
}

export default App;
