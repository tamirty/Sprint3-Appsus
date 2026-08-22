export function NoteVideo({ note }) {
    return (
        <div className="noteVideo">

            <iframe
                src={note.info.url}
                title={note.info.title}
                allowFullScreen
            />

            <h3>{note.info.title}</h3>

        </div>
    )
}