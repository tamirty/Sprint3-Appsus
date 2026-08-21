export function NoteTodos({ note }) {

    return (
        <div className="noteTodos">
            <h3>{note.info.title}</h3>

            {note.info.todos.map(todo => (
                <div  key={todo.txt}>
                   
                    {todo.txt}
                </div>
            ))}
        </div>
    )
}