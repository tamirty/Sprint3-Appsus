import { NoteTxt } from './NoteTxt.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import ''

export function NotePreview({ note, onRemoveNote, onEditNote, onChangeColor, onTogglePin, onDuplicateNote }) {
    let noteCmp

    if (note.type === 'NoteTxt') {
        noteCmp = <NoteTxt note={note} />

    } else if (note.type === 'NoteImg') {
        noteCmp = <NoteImg note={note} />

    } else if (note.type === 'NoteTodos') {
        noteCmp = <NoteTodos note={note} />

    } else if (note.type === 'NoteVideo') {
        noteCmp = <NoteVideo note={note} />
    }

    return (
        <article
           
            style={{ backgroundColor: note.style.backgroundColor }}
        >
            {noteCmp}
           <div className="notePreview">

    <button onClick={() => onTogglePin(note)}>
        📌
    </button>

    <button onClick={() => onChangeColor(note)}>
        🎨
    </button>

    <button onClick={() => onEditNote(note)}>
        ✏️
    </button>

    <button onClick={() => onDuplicateNote(note)}>
        📄
    </button>

    <button onClick={() => onRemoveNote(note.id)}>
        🗑️
    </button>

</div>



        </article>

    )
}


