import {useState} from 'react';

  let listOfTasks = ["Прогулка", "Чтение книги", "Отдых"];

  export default function ToDoInput() {
    const [ToDos, setToDos] = useState(listOfTasks.map((str, i) =>({ str, id: i, checked: false }))),
      [text, setText] = useState("");
    
      function addTodo() {
      setToDos([...ToDos, { str: text, id: Date.now(), checked: false }]);
      setText("");
    }
  
    function delItembyID(id) {
      setToDos((old) => {
        const index = old.findIndex((item) => id === item.id);
        old.splice(index, 1);
        return [...old];
      });
    }
  
    function toggleCheckById(id) {
      setToDos((old) => {
        const index = old.findIndex((item) => id === item.id);
        old[index].checked = !old[index].checked;
        return [...old];
      });
    }
  
    function deleteButton() {
      setToDos((old) => old.filter((item) => !item.checked));
    }
  
    function up(id) {
      setToDos((old) => {
        const index = old.findIndex((item) => id === item.id);
        if (index === 0) {
          return old;
        } else {
          const item = old[index];
          old.splice(index, 1);
          old.splice(index - 1, 0, item);
          return [...old];
        }
      });
    }
  
    function down(id) {
      setToDos((old) => {
        const index = old.findIndex((item) => id === item.id);
        if (index === old.length - 1) {
          return old;
        } else {
          const item = old[index];
          old.splice(index, 1);
          old.splice(index + 1, 0, item);
          return [...old];
        }
      });
    }
  
    return (
      <>
        <div>
          <h4>Список дел</h4>
          <input
            type="text"
            value={text}
            onInput={(evt) => setText(evt.target.value)}
          />
          <button onClick={addTodo}>Добавить</button>
          <button onClick={deleteButton}>Удалить</button>
          <ol
            onClick={(evt) => {
              const greenx = evt.target.closest(".cross");
              if (greenx?.dataset?.id) delItembyID(+greenx.dataset.id);
              const checkbox = evt.target.closest("input[type=checkbox]");
              if (checkbox?.dataset?.id) toggleCheckById(+checkbox?.dataset?.id);
            }}
          >
            {ToDos.map((el) => (
              <li>
                <label className="label">
                  <input type="checkbox" checked={el.checked} data-id={el.id} />
                  {el.str}
                  <span className="checkmark">{el.text}</span>
                </label>
  
                <span data-id={el.id} className="cross">
                  &#10007;
                </span>
                <span className="arrow" onClick={() => up(el.id)}>
                  {" "}
                  &#8657;{" "}
                </span>
                <span className="arrow" onClick={() => down(el.id)}>
                  {" "}
                  &#8659;{" "}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </>
    );
  }