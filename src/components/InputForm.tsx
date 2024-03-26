import { useState } from 'react';

type InputFormProps = {
    checkLetter: (input: string) => void
    // submit form call parent
}

function InputForm({checkLetter}: InputFormProps) {
    const [ inputValue, setInputValue ] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // get most recently typed character, so we only type one letter at a time
        const input = e.target.value;
        const getMostRecentlyTypedLetter = input.charAt(input.length -1);
        setInputValue(getMostRecentlyTypedLetter);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkLetter(inputValue);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValue}/>
                <button className="button" type="submit">Enter</button>
            </form>
        </div>
    );
}

export default InputForm;