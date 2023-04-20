function DeleteMarked({ setToDos }) {

    function deleteButton() {
        setToDos(old => old.filter((item) => !item.checked));
    }

    return <button onClick={deleteButton}>Удалить отмеченные</button>
}

export default DeleteMarked;