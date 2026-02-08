import { useNoteContent } from "../store/NotesContext"

const NoteData = () => {
  const {notes, handleDeleteNote} = useNoteContent();
  
  if(notes.length == 0){
    return <p className="empty-text">No notes yet</p>;
  }

  return (
        <div className="notes-container">
          {notes.map((note)=>
            <div key={note.id} className="note-card" style={{backgroundColor: note.noteColor}}>
                <h4 className="note-title">{note.title}</h4>
                <p className="note-text">{note.text}</p>
                <small className="note-date">{note.createdAt.toString()}</small>
                <br />
                <button type="button" className="btn btn-danger btn-sm mt-2" onClick={()=>handleDeleteNote(note.id)}>Delete</button>
            </div>
          )}
        </div>
  )
}

export default NoteData