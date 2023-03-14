export default function Form({ text, newText, toDos, newToDos }) {

    function addTodo() {
        newToDos([...toDos, { str: text, id: Date.now(), checked: false }]);
        newText("");
    }

    function deleteButton() {
        newToDos(old => old.filter((item) => !item.checked));
    }

    console.log('Рендер-Form');
    return (
        <div>
            <h4>Список дел</h4>
            <input
                type="text"
                value={text}
                onInput={(evt) => newText(evt.target.value)}
            />
            <button onClick={addTodo}>Добавить</button>
            <button onClick={deleteButton}>Удалить</button>
        </div>
    );
}