import { NoteTxt } from './NoteTxt.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteImg } from './NoteImg.jsx'


export function NotePreview({ note }) {

    if (note.type === 'NoteTxt') {
        return <NoteTxt />
    }
        else if (note.type === 'NoteImg') {
        return <NoteImg />
        }
          else if (note.type === 'NoteTodos') {
        return <NoteTodos />

    }

    return <article className="notePreview">{note.type}</article>

}


