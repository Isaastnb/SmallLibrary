import { useState, useEffect } from "react"
import api from "./services/api"

function App() {
  const [books, setBooks] = useState([]);
  async function fetchBooks(){
    const response = await api.get('/book');
    setBooks(response.data)
  }
  
  
  
  return (
    <div>
      <h1>Small Library</h1>
    </div>
  )
}

export default App
