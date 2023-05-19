import { useState } from 'react';
import Form from '../components/Form.js';
import List from '../components/List.js';

let listOfTasks = ['Учеба', 'Прогулка', 'Чтение книги', 'Отдых', 'Здоровый сон'];

function ToDo() {
    const [text, setText] = useState(''),
        [toDos, setToDos] = useState(listOfTasks.map((str, i) => ({ str, id: i, checked: false })));

    return (
        <div className='todo'>
            <Form
                text={text}
                setText={setText}
                toDos={toDos}
                setToDos={setToDos}
            />
            <List
                toDos={toDos}
                setToDos={setToDos}
            />
        </div>
    );
}

export default ToDo;