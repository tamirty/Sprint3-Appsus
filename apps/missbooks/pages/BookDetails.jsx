import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams } = ReactRouter
const { Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState()

    const { id: bookId } = useParams()
    console.log(bookId);
    

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.log(err))
    }, [bookId])

    function difficulty() {
        if (book.pageCount < 100) return 'Light Reading'
        else if (book.pageCount >= 500) return 'Serios Reading'
        else return 'Descent Reading'
    }

    function priceClass() {
        const { amount } = book.listPrice
        if (amount > 400) return 'expensive'
        if (amount < 250) return 'cheap'
        return ''
    }

    if (!book) return

    return <section className="book-details">
        <h2>{book.title.charAt(0).toUpperCase() + book.title.slice(1).toLowerCase()}</h2>
        <p>Category: {book.categories}</p>
        <p>Description: {book.description}</p>
        <p className={priceClass()}>Price: {book.listPrice.amount + ' ' + book.listPrice.currencyCode}</p>
        <p>Pages: {book.pageCount}</p>
        <p>Difficulty: {book && difficulty()}</p>
        <p>{book.listPrice.isOnSale ? 'On Sale' : ''}</p>
        <Link to="/book"><button>Back</button></Link>
    </section>
}