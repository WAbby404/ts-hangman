// @ts-nocheck

type LetterLinesProps = {
    word: string
    correctLetters: string[]
}

function LetterLines({word, correctLetters}: LetterLinesProps) {
    return (
        <div className="letter-line-parent">
            {correctLetters.map((correctLetter, index) => {
                return(
                    <div key={index}>
                        <div>{correctLetter}</div>
                        <div className="letter-line"></div>
                    </div>
                )
            })}
        </div>
    );
}

export default LetterLines;