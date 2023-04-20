import { useState } from 'react';
import Form from '../components/Form.js';
import List from '../components/List.js';

let listOfTasks = ['Прогулка', 'Чтение книги', 'Отдых'];

function ToDo() {
  const [text, setText] = useState(''),
    [toDos, setToDos] = useState(listOfTasks.map((str, i) => ({ str, id: i, checked: false })));

  return (
    <>
      <Form
        text={text}
        setText={setText}
        toDos={toDos}
        setToDos={setToDos}
      />
      <List
        toDos={toDos}
        newToDos={list => setToDos(list)}
      />
    </>
  );
}

export default ToDo;