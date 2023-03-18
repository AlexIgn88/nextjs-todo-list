import { useCallback } from 'react';

export default function List({ toDos, newToDos }) {
    const delItembyIDCallback = useCallback(id => delItembyID(id), [toDos]),
        toggleCheckByIdCallback = useCallback(id => toggleCheckById(id), [toDos]),
        upCallback = useCallback(id => up(id), [toDos]),
        downCallback = useCallback(id => down(id), [toDos]);

    function delItembyID(id) {
        newToDos(old => {
            const index = old.findIndex((item) => id === item.id);
            old.splice(index, 1);
            return [...old];
        });
    }

    function toggleCheckById(id) {
        newToDos(old => {
            const index = old.findIndex((item) => id === item.id);
            old[index].checked = !old[index].checked;
            return [...old];
        });
    }

    function up(id) {
        newToDos(old => {
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
        newToDos(old => {
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
        <ol>
            {toDos.map(el => (
                <li data-id={el.id} key={el.id}>
                    <label className="label">
                        <input type="checkbox" checked={el.checked} onClick={
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
    );
}