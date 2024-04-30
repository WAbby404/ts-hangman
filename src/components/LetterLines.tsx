type LetterLinesProps = {
    correctLetters: string[]
}

function LetterLines({correctLetters}: LetterLinesProps) {
    return (
        <div className="letterlines-parent">
            {correctLetters.map((correctLetter, index) => {
                return(
                    <div key={index} className="letterlines-box">
                        <div>{correctLetter}</div>
                        <div className="letter-line"></div>
                    </div>
                )
            })}
        </div>
    );
}

export default LetterLines;