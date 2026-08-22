import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'notesDB'

export const noteService = {
  query,
  get,
  remove,
  save,

}

function query() {
    return storageService.query(NOTE_KEY)
}
 


const notes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        style: {
            backgroundColor: '#0d0'
        },
        info: {
            url: 'https://placedog.net/509',
            title: 'Bobi and Me'
        }
    },
    {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTodos',
        isPinned: false,
        style: {
            backgroundColor: '#d00'
        },
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', isDone: true },
                { txt: 'Coding power', isDone: false }
            ]
        }
    },
    {
        id: 'n104',
        createdAt: 1112225,
        type: 'NoteVideo',
        isPinned: false,
        style: {
            backgroundColor: '#ff0'
        },
        info: {
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            title: 'My Video'
        }
    }
]





  _createNote()



function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            note = _setNextPrevNoteId(note)
            return note
        })
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}



function _createNote() {
    let savedNotes = utilService.loadFromStorage(NOTE_KEY)

    if (savedNotes && savedNotes.length) return

    utilService.saveToStorage(NOTE_KEY, notes)
}
