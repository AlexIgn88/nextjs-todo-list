export default function List({ toDos, newToDos }) {

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

    console.log('Рендер-ol');
    return (
        <ol
            onClick={evt => {
                const cross = evt.target.closest(".cross");
                if (cross?.closest("Li").dataset?.id) delItembyID(+cross.closest("Li").dataset.id);
                const checkbox = evt.target.closest("input[type=checkbox]");
                if (checkbox?.closest("Li").dataset?.id) toggleCheckById(+checkbox.closest("Li").dataset.id);
            }}
        >
            {toDos.map(el => (
                <li data-id={el.id} key={el.id}>
                    <label className="label">
                        <input type="checkbox" checked={el.checked}/>
                        {el.str}
                        <span className="checkmark">{el.text}</span>
                    </label>
                    <span className="cross">
                        &#10007;
                    </span>
                    <span className="arrow up" onClick={() => up(el.id)}>
                        {" "}
                        &#8657;{" "}
                    </span>
                    <span className="arrow down" onClick={() => down(el.id)}>
                        {" "}
                        &#8659;{" "}
                    </span>
                </li>
            ))}
        </ol>
    );
}