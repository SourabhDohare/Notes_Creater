import { createContext, useContext, useState, type ReactNode } from "react";

export type Note = {
  id: string;
  title: string;
  text: string;
  noteColor: string;
  createdAt: Date;
  Deleted: boolean; 
}

export type notesContext={
  notes: Note[];
  handleDeleteNote:(id:string)=>void;
  handleAddNoteContent:(title:string,text:string,noteColor:string)=>void;
}

export const NotesContext = createContext<notesContext|null>(null);

export type NotesProviderProps={
  children: ReactNode;
}

export const NotesProvider =({children}:NotesProviderProps)=>{
  const [notes, setNotes] = useState<Note[]>(()=>{
    try {
      // string to JSON
      const newNotes = localStorage.getItem("notes") || "[]";
      return JSON.parse(newNotes) as Note[];
    } catch (error) {
      return [];
    }
  });

  const handleAddNoteContent=(title:string,text:string,noteColor:string)=>{
    setNotes((prev)=>{
      const newNotes: Note[]= [
        {
          id: Math.random().toString(),
          title: title,
          text: text,
          noteColor: noteColor,
          createdAt: new Date(),
          Deleted: false, 
        },
        ...prev
      ]
      console.log("This is ",newNotes);
      // JSON TO STRING
      localStorage.setItem("notes",JSON.stringify(newNotes));
      return newNotes;
    })
  }

  const handleDeleteNote=(id:string)=>{
    setNotes((prev)=>{
      let newNotes = prev.filter((filterNote)=>filterNote.id!=id);
      // JSON TO STRING
      localStorage.setItem("notes",JSON.stringify(newNotes));
      return newNotes;
    })
  }  

  return(
    <NotesContext.Provider value={{notes,handleDeleteNote,handleAddNoteContent}}>
      {children}
    </NotesContext.Provider>
  )
}

export const useNoteContent=()=>{
  const notesConsumer = useContext(NotesContext);
  if(!notesConsumer){
    throw new Error("useNotes outside of provider");
  }
  return notesConsumer;
}