// @ts-nocheck

type LetterLinesProps = {
    correctLetters: string[]
}

function LetterLines({correctLetters}: LetterLinesProps) {
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