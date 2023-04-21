import { useCallback, useState } from 'react';

function List({ toDos, setToDos }) {
    const delItembyIDCallback = useCallback(id => delItembyID(id), [toDos]),

        toggleCheckByIdCallback = useCallback(id => toggleCheckById(id), [toDos]),

        upCallback = useCallback(id => up(id), [toDos]),

        downCallback = useCallback(id => down(id), [toDos]),

        [draggedItem, setDraggedItem] = useState(null),

        handleDragStart = (evt, index) => {
            setDraggedItem(toDos[index]);
            evt.dataTransfer.effectAllowed = "move";
            evt.dataTransfer.setData("text/html", evt.target.parentNode);
        },

        handleDragOver = (index) => {
            const draggedOverItem = toDos[index];
            if (draggedItem === draggedOverItem) {
                return;
            }

            const toDosCopy = [...toDos];
            const indexDraggedItem = toDos.findIndex((item) => item.id === draggedItem.id);
            toDosCopy.splice(index, 0, toDosCopy.splice(indexDraggedItem, 1)[0]);
            setToDos(toDosCopy);
        },

        handleDragEnd = () => {
            setDraggedItem(null);
        };

    function delItembyID(id) {
        setToDos(old => {
            const index = old.findIndex((item) => id === item.id);
            old.splice(index, 1);
            return [...old];
        });
    }

    function toggleCheckById(id) {
        setToDos(old => {
            const index = old.findIndex((item) => id === item.id);
            old[index].checked = !old[index].checked;
            return [...old];
        });
    }

    function up(id) {
        setToDos(old => {
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
        setToDos(old => {
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

    return <ol>
        {toDos.map((el, index) => (
            <li
                data-id={el.id}
                key={el.id}

                draggable
                onDragStart={(evt) => handleDragStart(evt, index)}
                onDragOver={() => handleDragOver(index)}
                onDragEnd={handleDragEnd}
            >
                <label className="label">
                    <input type="checkbox" checked={el.checked} onChange={
                        (evt) => toggleCheckByIdCallback(+evt.target.closest("Li").dataset.id)
                    } />
                    {el.str}
                    <span className="checkmark">{el.text}</span>
                </label>
                <span className="cross" onClick={(evt) => delItembyIDCallback(+evt.target.closest("Li").dataset.id)}>
                    &#10007;
                </span>
                <span className="arrow up" onClick={() => upCallback(el.id)}>
                    {" "}
                    &#8657;{" "}
                </span>
                <span className="arrow down" onClick={() => downCallback(el.id)}>
                    {" "}
                    &#8659;{" "}
                </span>
            </li>
        ))}
    </ol>
}

export default List;