const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NoteList } from '../cmps/NoteList.jsx'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteTxt } from '../cmps/NoteTxt.jsx'
import { noteService } from '../services/note.service.js'


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [noteTxt, setNoteTxt] = useState('')
    const [editingNoteId, setEditingNoteId] = useState(null)
    const [filterBy, setFilterBy] = useState('')

    console.log('notes:', notes)

    useEffect(() => {
        noteService.query().then(setNotes)
    }, [])



    function onAddNote() {

    if (editingNoteId) {
      
        return
    }

    const newNote = {
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#fff'
        },
        info: {
            txt: noteTxt
        }
    }

    noteService.save(newNote)
        .then(savedNote => {
            setNotes(prevNotes => [...prevNotes, savedNote])
            setNoteTxt('')
        })
}

const filteredNotes = notes.filter(note => {
    const searchTxt = filterBy.toLowerCase()

    if (note.type === 'NoteTxt') {
        const txt = note.info.txt || ''
        return txt.toLowerCase().includes(searchTxt)
    }

    if (note.type === 'NoteImg') {
        const title = note.info.title || ''
        return title.toLowerCase().includes(searchTxt)
    }

    if (note.type === 'NoteTodos') {
    const isFound = note.info.todos.some(todo =>
        todo.txt.toLowerCase().includes(searchTxt)
    )

    const title = note.info.title || ''

    return title.toLowerCase().includes(searchTxt) || isFound
     }
    if (note.type === 'NoteVideo') {
          const title = note.info.title || ''
        return title.toLowerCase().includes(searchTxt)
    }

    return true
})
return (
        <section className="container">

            <input
                type="text"
                placeholder="Search notes..."
                value={filterBy}
                onChange={(ev) => setFilterBy(ev.target.value)}
            />

            <NoteList
                notes={filteredNotes}
                onRemoveNote={onRemoveNote}
                onEditNote={onEditNote}
                onChangeColor={onChangeColor}
                onTogglePin={onTogglePin}
                onDuplicateNote={onDuplicateNote}
            />

            <input
                type="text"
                value={noteTxt}
                onChange={(ev) => setNoteTxt(ev.target.value)}
            />

            <button onClick={onAddNote}>
                {editingNoteId ? 'Save' : 'Add Note'}
            </button>

        </section>
    )


    function onRemoveNote(noteId) {
        console.log('noteId', noteId)

        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes =>
                    prevNotes.filter(note => note.id !== noteId)
                )
            })
    }


    function onEditNote(note) {
        setNoteTxt(note.info.txt)
        setEditingNoteId(note.id)
    }


    function onChangeColor(note) {
        const colors = ['#ff0', '#f88', '#8f8', '#88f']

        const color = colors[
            Math.floor(Math.random() * colors.length)
        ]

        note.style.backgroundColor = color

        noteService.save(note)
            .then(savedNote => {
                setNotes(prevNotes =>
                    prevNotes.map(currNote =>
                        currNote.id === savedNote.id
                            ? savedNote
                            : currNote
                    )
                )
            })
    }


    function onTogglePin(note) {
        console.log('Pin clicked:', note)

        note.isPinned = !note.isPinned

        noteService.save(note)
            .then(savedNote => {
                setNotes(prevNotes =>
                    prevNotes.map(currNote =>
                        currNote.id === savedNote.id
                            ? savedNote
                            : currNote
                    )
                )
            })
    }


    function onDuplicateNote(note) {
        const duplicatedNote = {
            ...note,
            id: null
        }

        noteService.save(duplicatedNote)
            .then(savedNote => {
                setNotes(prevNotes => [
                    ...prevNotes,
                    savedNote
                ])
            })
    }
     }
