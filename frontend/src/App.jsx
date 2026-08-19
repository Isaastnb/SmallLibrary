import { useState, useEffect } from "react"
import api from "./services/api"

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  async function fetchBooks(){
    const response = await api.get('/book');
    setBooks(response.data)
  }

  useEffect(() => {
    fetchBooks();
  }, []);
  
  async function handleAddBook(e) {
    e.preventDefault();
    await api.post('/book', {title, author});

    setTitle('');
    setAuthor('');
    fetchBooks();

  }

  async function handleDeleteBook(id) {
    await api.delete(`/book/${id}`);
    fetchBooks();
    
  }

  async function handleToggleStatus(book) {
    if (book.status === 'available') {
      const borrowerName = prompt("Quem está pegando o livro?");
      if(!borrowerName) return;

      await api.put(`/book/${book._id}/lend`, { borrowerName });
    } else {
      await api.put(`/book/${book._id}/return`);
    }
    fetchBooks();
  }
  
  
  return (
    <div>
      <h1>Small Library</h1>
      <form onSubmit={handleAddBook}>
            <input 
            type="text"
            placeholder="Título do livro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            /> {" "}
            <input 
            type="text" 
            placeholder="Autor do livro"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            />
            {" "}
            <button type="submit">Cadastrar Livro</button>

          </form>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> - {book.author} -- {book.status} {" "} <button onClick={() => handleDeleteBook(book._id)}>
              Deletar 
            </button> {" "} <button onClick={() => handleToggleStatus(book)}>
              {book.status === 'available' ? 'Emprestar' : 'Devolver'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
