import { useCallback } from 'react';
import DeleteMarked from '../components/DeleteMarked';

function Form({ text, setText, toDos, setToDos }) {
    const changeText = useCallback(value => setText(value), [toDos]),
        add = useCallback(() => addTask(), [text]);

    function addTask() {
        setToDos([...toDos, { str: text, id: Date.now(), checked: false }]);
        setText("");
    }

    return <div className='form'>
        <h4>Список дел</h4>
        <input
            type="text"
            value={text}
            onInput={(evt) => changeText(evt.target.value)}
        />
        <button onClick={add}>Добавить</button>
        <DeleteMarked setToDos={setToDos} />
    </div>
}

export default Form;