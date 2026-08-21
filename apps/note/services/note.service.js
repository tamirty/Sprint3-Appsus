import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'notesDB'

export const noteService = {
  query,
  get,
  remove,
  save,
  // getEmptyNote,
  // getDefaultFilter,
  // getSpeedStats,
  // getVendorStats,
  // getFilterFromSearchParams,
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

// function query(filterBy = {}) {
//     return storageService.query(NOTE_KEY)
//         .then(notes => {
//             if (filterBy.txt) {
//                 const regExp = new RegExp(filterBy.txt, 'i')
//                 notes = notes.filter(note => regExp.test(note.vendor))
//             }

//             if (filterBy.minSpeed) {
//                 notes = notes.filter(note => note.maxSpeed >= filterBy.minSpeed)
//             }

//             return notes
//         })
// }

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

// function getEmptyNote(vendor = '', maxSpeed = '') {
//     return { vendor, maxSpeed }
// }

// function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
//     return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
// }

// function getFilterFromSearchParams(searchParams) {
//     const defaultFilter = getDefaultFilter()
//     const filterBy = {}

//     for (const field in defaultFilter) {
//         filterBy[field] = searchParams.get(field) || ''
//     }
//     return filterBy
// }

// function getSpeedStats() {
//     return storageService.query(NOTE_KEY)
//         .then(notes => {
//             const noteCountBySpeedMap = _getNoteCountBySpeedMap(notes)
//             const data = Object.keys(noteCountBySpeedMap).map(speedName => ({ title: speedName, value: noteCountBySpeedMap[speedName] }))
//             return data
//         })
// }

// function getVendorStats() {
//     return storageService.query(NOTE_KEY)
//         .then(notes => {
//             const noteCountByVendorMap = _getNoteCountByVendorMap(notes)
//             const data = Object.keys(noteCountByVendorMap)
//                 .map(vendor =>
//                 ({
//                     title: vendor,
//                     value: Math.round((noteCountByVendorMap[vendor] / notes.length) * 100)
//                 }))
//             return data
//         })
// }

function _createNote() {
    let savedNotes = utilService.loadFromStorage(NOTE_KEY)

    if (savedNotes && savedNotes.length) return

    utilService.saveToStorage(NOTE_KEY, notes)
}
// function _createNote(vendor, maxSpeed = 250) {
//     const note = getEmptyNote(vendor, maxSpeed)
//     note.id = utilService.makeId()
//     return note
// }

// function _setNextPrevNoteId(note) {
//     return storageService.query(NOTE_KEY).then((notes) => {
//         const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
//         const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
//         const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
//         note.nextNoteId = nextNote.id
//         note.prevNoteId = prevNote.id
//         return note
//     })
// }

// function _getNoteCountBySpeedMap(notes) {
//     const noteCountBySpeedMap = notes.reduce((map, notes) => {
//         if (notes.maxSpeed < 120) map.slow++
//         else if (notes.maxSpeed < 200) map.normal++
//         else map.fast++
//         return map
//     }, { slow: 0, normal: 0, fast: 0 })
//     return noteCountBySpeedMap
// }

// function _getNoteCountByVendorMap(notes) {
//     const noteCountByVendorMap = notes.reduce((map, note) => {
//         if (!map[note.vendor]) map[note.vendor] = 0
//         map[note.vendor]++
//         return map
//     }, {})
//     return noteCountByVendorMap
// }