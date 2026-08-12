const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

export function BookIndex() {

    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        return bookService.query(filterBy)
            .then(books => setBooks(books))
    }

    function onRemoveBook(bookId) {
        return bookService.remove(bookId)
            .then(() => setBooks(prev =>
                prev.filter(book => book.id != bookId)))
    }

    function onSetSelectedBook(book) {
        setSelectedBook(book)
    }

    console.log(books);

    return <section className="book-index">
        <BookFilter
            filterBy={filterBy}
            setFilterBy={setFilterBy} />

        <BookList
            books={books}
            onSetSelectedBook={onSetSelectedBook}
            onRemoveBook={onRemoveBook} />

    </section>
}