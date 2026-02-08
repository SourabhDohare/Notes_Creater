import NoteData from "./components/NoteData"
import Create from "./components/Create"
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/notes.css";

const App = () => {
  return (
    <main>
      <h1>Notes</h1>
      <NoteData></NoteData>
      <h1 >Create Note</h1>
      <Create></Create>
    </main>
  )
}

export default App