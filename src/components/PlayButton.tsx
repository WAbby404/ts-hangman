type PlayButtonProps = {
    playHangman: () => void
}

export const PlayButton = (props: PlayButtonProps) => {
    return (
        <div>
            <button onClick={() => props.playHangman()}>Play Hangman!</button>
        </div>
    );
}