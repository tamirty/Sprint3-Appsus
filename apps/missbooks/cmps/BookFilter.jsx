const { useState, useEffect } = React

export function BookFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { type, value, name: key } = target
        setFilterByToEdit(prev => ({ ...prev, [key]: type === 'number' ? +value : value }))
    }  

    return <form className="book-filter">
        <input
            type="text"
            name="txt"
            placeholder="book name"
            onChange={handleChange}
            value={filterByToEdit.txt} />

        <input
            type="number"
            name="maxPrice"
            placeholder="max price"
            onChange={handleChange}
            value={filterByToEdit.maxPrice || ''} />
    </form>
}