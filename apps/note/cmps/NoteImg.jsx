

export function NoteImg({ note }) {
    return (
        <div className="noteImg">
            <img src={note.info.url} style={{ width: '300px' }} alt={note.info.title} />
            <h3>{note.info.title}</h3>
        </div>
    )
}