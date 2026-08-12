const { Link } = ReactRouterDOM
import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook }) {
    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} />
                    <Link to={`/book/${book.id}`}><button>Details</button></Link>
                    <button onClick={() => onRemoveBook(book.id)}>X</button>

                </li>
            ))}
        </ul>
    )
}