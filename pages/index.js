import { useState } from 'react';
import Form from "../components/Form.js";
import List from "../components/List.js";

let listOfTasks = ["Прогулка", "Чтение книги", "Отдых"];

export default function ToDo() {
  const [text, setText] = useState(""),
    [toDos, setToDos] = useState(listOfTasks.map((str, i) => ({ str, id: i, checked: false })));

  return (
    <>
      <Form text={text} newText={text => setText(text)} toDos={toDos} newToDos={list => setToDos(list)} />
      <List toDos={toDos} newToDos={list => setToDos(list)} />
    </>
  );
}