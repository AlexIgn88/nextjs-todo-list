import { useCallback } from 'react';

export default function List({ toDos, newToDos }) {
    const delItembyIDCallback = useCallback(id => delItembyID(id), [toDos]),
    toggleCheckByIdCallback = useCallback(id => toggleCheckById(id), [toDos]),
    upCallback = useCallback(id => up(id), [toDos]),
    downCallback = useCallback(id => down(id), [toDos]);

    function delItembyID(id) {
        console.log('Рендер');

        newToDos(old => {
            const index = old.findIndex((item) => id === item.id);
            old.splice(index, 1);
            return [...old];
        });
    }

    function toggleCheckById(id) {
        console.log('Рендер');

        newToDos(old => {
            const index = old.findIndex((item) => id === item.id);
            old[index].checked = !old[index].checked;
            return [...old];
        });
    }

    function up(id) {
        console.log('Рендер');

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
        console.log('Рендер');

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
        <ol
            onClick={evt => {
                const cross = evt.target.closest(".cross");
                if (cross?.closest("Li").dataset?.id) delItembyIDCallback(+cross.closest("Li").dataset.id);
                const checkbox = evt.target.closest("input[type=checkbox]");
                if (checkbox?.closest("Li").dataset?.id) toggleCheckByIdCallback(+checkbox.closest("Li").dataset.id);
            }}
        >
            {toDos.map(el => (
                <li data-id={el.id} key={el.id}>
                    <label className="label">
                        <input type="checkbox" checked={el.checked} />
                        {el.str}
                        <span className="checkmark">{el.text}</span>
                    </label>
                    <span className="cross">
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