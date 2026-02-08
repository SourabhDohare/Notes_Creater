import { useState } from "react";
import { useNoteContent } from "../store/NotesContext";
const Create = () => {
  const [title, setTitle  ] = useState("");
  const [text, setText ] = useState("");
  const [noteColor, setNoteColor] = useState("#FFFFFF");

  const [error,setError] = useState("");

  const {handleAddNoteContent} = useNoteContent();

  const handleTitle =(e:React.ChangeEvent<HTMLInputElement>)=>{
    setTitle(e.target.value);
  }

  const handleText =(e:React.ChangeEvent<HTMLInputElement>)=>{
    setText(e.target.value);
  }

  const handleNoteColor =(e:React.ChangeEvent<HTMLInputElement>)=>{
    setNoteColor(e.target.value);
  }

  const handleFormSubmit = (e:React.SyntheticEvent<HTMLFormElement>) =>{
    e.preventDefault();

    // if any one of them is false then it becomes true
    // means if any of them is empty then make error true
    // thus error shows on UI
    if(!title.trim() || !text.trim()){
      setError( "All fields are mandatory");
      return ;
    }

    setError("");

    handleAddNoteContent(title,text,noteColor);
    setTitle("");
    setText("");
    setNoteColor("#FFFFFF");
  }

  return (

    <form onSubmit={handleFormSubmit} className="note-form">

      
      {
        // by default error is false
        error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
        )
      }


      <div className="mb-3">
        <label htmlFor="InputTitle" className="form-label">Title</label>
        <input type="text" value={title} onChange={handleTitle} placeholder="Enter title for note" className="form-control" id="InputTitle" aria-describedby="titleHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="InputText" className="form-label">Text</label>
        <input type="text" value={text} onChange={handleText} className="form-control" id="InputText"/>
      </div>
      <div className="mb-3 form-check">
        <label htmlFor="InputNoteColor" className="form-label">Notes Color</label>
        <input type="color" value={noteColor} onChange={handleNoteColor} className="form-check-input" id="InputNoteColor"/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Create