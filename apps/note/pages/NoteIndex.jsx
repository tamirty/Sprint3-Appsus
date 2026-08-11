const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { NoteList } from '../cmps/NoteList.jsx'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteTxt } from '../cmps/NoteTxt.jsx'
import { noteService } from '../services/note.service.js'




export function NoteIndex() {
    const [notes, setNotes] = useState([])
    console.log('notes:', notes)


    useEffect(() => {
        noteService.query().then(setNotes)
    }, [])


    return (
        <section className="container">
            <NoteList />
        </section>
    )
}
