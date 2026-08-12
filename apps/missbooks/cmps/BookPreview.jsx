export function BookPreview({ book }) {

    return <article>
        <img src={book.thumbnail} alt={`${book.title} pic`} />
        <h2>{book.title.charAt(0).toUpperCase() + book.title.slice(1).toLowerCase()}</h2>
        <span>{`Price: ${book.listPrice.amount} ${book.listPrice.currencyCode}`}</span>
    </article>

}