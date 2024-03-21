type ManProps = {
    wrongLetters: string[]
}

function Man({wrongLetters}: ManProps) {

    const humanParts = ['head', 'arm', 'arm2', 'torso', 'leg', 'leg2'];

    return (
        <div>
            {wrongLetters.map((letter, index) => {
                return(
                    <div className={humanParts[index]} key={index}></div>
                )
            })}
        </div>
    );
}

export default Man;