import { useCallback } from 'react';

export default function Form({ text, newText, toDos, newToDos }) {
    const changeText = useCallback(value => newText(value), [toDos]),
        add = useCallback(() => addTodo(), [text]),
        del = useCallback(() => deleteButton(), [toDos]);

    function addTodo() {
        console.log('Рендер');

        newToDos([...toDos, { str: text, id: Date.now(), checked: false }]);
        newText("");
    }

    function deleteButton() {
        console.log('Рендер');

        newToDos(old => old.filter((item) => !item.checked));
    }


    return (
        <div>
            <h4>Список дел</h4>
            <input
                type="text"
                value={text}
                onInput={(evt) => changeText(evt.target.value)}
            />
            <button onClick={add}>Добавить</button>
            <button onClick={del}>Удалить</button>
        </div>
    );
}