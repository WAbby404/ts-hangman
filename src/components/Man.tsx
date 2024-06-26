type ManProps = {
    wrongLetters: string[]
}

function Man({wrongLetters}: ManProps) {

    const humanParts = ['head', 'arm', 'arm2', 'torso', 'leg', 'leg2'];
    
    return (
        <div className="man-parts-box">
            {wrongLetters.map((letter, index) => {
                return(
                    <div className={humanParts[index]} key={index}></div>
                )
            })}
        </div>
    );
}

export default Man;