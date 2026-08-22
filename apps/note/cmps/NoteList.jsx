import { NotePreview } from './NotePreview.jsx'


export function NoteList({ notes, onRemoveNote, onEditNote ,onChangeColor ,onTogglePin,onDuplicateNote}) {
 const sortedNotes = [...notes].sort(
        (note1, note2) => note2.isPinned - note1.isPinned
    )
  return (
    <section className="noteList">


      {sortedNotes.map(note => (

        <NotePreview
        note={note}
        key={note.id}
        onRemoveNote={onRemoveNote}
        onEditNote={onEditNote}
        onChangeColor={onChangeColor}
        onTogglePin={onTogglePin}
        onDuplicateNote={onDuplicateNote}
        
        />
        
        

      ))}
      


    </section>

)
}

