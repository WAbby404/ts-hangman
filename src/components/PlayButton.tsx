import HangmanLogo from '../images/HangmanLogo.png';

type PlayButtonProps = {
    playHangman: () => void
}

export const PlayButton = (props: PlayButtonProps) => {
    return (
        <div className="play-box">
            <img src={HangmanLogo} alt="Hangman Logo - A question mark key"/>
            <button className="button" onClick={() => props.playHangman()}>Play Hangman</button>
        </div>
    );
}